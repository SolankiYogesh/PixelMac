import React, {PureComponent} from 'react'
import {FlatList, View} from 'react-native'

import CommonStyle from '../Helpers/CommonStyle'
import Emitter from '../Helpers/Emitter'
import Screens from '../Helpers/Screens'
import SizeProvider from '../Providers/SizeProvider'
import Navigator from './Navigator'

interface ControllerProps {
  children?: React.ReactNode
}

interface RouteType {
  name: Screens
  route: Array<React.ReactElement<any>>
  params?: any
}

interface ControllerStateType {
  routes: RouteType[]
  index: number
}

class Controller extends PureComponent<ControllerProps, ControllerStateType> {
  constructor(props: ControllerProps) {
    super(props)

    this.state = {
      routes: [],
      index: 0
    }
  }

  componentDidMount(): void {
    const routes: RouteType[] = []
    ;(this.props.children as Navigator[]).map(({props: {component, name}}) => {
      routes.push({
        name,
        route: component as any
      })
    })
    this.setState({routes, index: 0})
  }

  params: Record<Screens, any> = {} as any

  flatlistRef: FlatList | null = null

  static Navigator: typeof Navigator

  history: string[] = []

  next = (currentRoute: Screens, params?: any) => {
    const index = this.state.routes.findIndex((item) => item.name === currentRoute)

    if (index > -1) {
      this.setState(
        {
          index
        },
        () => {
          const clone = JSON.parse(JSON.stringify(this.params))
          clone[currentRoute] = params
          this.params = clone
          Emitter.emit('params', clone)
          if (this.flatlistRef) {
            this.flatlistRef.scrollToIndex({
              index,
              animated: true
            })
          }
        }
      )
    }
  }

  goBack = () => {
    const {index} = this.state
    if (index > 0) {
      this.setState(
        {
          index: index - 1
        },
        () => {
          const clone = JSON.parse(JSON.stringify(this.params))
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete clone[this.state.routes[index].name]
          this.params = clone
          Emitter.emit('params', clone)
          if (this.flatlistRef) {
            this.flatlistRef.scrollToIndex({
              index: index - 1,
              animated: true
            })
          }
        }
      )
    }
  }

  render() {
    const {routes} = this.state

    return (
      <View style={CommonStyle.flex}>
        <SizeProvider>
          {({height, width}) => {
            return (
              <FlatList
                ref={(ref) => (this.flatlistRef = ref)}
                data={routes}
                style={{
                  width,
                  height
                }}
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                // scrollEnabled={false}
                keyExtractor={(item) => item.name}
                renderItem={({item, index}) => {
                  const display = index === this.state.index
                  return (
                    <View
                      style={{
                        width,
                        height
                      }}
                    >
                      {display ? item.route : null}
                    </View>
                  )
                }}
              />
            )
          }}
        </SizeProvider>
      </View>
    )
  }
}

Controller.Navigator = Navigator

export default Controller
