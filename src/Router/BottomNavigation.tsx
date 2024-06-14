import React from 'react'

import Screens from '../Helpers/Screens'
import Controller from '../NavigationContainer/Controller'
import RouteController from '../NavigationContainer/RouteController'
import FeedScreen from '../Screens/FeedScreen/FeedScreen'
import HomeScreen from '../Screens/HomeScreen/HomeScreen'

const BottomNavigation = () => {
  return (
    <Controller ref={RouteController.setRef}>
      <Controller.Navigator name={Screens.FeedScreen} component={<FeedScreen />} />
      <Controller.Navigator name={Screens.HomeScreen} component={<HomeScreen />} />
    </Controller>
  )
}

export default BottomNavigation
