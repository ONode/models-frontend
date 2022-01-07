import BaseActions from '@actions/base-actions'
import garmentActions from '@actions/garment.actions'
import modelActions from '@actions/model.actions'
import api from '@services/api/api.service'
import reducer from '../reducers/model.reducer'

class ModelPageActions extends BaseActions {

  update(models) {
    return async (dispatch) => {
      if (!models.length) {
        return
      }

      const [model] = models

      const { digitalaxGarments } = await api.getGarmentsByModelIds([
        model.id,
      ])

      const modelGarmentIds = digitalaxGarments.map((garmet) => garmet.id)
      dispatch(this.setValue('modelGarmentIds', modelGarmentIds))
      dispatch(modelActions.mapData(models))
      dispatch(garmentActions.mapData(digitalaxGarments))
    }
  }

  reset() {
    return async (dispatch) => {
      dispatch(modelActions.clear())
      dispatch(garmentActions.clear())
    }
  }

}

export default new ModelPageActions(reducer)
