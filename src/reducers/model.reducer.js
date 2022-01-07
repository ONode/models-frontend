/* eslint-disable max-len */
import { createModule } from 'redux-modules'
import cloneDeep from 'lodash.clonedeep'
import { Map, List } from 'immutable'
import TransformModules from '../utils/transform-modules'
import modelList from '@data/models.json'

const DEFAULT_FIELDS = Map({
  modelsById: Map({}),
  modelInfo: Map({}),
  modelGarmentIds: List([]),
  modelIDs: List(modelList),
  modelCID: List(modelList.map(item => item.CID))
})

export default createModule({
  name: 'model',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: cloneDeep(TransformModules(DEFAULT_FIELDS))
})
