import { createContext, useReducer } from 'react'
import reducer from './reducer'

const initState = {
  clientSize: {
    width: 0,
    height: 0
  },
  isMobile: false
}

const Context = createContext({})

const Provider = ({ children }: any) => {
  const [ state, dispatch ] = useReducer<any>(reducer, initState)
  const value = { globalState: state, dispatch }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export { Context, Provider }
