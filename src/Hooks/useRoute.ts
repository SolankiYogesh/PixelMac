import {useEffect, useState} from 'react'

import Emitter from '../Helpers/Emitter'
import RouteController from '../NavigationContainer/RouteController'

const useRoute = () => {
  const [params, setParams] = useState<any>({})

  useEffect(() => {
    setParams(RouteController.ref?.params)
    Emitter.addListener('params', setParams)
  }, [])

  return params[RouteController.getRouteName() as any]
}

export default useRoute
