import React, {FC} from 'react'
import {Image, ImageSourcePropType, ImageStyle, StyleProp, ViewStyle} from 'react-native'

import Bouncable from './Bouncable'

interface AppIconProps extends ViewStyle {
  source: ImageSourcePropType
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  size?: number
  imageStyle?: StyleProp<ImageStyle>
}

const AppIcon: FC<AppIconProps> = ({source, onPress, style, size = 40, imageStyle = {}}) => {
  return (
    <Bouncable bouncinessIn={0.2} onPress={onPress} style={style}>
      <Image
        source={source}
        resizeMode={'contain'}
        style={[
          {
            width: size,
            height: size
          },
          imageStyle
        ]}
      />
    </Bouncable>
  )
}

export default AppIcon
