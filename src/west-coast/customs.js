/** @jsx h */
import { h } from 'dom-chef'
import css from 'css-in-js-utils'
import styles from './styles'

const NOOP = () => {}
const getBlankStyles = () => <style />

const store = {
  propsMap: new Map(),
}

const emptyChildren = target => {
  Array.from(target.children).forEach(child => {
    target.removeChild(child)
  })
}

const createUID = element => {
  const uid = Symbol(element.tag)
  store.propsMap.set(uid, element.defaultProps || {})
  return uid
}

const asyncRender = async self => {
  const node = self.render()
  const styles = self.styles(self)

  emptyChildren(self.shadowRoot)
  self.shadowRoot.appendChild(styles)
  self.shadowRoot.appendChild(node)
}

const createProps = (self, props) => {
  return {
    ...self.defaultProps,
    ...props,
  }
}

export const CustomElement = Super => {
  return class SuperElement extends Super {
    uid = createUID(this)
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
    }

    registerEvents() {
      Object.entries(this.props).forEach(([key, value]) => {
        // For custom elements without React adpter.
        // $click, $mouseEnter, $keyPress, etc...
        if (key.startsWith('$')) {
          const method = 'on' + key.substr(1).toLowerCase()
          this[method] = value
        }

        if (key.startsWith('on')) {
          const method = key.toLowerCase()
          this[method] = value
        }
      })
    }

    static get observedAttributes() {
      return Object.keys(this.defaultProps)
    }

    styles = this.styles || styles.generateBlankStyles
    disconnectedCallback = this.elementDidUnMount || NOOP
    adoptedCallback = this.elementDidRelocate || NOOP
    defaultProps = this.defaultProps || {}

    elementDidMount = this.elementDidMount || NOOP
    elementWillUpdate = this.elementWillUpdate || NOOP
    elementDidUpdate = this.elementDidUpdate || NOOP

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        console.log('changed:', name, oldValue, newValue)
        return this.scheduleRender()
      }
    }

    connectedCallback() {
      return this.elementDidMount()
    }

    async scheduleRender() {
      this.elementWillUpdate()
      await asyncRender(this)
      this.registerEvents()
      this.elementDidUpdate()
    }

    getProps() {
      return Object.keys(this.defaultProps).reduce((final, key) => {
        const attr = this.attributes.item(key)
        final[key] = attr.value
        return final
      }, {})
      // return store.propsMap.get(this.uid)
    }

    get props() {
      return store.propsMap.get(this.uid)
    }

    set props(props) {
      const fullProps = createProps(this, props)
      store.propsMap.set(this.uid, fullProps)
      this.scheduleRender()
    }
  }
}

const register = (Element, options) => {
  if (!window.customElements.get(Element.tag)) {
    window[`HTML${Element.name}Element`] = Element
    customElements.define(Element.tag, Element, options)
  }
}

export default {
  store,
  createUID,
  asyncRender,
  createProps,
  CustomElement,
  register,
}
