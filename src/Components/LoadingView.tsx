import React from 'react'
import {ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'

interface LoadingViewProps {
  style?: StyleProp<ViewStyle>
}

const LoadingView = ({style = {}}: LoadingViewProps) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={'large'} color={Colors.primary} />
    </View>
  )
}

export default LoadingView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
