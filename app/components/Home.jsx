import React from 'react';
import { render } from 'react-dom';
import { hierarchy } from 'd3-hierarchy';
import Burst from './Burst';
import VanillaBurst from './VanillaBurst';

import data from './data';

const root = hierarchy(data)
  .sum(d => d.size) //size)
  //.sum(d => 1) // count
  //.sort((a, b) => b.value - a.value);

const Home = ({updateVanillaPartition, currentSlice}) =>{ 
	
	console.log('cur', currentSlice)
  //<Burst root={root} width={600} height={600} />
  return (
  <div>
  {currentSlice.name}
  <VanillaBurst updateVanillaPartition={updateVanillaPartition} />
  </div>
)
}

export default Home

