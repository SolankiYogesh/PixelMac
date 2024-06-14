import React, {useState} from 'react'
import {ActivityIndicator, Image, ImageProps, StyleSheet, View} from 'react-native'

import CommonStyle from '../Helpers/CommonStyle'

type AppLoadingImageProps = ImageProps

const AppLoadingImage = ({style, ...rest}: AppLoadingImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <View style={[styles.container, style]}>
      {isLoading && (
        <View style={[CommonStyle.centerFlex, StyleSheet.absoluteFill]}>
          <ActivityIndicator size={'large'} color={'lightBlue'} />
        </View>
      )}
      <Image {...rest} onLoad={() => setIsLoading(false)} style={CommonStyle.fullView} />
    </View>
  )
}

export default AppLoadingImage

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  }
})
