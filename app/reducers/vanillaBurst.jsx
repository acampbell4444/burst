import axios from 'axios'

const initState = {
  currentVanillaSlice: {}
}

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case UPDATE_VANILLA_SLICE:
    newState.currentVanillaSlice = action.slice
    break

  default:
    return state
  }
  return newState
}

const UPDATE_VANILLA_SLICE = 'UPDATE_VANILLA_SLICE'
export const updateVanillaPartition = slice => {
  return {type: UPDATE_VANILLA_SLICE, slice}
}



export default reducer