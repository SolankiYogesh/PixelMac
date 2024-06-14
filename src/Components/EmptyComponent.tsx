import React from 'react'
import {View} from 'react-native'

import CommonStyle from '../Helpers/CommonStyle'
import Images from '../Helpers/Images'
import SizeProvider from '../Providers/SizeProvider'
import AppIcon from './AppIcon'
import LoadingView from './LoadingView'

interface EmptyComponentProps {
  isLoading?: boolean
}

const EmptyComponent = ({isLoading}: EmptyComponentProps) => {
  return (
    <SizeProvider>
      {({height, width}) => {
        return (
          <View
            style={{
              height,
              width,
              ...CommonStyle.centerFlex
            }}
          >
            {isLoading && <LoadingView />}
          </View>
        )
      }}
    </SizeProvider>
  )
}

export default EmptyComponent
