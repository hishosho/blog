import Type from './reducerType'
import commit from './reducerCommit'

interface Action {
  type: string;
  payload: any;
}
function reducer (state: object, action: Action): object | undefined {
  switch (action.type) {
    case Type.SET_IS_MOBILE:
      return commit[Type.SET_IS_MOBILE](state, action.payload)
    default:
      console.error('error reducer:', action.type )
      return void 0
  }
}

export default reducer