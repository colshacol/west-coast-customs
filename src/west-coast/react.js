import React from 'react'

export default tag => {
  const Element = customElements.get(tag)

  return class CustomElementAdapter extends React.PureComponent {
    element = React.createRef()
    gotRef = false

    initiateRef = element => {
      this.element = element
      this.updateRefProps()
    }

    updateRefProps = () => {
      // Check to make sure the element has a props property
      // and then set its props. If element.props doesn't exist,
      // that means the ref hasn't initiated yet. (First render.)
      if (this.element && this.element.props) {
        this.element.props = this.props
      }
    }

    render() {
      // Since it is a pure component, we know that it will
      // not re-render unless the props have changed. So on
      // every render, we set new props on the custom element,
      // causing it to re-render.
      this.updateRefProps()

      console.log(Element.tag, this.props)

      // No props passed (because React's wonky handling.)
      // Instead, we use the ref to set props.
      // return <Element.extends is={Element.tag} ref={this.initiateRef} />
      return <Element.tag ref={this.initiateRef} />
    }
  }
}
