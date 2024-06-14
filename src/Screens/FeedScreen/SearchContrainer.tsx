import React from 'react'
import {Animated, StyleSheet, TextInput, View} from 'react-native'

import AppIcon from '../../Components/AppIcon'
import Colors from '../../Helpers/Colors'
import Images from '../../Helpers/Images'
import Screens from '../../Helpers/Screens'
import RouteController from '../../NavigationContainer/RouteController'

interface SearchContainerProps {
  onChangeText: (text: string) => void
  value: string
  onPressSearch: () => void
  translateY: Animated.Value
}

const SearchContainer = (props: SearchContainerProps) => {
  const {onChangeText, onPressSearch, value, translateY = new Animated.Value(0)} = props
  return (
    <Animated.View
      style={[
        styles.mainContianer,
        {
          transform: [{translateY}]
        }
      ]}
    >
      <View style={styles.container}>
        <TextInput
          placeholder={'Search'}
          enableFocusRing={false}
          placeholderTextColor={Colors.grey}
          underlineColorAndroid={Colors.transparent}
          style={styles.input}
          maxLength={80}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onPressSearch}
        />
        <AppIcon style={styles.iconStyle} source={Images.search} size={20} />
      </View>
      <AppIcon source={Images.filter} size={20} />
      <AppIcon
        source={Images.home}
        size={20}
        onPress={() => RouteController.next(Screens.HomeScreen)}
      />
    </Animated.View>
  )
}

export default SearchContainer

const styles = StyleSheet.create({
  mainContianer: {
    width: '40%',
    alignSelf: 'center',
    height: 40,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    position: 'absolute',
    zIndex: 100000,
    columnGap: 20
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 2,
    overflow: 'hidden',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    padding: 10,
    color: Colors.black
  },
  iconStyle: {
    backgroundColor: Colors.primary,
    borderRadius: 300,
    padding: 10
  }
})
