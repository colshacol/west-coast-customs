import nanoid from 'nanoid'
import { timeMe } from './timeMe'

import customs from './customs'
import styles from './styles'
import reactAdapter from './react'

const producePropIds = () => {
  return Array(50000)
    .fill('')
    .map(() => {
      return nanoid()
    })
}

window.producePropIds = producePropIds
window.__WEST_COAST.PROP_IDS = timeMe(producePropIds)()

export { customs, styles, reactAdapter }
export default { customs, styles, reactAdapter }
