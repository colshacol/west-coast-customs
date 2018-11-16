import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'

import React from 'react'
import ReactDOM from 'react-dom'
import nanoid from 'nanoid'
import westCoast from './west-coast'

import './blue-button'
import './user-count'
import './styles.css'

const UserCount = westCoast.reactAdapter('user-count')
const BlueButton = westCoast.reactAdapter('blue-button')

const getUsers = async () => {
  const endpoint = 'https://jsonplaceholder.typicode.com/users'
  const response = await fetch(endpoint)
  return await response.json()
}

const logHover = event => {
  // console.log('IT WAS HOVERED')
}

class App extends React.Component {
  allUsers = []

  state = {
    activeUsers: [],
  }

  async componentDidMount() {
    this.allUsers = await getUsers()
    this.setState({ activeUsers: [this.allUsers[0]] })
  }

  // Remove the last user from this.state.activeUsers
  // OR add a user from this.allUsers.
  setUsers = modifier => () => {
    const count = this.state.activeUsers.length + modifier
    const activeUsers = [...this.allUsers.slice(0, count)]

    this.setState({
      activeUsers,
    })
  }

  resetUsers = event => {
    this.setState({ activeUsers: [] })
  }

  render() {
    const { activeUsers } = this.state

    // Disable remove if there are 0 active users.
    // Disable add if all users are active.
    const disableRemove = activeUsers.length === 0
    const disableAdd = activeUsers.length === this.allUsers.length

    return (
      <div className="App">
        <p>I am app.</p>
        <UserCount users={activeUsers} max={3} onMouseEnter={logHover} />
        <button onClick={this.setUsers(-1)} disabled={disableRemove}>
          remove user
        </button>
        <button onClick={this.setUsers(1)} disabled={disableAdd}>
          add user
        </button>
        <BlueButton onClick={this.resetUsers}>reset</BlueButton>
        <UserCount
          users={activeUsers}
          max={3}
          onMouseEnter={logHover}
          bgc="red"
        />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

// customElements.whenDefined('user-count').then(() => {
//   const rootElement = document.getElementById('root')
//   ReactDOM.render(<App />, rootElement)
// })
