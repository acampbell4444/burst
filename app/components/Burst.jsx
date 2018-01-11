import React from 'react'
import { Group } from '@vx/group'
import { Arc } from '@vx/shape'
import { arc as d3arc } from 'd3-shape'
import { scaleLinear, scaleSqrt, scaleOrdinal, schemeCategory20c } from 'd3-scale'
import { interpolate } from 'd3-interpolate'
import Animate from 'react-move/Animate'
import NodeGroup from 'react-move/NodeGroup'
import Partition from './Partition'
import { Text } from '@vx/text'

const color = scaleOrdinal(schemeCategory20c);

export default class extends React.Component {
  state = {
    xDomain: [0, 1],
    xRange: [0, 2 * Math.PI],
    yDomain: [0, 1],
    yRange: [0, this.props.width / 2]
  }

  xScale = scaleLinear();
  yScale = scaleSqrt();
    
  arc = d3arc()
    .startAngle(d => Math.max(0, Math.min(2 * Math.PI, this.xScale(d.x0))))
    .endAngle(d => Math.max(0, Math.min(2 * Math.PI, this.xScale(d.x1))))
    .innerRadius(d => Math.max(0, this.yScale(d.y0)))
    .outerRadius(d => Math.max(0, this.yScale(d.y1)))

  handleClick = d => {
    this.setState({
      xDomain: [d.x0, d.x1],
      yDomain: [d.y0, 1],
      yRange: [d.y0 ? 20 : 0, this.props.width / 2]
    })
  }

  render() {
    let textPath = function(nodeName){
      return `<textPath xlink:href="#` +nodeName + `">`+nodeName+`</textPath>`
    }
    const {
      root,
      width,
      height,
      margin = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    } = this.props
    const { xDomain, xRange, yDomain, yRange } = this.state

    if (width < 10) return null;

    const radius = (Math.min(width, height) / 2) - 10

    return (
      <svg width={width} height={height}>
        <Partition
          top={margin.top}
          left={margin.left}
          root={root}
        >
          {({ data }) => {
            const nodes = data.descendants()
            return (
              <Animate
                start={() => {
                  this.xScale.domain(xDomain).range(xRange);
                  this.yScale.domain(yDomain).range(yRange);
                }}
                update={() => {
                  const xd = interpolate(this.xScale.domain(), xDomain);
                  const yd = interpolate(this.yScale.domain(), yDomain);
                  const yr = interpolate(this.yScale.range(), yRange);

                  return {
                    unused: t => {
                      this.xScale.domain(xd(t));
                      this.yScale.domain(yd(t))
                        .range(yr(t));
                    },
                    timing: {
                      duration: 800
                    }
                  }
                }}
              >
                {() => (
                  <Group top={height / 2} left={width / 2}>
                    {nodes.map((node, i) => (
                      <Group key={i}>
                      <defs>
                      <path id={node.data.name} 
                          d={(()=>this.arc(node))()}
                          fill={color((node.children ? node.data : node.parent.data).name)}
                        />
                      </defs>
                        <text dangerouslySetInnerHTML={{__html: textPath(node.data.name) }} style={{'fontSize': '40px'}}></text>
                        <path
                          d={this.arc(node)}
                          stroke="#fff"
                          fill={color((node.children ? node.data : node.parent.data).name)}
                          fillRule="evenodd"
                          onClick={() => {console.log(node);this.handleClick(node)}}
                          key={`node-${i}`}
                        >

                        </path>

                      </Group>
                    ))}
                  </Group>

                )}
              </Animate>
            )
          }}
        </Partition>
      </svg>
    )
  }
}
