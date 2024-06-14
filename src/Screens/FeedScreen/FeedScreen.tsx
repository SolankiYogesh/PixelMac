import React, {useCallback, useEffect, useRef} from 'react'
import {Animated, FlatList, StyleSheet, View} from 'react-native'
import useState from 'react-usestateref'
import {HttpStatusCode} from 'axios'

import {APICall, AppConfig} from '../../APIRequest'
import AppLoadingImage from '../../Components/AppLoadingImage'
import EmptyComponent from '../../Components/EmptyComponent'
import ModalProvider from '../../Components/ModalProvider'
import CommonStyle from '../../Helpers/CommonStyle'
import RenderFastImage from './RenderFastImage'
import SearchContainer from './SearchContrainer'

const FeedScreen = () => {
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const page = useRef(1)
  const [, setLoaderMore, loadMoreRef] = useState(false)
  const isLoaderMore = useRef(true)
  const [images, setImages] = useState<PixabayImage[]>([])
  const [isVisible, setIsVisible] = useState('')
  const scrollY = new Animated.Value(0)

  const diffClamp = Animated.diffClamp(scrollY, 0, 64)
  const translateY = diffClamp.interpolate({
    inputRange: [0, 40],
    outputRange: [0, -40]
  })

  const getImages = useCallback(
    (isPagination = false) => {
      const currentPage = isPagination ? page.current + 1 : 1

      if (loadMoreRef.current && !isLoaderMore.current) {
        return
      }

      setIsLoading(!isPagination)
      setLoaderMore(isPagination)

      const url =
        AppConfig.API_URL_PIXEL + `&q=${search}&page=${currentPage}&per_page=40&type=photo`

      APICall<PixabayResponse>('get', {}, url)
        .then((resp) => {
          if (resp.status === HttpStatusCode.Ok) {
            const data = resp.data.hits

            if (data.length > 0) {
              const clone = JSON.parse(JSON.stringify(images)) as PixabayImage[]
              setImages(isPagination ? clone.concat(resp.data.hits) : resp.data.hits)
              setLoaderMore(false)
              isLoaderMore.current = true
            } else {
              setIsLoading(false)
              setLoaderMore(false)
              isLoaderMore.current = false
            }
          }
        })
        .catch(() => {
          setIsLoading(false)
          setLoaderMore(false)
          isLoaderMore.current = false
        })
    },
    [images, loadMoreRef, search, setLoaderMore]
  )

  const onPressSearch = useCallback(() => {
    if (!search) {
      return
    }
    setLoaderMore(false)
    page.current = 1
    isLoaderMore.current = true
    getImages()
  }, [getImages, search, setLoaderMore])

  useEffect(() => {
    getImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={CommonStyle.flex}>
      <SearchContainer
        translateY={translateY}
        value={search}
        onPressSearch={onPressSearch}
        onChangeText={setSearch}
      />
      {images.length === 0 ? (
        <EmptyComponent isLoading={isLoading} />
      ) : (
        <FlatList
          onEndReached={() => {
            getImages(true)
          }}
          onScroll={({
            nativeEvent: {
              contentOffset: {y}
            }
          }) => {
            scrollY.setValue(y)
          }}
          numColumns={7}
          data={images}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          keyExtractor={(item, index) => `images${item.id}withIndex${index}`}
          renderItem={({item}) => {
            return (
              <RenderFastImage
                onPress={() => setIsVisible(item?.fullHDURL ?? item.largeImageURL)}
                item={item}
              />
            )
          }}
        />
      )}
      {!!isVisible && (
        <ModalProvider
          style={CommonStyle.centerFlex}
          onClose={() => setIsVisible('')}
          isVisible={!!isVisible}
        >
          <AppLoadingImage
            style={styles.image}
            resizeMode={'contain'}
            source={{
              uri: isVisible
            }}
          />
        </ModalProvider>
      )}
    </View>
  )
}

export default FeedScreen
const styles = StyleSheet.create({
  columnWrapperStyle: {
    gap: 10,
    alignSelf: 'center'
  },
  image: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '85%',
    height: '85%'
  },
  contentContainerStyle: {
    paddingTop: 60
  }
})
