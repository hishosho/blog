import Type from './reducerType'
interface Size {
  width: number;
  height: number;
}
const commit = {
  [Type.SET_CLIENT_SIZE]: (state: object, value: Size): object => {
    const isMobile: boolean = window.matchMedia('(max-width: 768px)').matches
    return { ...state, clientSize: value, isMobile }
  }
}

export default commit