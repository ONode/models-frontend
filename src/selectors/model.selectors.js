export const getModelGarmentIds = () => (state) => state.model.get('modelGarmentIds')
export const getCurrentModelInfo = () => state => {
  const modelInfo = state.model.get('modelInfo')
  return modelInfo ? Object.fromEntries(state.model.get('modelInfo')) : {}}
export const getIsLoading = () => state => state.model.get('isLoading')