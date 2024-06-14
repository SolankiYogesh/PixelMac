import Screens from '../Helpers/Screens'
import Controller from './Controller'

class RouteController {
  static ref: Controller | null = null

  static setRef = (ref: Controller) => {
    RouteController.ref = ref
  }

  static next = (currentRoute: Screens, params?: any) => {
    this.ref?.next(currentRoute, params)
  }

  static getRouteName = () => {
    return this?.ref?.state?.routes[this?.ref?.state?.index]?.name
  }

  static goBack = () => {
    this.ref?.goBack()
  }
}
export default RouteController
