import React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import * as Animatable from 'react-native-animatable'

import AppLoadingImage from '../../Components/AppLoadingImage'
import imagesUrls from '../../Data/imagesUrls'
import Colors from '../../Helpers/Colors'
import CommonStyle from '../../Helpers/CommonStyle'

interface PostItemProps {
  item: Post
  onPress: () => void
  index: number
}

const AnimatedPressable = Animatable.createAnimatableComponent(Pressable)

const PostItem = ({item, onPress, index}: PostItemProps) => {
  return (
    <AnimatedPressable
      delay={index * 50}
      animation={'fadeInDown'}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.profileContainer}>
        <AppLoadingImage
          source={{
            uri: imagesUrls[item.id]
          }}
          borderRadius={20}
          style={styles.imageStyle}
        />
        <View style={CommonStyle.flex}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.bodyText}>{item.body}</Text>
        </View>
      </View>
    </AnimatedPressable>
  )
}

export default PostItem

const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 20
  },
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 10
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: 16
  },
  bodyText: {
    fontWeight: 'bold',
    color: Colors.grey,
    fontSize: 14
  }
})
