import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import React from 'react';
import { CHART_COLOR_PALETTE } from '../../constants';

const CirclePackingChart = (props: any) => {
  const { data } = props;
  return (
    <ResponsiveCirclePacking
      data={data}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      id="name"
      value="loc"
      leavesOnly={true}
      colors={CHART_COLOR_PALETTE}
      childColor={{ from: 'color', modifiers: [['brighter', 0.4]] }}
      padding={4}
      enableLabels={true}
      labelsFilter={function (e) {
        return 1 === e.node.depth;
      }}
      tooltip={({ id, value, color }) => (
        <strong style={{ color: '#376FD0' }}>
          {id}: {value}
        </strong>
      )}
      labelsSkipRadius={10}
      labelTextColor={{ from: 'color', modifiers: [['darker', 4]] }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
      colorBy="id"
    />
  );
};

export default CirclePackingChart;
