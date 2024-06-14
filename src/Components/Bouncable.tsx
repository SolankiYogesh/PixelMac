import * as React from 'react'
import {Animated, Pressable, PressableProps, StyleProp, ViewStyle} from 'react-native'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
export interface BouncableProps extends PressableProps {
  onPress?: () => void
  bounceEffectIn?: number
  bounceEffectOut?: number
  bounceVelocityIn?: number
  bounceVelocityOut?: number
  bouncinessIn?: number
  bouncinessOut?: number
  useNativeDriver?: boolean
  children?: React.ReactNode
  style?: CustomStyleProp
}

interface IState {
  bounceValue: any
}

export default class Bouncable extends React.Component<BouncableProps, IState> {
  constructor(props: BouncableProps) {
    super(props)
    this.state = {
      bounceValue: new Animated.Value(1)
    }
  }

  bounceAnimation = (value: number, velocity: number, bounciness: number, isOut = false) => {
    const {useNativeDriver = true} = this.props
    Animated.spring(this.state.bounceValue, {
      toValue: value,
      velocity,
      bounciness,
      useNativeDriver
    }).start(({finished}) => {
      if (finished && isOut) {
        this.props.onPress && this.props.onPress()
      }
    })
  }

  render() {
    const {
      bounceEffectIn = 0.93,
      bounceEffectOut = 1,
      bounceVelocityIn = 0.1,
      bounceVelocityOut = 0.4,
      bouncinessIn = 0,
      bouncinessOut = 0,
      children,
      style
    } = this.props
    return (
      <AnimatedPressable
        style={[{transform: [{scale: this.state.bounceValue}]}, style]}
        onPressIn={() => {
          this.bounceAnimation(bounceEffectIn, bounceVelocityIn, bouncinessIn)
        }}
        onPressOut={() => {
          this.bounceAnimation(bounceEffectOut, bounceVelocityOut, bouncinessOut, true)
        }}
      >
        {children}
      </AnimatedPressable>
    )
  }
}
