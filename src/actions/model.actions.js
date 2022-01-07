import BaseActions from '@actions/base-actions'
import api from '@services/api/espa/api.service'
import { mapImmuatableDataById } from '@helpers/map.helpers'
import { getUser } from '@helpers/user.helpers'
import reducer from '../reducers/model.reducer'

class ModelActions extends BaseActions {

  mapData(models) {
    return async (dispatch, getState) => {
      const state = getState()
      let modelsById = state.model.get('modelsById')
      modelsById = mapImmuatableDataById(models, modelsById)
      dispatch(this.setValue('modelsById', modelsById))
    }
  }

  setCurrentModelInfo(model) {
    return async (dispatch) => {
      dispatch(this.setValue('modelInfo', model))
    }
  }

  updateProfile(model) {
    return async (dispatch) => {
      try {
        const user = getUser()
        const newModel = {
          ...model,
          wallet: user.wallet,
          randomString: user.randomString
        }

        dispatch(this.setValue('isLoading', true))
        const data = await api.registerModel(newModel)
        if (data) {
          dispatch(this.setValue('modelInfo', model))
          toast('Model Info is updated')
        } else {
        }
      } catch (e) {}
      dispatch(this.setValue('isLoading', false))
    }
  }

  uploadAvatar(file) {
    return async (dispatch, getState) => {
      const state = getState()
      try {
        dispatch(this.setValue('isLoading', true))
        let url = await api.getPresignedUrl()
        if (url) {
          const result = await api.uploadImageToS3(url, file)
          if (result) {
            const model = Object.fromEntries(state.model
              .get('modelInfo'))
            const queryIndex = url.indexOf('?')
            if (queryIndex >= 0) {
              url = url.slice(0, queryIndex)
            }
            model.image_url = url

            dispatch(this.updateProfile(model))
          }
        }
      } catch (e) {}
      dispatch(this.setValue('isLoading', false))
    }
  }

  setIsloading(loading) {
    return async (dispatch) => {
      dispatch(this.setValue('isLoading', loading))
    }
  }
}

export default new ModelActions(reducer)
