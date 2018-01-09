import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import { partition as d3partition } from 'd3-hierarchy';
import { HierarchyDefaultNode as DefaultNode } from '@vx/hierarchy';

Partition.propTypes = {
  root: PropTypes.object.isRequired,
  children: PropTypes.func
};

export default function Partition({
  top,
  left,
  className,
  root,
  size,
  round,
  padding,
  children,
  nodeComponent = DefaultNode,
  ...restProps
}) {
  const partition = d3partition();
  if (size) partition.size(size);
  if (round) partition.round(round);
  if (padding) partition.padding(padding);

  const data = partition(root);
  const links = data.links();
  const descendants = root.descendants();

  if (!!children) {
    return (
      <Group top={top} left={left} className={cx('vx-partition', className)}>
        {children({ data, links, root, descendants })}
      </Group>
    );
  }

  return (
    <Group top={top} left={left} className={cx('vx-partition', className)}>
      {nodeComponent &&
        descendants.map((node, i) => {
          return (
            <Group key={`partition-node-${i}`}>
              {React.createElement(nodeComponent, { node })}
            </Group>
          );
        })}
    </Group>
  );
}
