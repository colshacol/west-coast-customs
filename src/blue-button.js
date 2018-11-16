/** @jsx h */
import { h } from 'dom-chef'
import { CustomElement } from './west-coast/customs'
import { customs } from './west-coast'

const styles = self => (
  <style>
    {`
    #root {
      background: #333;
      color: green;
    }
  `}
  </style>
)

class BlueButton extends CustomElement(HTMLElement) {
  static tag = 'blue-button'
  static extends = 'button'
  static styles = styles

  static defaultProps = {
    whenClicked: () => {},
  }

  elementDidMount() {
    // console.log('mounted: blue-button')
  }

  elementDidUnmount() {
    // console.log('unmounted: blue-button')
  }

  elementDidUpdate() {
    // console.log('updated: blue-button')
  }

  render() {
    // console.log('rendering: blue-button')

    return (
      <button style={{ background: 'blue', color: 'white' }}>
        {this.props.children}
      </button>
    )
  }
}

customs.register(BlueButton)
