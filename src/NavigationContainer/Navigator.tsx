import React, {PureComponent} from 'react'

import Screens from '../Helpers/Screens'

export interface NavigatorProps {
  name: Screens
  component: React.ReactElement
}

class Navigator extends PureComponent<NavigatorProps> {
  getKey = () => this.props.name
  render() {
    const Component = this.props.component // Capitalized to denote it's a component
    return Component
  }
}

export default Navigator
