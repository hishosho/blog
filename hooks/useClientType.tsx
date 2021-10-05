import { useState, useEffect } from 'react'
import { useContext } from 'react'
import Type from '../store/reducerType'
import { Context } from '../store'

const useClientType = () => {
  const { globalState, dispatch } = useContext<any>(Context)

  function resetClientType () {
    const isMobile: boolean = window.matchMedia('(max-width: 1024px)').matches
    dispatch({ type: Type.SET_IS_MOBILE, payload: isMobile })
  }
  
  return {
    isMobile: globalState.isMobile,
    resetClientType
  }
}

export default useClientType
