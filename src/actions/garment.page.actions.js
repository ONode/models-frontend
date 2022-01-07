import BaseActions from '@actions/base-actions'
import api from '@services/api/api.service'
import reducer from '../reducers/garment.page.reducer'
import garmentActions from './garment.actions'
import modelActions from './model.actions'

class GarmentPageActions extends BaseActions {

  fetchGarmentByIds(ids) {
    return async (dispatch) => {
      const { digitalaxGarments } = await api.getGarmentsByIds(ids)

      dispatch(garmentActions.mapData(digitalaxGarments))
    }
  }

  reset() {
    return async (dispatch) => {
      dispatch(garmentActions.clear())
      dispatch(modelActions.clear())
    }
  }

}

export default new GarmentPageActions(reducer)
