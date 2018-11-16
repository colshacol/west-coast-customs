/** @jsx h */
import { h } from 'dom-chef'
import { CustomElement } from './west-coast/customs'
import { customs } from './west-coast'

const styles = self => (
  <style>{`
    #root {
      background: ${self.props.bgc || '#333'};
      color: white;
    }
  `}</style>
)

class UserCount extends CustomElement(HTMLElement) {
  static tag = 'user-count'
  static extends = 'div'
  styles = styles

  static defaultProps = {
    users: [],
    max: 2,
  }

  elementDidMount() {
    // console.log('mounted: user-count')
  }

  elementDidUnmount() {
    // console.log('unmounted: user-count')
  }

  elementDidUpdate() {
    // console.log('updated: user-count')
  }

  elementDidRelocate() {
    // console.log('relocated: user-count')
  }

  render() {
    console.log('render', this, this.props.users)
    // console.log(`user count: {this.props.users.length}`)
    return <div id="root">user count: {this.props.users.length}</div>
  }
}

customs.register(UserCount)
