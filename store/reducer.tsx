import Type from './reducerType'
import commit from './reducerCommit'
function reducer (state: object, action: object): object {
  switch (action.type) {
    case Type.SET_CLIENT_SIZE:
      return commit[Type.SET_CLIENT_SIZE](state, action.payload)
    default:
      console.error('error reducer:', action.type )
  }
}

export default reducer