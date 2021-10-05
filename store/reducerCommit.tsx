import Type from './reducerType'

const commit = {
  [Type.SET_IS_MOBILE]: (state: object, isMobile: boolean): object => {
    return { ...state, isMobile }
  }
}

export default commit