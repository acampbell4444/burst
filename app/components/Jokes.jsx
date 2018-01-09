import React from 'react';
import { render } from 'react-dom';
import { hierarchy } from 'd3-hierarchy';
import Burst from './Burst';

import data from './data';

const root = hierarchy(data)
  .sum(d => d.size) //size)
  //.sum(d => 1) // count
  //.sort((a, b) => b.value - a.value);

const BurstShell = () => (
  <Burst root={root} width={600} height={600} />
)

export default BurstShell

