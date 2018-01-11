import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  vanillaBurst: require('./vanillaBurst').default
})

export default rootReducer
