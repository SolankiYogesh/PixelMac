import React, {useEffect, useRef} from 'react'
import {Animated, Dimensions} from 'react-native'

import CommonStyle from '../Helpers/CommonStyle'
import SizeProvider from '../Providers/SizeProvider'

interface AnimationControllerProps {
  children: React.ReactNode
  fromLeft: boolean
}

const AnimationController = ({children, fromLeft}: AnimationControllerProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  const width = useRef(Dimensions.get('window').width)

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200, // Adjust the duration as needed
      useNativeDriver: true
    }).start()
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...CommonStyle.flex,
        opacity: fadeAnim,

        transform: [
          {
            translateX: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [fromLeft ? -width.current : width.current, 0] // Adjust the initial and final positions
            })
          }
        ]
      }}
    >
      <SizeProvider onChange={(w) => (width.current = w)} />
      {children}
    </Animated.View>
  )
}

export default AnimationController
