
import React, { Component } from 'react'
import Home from '../components/Home'
import { connect } from 'react-redux'
import {updateVanillaPartition} from '../reducers/VanillaBurst'

let currentSlice
console.log(currentSlice)

const mapStateToProps = state => {
  currentSlice = state.vanillaBurst ? state.vanillaBurst.currentVanillaSlice ? state.vanillaBurst.currentVanillaSlice : '' : ''
  console.log('p', currentSlice)
  console.log('s',state)
  console.log('v',state.VanillaBurst)
  return {currentSlice: currentSlice}
}

const mapDispatchToProps = dispatch => (
  {
    updateVanillaPartition(slice) {
      dispatch(updateVanillaPartition(slice))
    },
  }
 )

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeContainer