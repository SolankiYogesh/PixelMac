import React, {useCallback, useMemo} from 'react'
import {Animated, Easing, Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native'

import Colors from '../Helpers/Colors'
import SizeProvider from '../Providers/SizeProvider'

interface ModalProviderProps {
  children?: React.ReactNode
  isVisible?: boolean
  onClose?: (state: boolean) => void
  style?: StyleProp<ViewStyle>
}

const AnimatedPresseble = Animated.createAnimatedComponent(Pressable)

const ModalProvider = (props: ModalProviderProps) => {
  const {children, isVisible, onClose, style = {}} = props
  const opacity = React.useRef(new Animated.Value(isVisible ? 1 : 0)).current

  const fadeIn = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.circle,
      isInteraction: true
    }).start()
  }, [opacity])

  const fadeOut = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.circle
    }).start(() => {
      if (onClose) {
        onClose(false)
      }
    })
  }, [onClose, opacity])

  const renderBackDrop = useMemo(() => {
    return (
      <AnimatedPresseble
        pointerEvents={'box-only'}
        onPress={fadeOut}
        style={[
          styles.backDropStyle,
          {
            opacity
          }
        ]}
      />
    )
  }, [fadeOut, opacity])

  return (
    <SizeProvider>
      {({height, width}) => {
        return (
          <Animated.View
            onLayout={() => {
              fadeIn()
            }}
            style={[
              styles.container,
              {
                width,
                height,
                opacity
              }
            ]}
          >
            {renderBackDrop}
            <Animated.View pointerEvents={'box-none'} style={[styles.content, {opacity}, style]}>
              {children}
            </Animated.View>
          </Animated.View>
        )
      }}
    </SizeProvider>
  )
}

export default ModalProvider

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1000000,
    backgroundColor: Colors.transparent
  },
  backDropStyle: {
    backgroundColor: Colors.blackBackDrop,
    position: 'absolute',
    zIndex: 1000,
    height: '100%',
    width: '100%'
  },
  content: {
    zIndex: 100000,
    height: '100%',
    width: '100%'
  }
})
