import {ReactNode, useEffect} from 'react'
import {useWindowDimensions} from 'react-native'

interface SizeProviderProps {
  onChange?: (width: number, height: number) => void
  children?: ({height, width}: {height: number; width: number}) => ReactNode
}

const SizeProvider = ({children, onChange}: SizeProviderProps) => {
  const {height, width} = useWindowDimensions()

  useEffect(() => {
    if (onChange) onChange(width, height)
  }, [height, onChange, width])

  return children ? children({width, height}) : null
}

export default SizeProvider
