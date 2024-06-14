import React from 'react'
import {Pressable, StyleSheet} from 'react-native'

import AppLoadingImage from '../../Components/AppLoadingImage'
import Colors from '../../Helpers/Colors'
import CommonStyle from '../../Helpers/CommonStyle'

interface RenderFastImageProps {
  item: PixabayImage
  onPress: () => void
}

const RenderFastImage = ({item, onPress}: RenderFastImageProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <AppLoadingImage
        style={CommonStyle.fullView}
        source={{
          uri: item.previewURL
        }}
      />
    </Pressable>
  )
}

export default RenderFastImage

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderRadius: 10,
    width: 250,
    height: 250
  }
})
