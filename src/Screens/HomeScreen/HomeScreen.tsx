import React, {useEffect, useState} from 'react'
import {FlatList, Pressable, StyleSheet, View} from 'react-native'

import {APICall, EndPoints} from '../../APIRequest'
import AppLoadingImage from '../../Components/AppLoadingImage'
import LoadingView from '../../Components/LoadingView'
import ModalProvider from '../../Components/ModalProvider'
import imagesUrls from '../../Data/imagesUrls'
import CommonStyle from '../../Helpers/CommonStyle'
import PostItem from './PostItem'

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    APICall<PostResponse>('get', {}, EndPoints.posts)
      .then((resp) => {
        if (resp.data) {
          setPosts(resp.data.posts)
          setSelectedPost(resp.data.posts[0])
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.firstView}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <FlatList
            data={posts}
            renderItem={({item, index}) => (
              <PostItem index={index} onPress={() => setSelectedPost(item)} item={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
      {selectedPost && (
        <Pressable onPress={() => setIsVisible(true)} style={styles.secondView}>
          <AppLoadingImage
            source={{
              uri: imagesUrls[selectedPost.id]
            }}
          />
        </Pressable>
      )}
      {isVisible && selectedPost && (
        <ModalProvider style={CommonStyle.centerFlex} onClose={setIsVisible} isVisible={isVisible}>
          <AppLoadingImage
            style={styles.image}
            resizeMode={'contain'}
            source={{
              uri: imagesUrls[selectedPost.id]
            }}
          />
        </ModalProvider>
      )}
    </View>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  firstView: {
    width: '70%',
    height: '100%'
  },
  secondView: {
    width: '30%',
    height: '100%',
    borderLeftWidth: 4
  },
  image: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '60%',
    height: '60%'
  }
})
