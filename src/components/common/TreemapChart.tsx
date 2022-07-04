import Box from '@mui/material/Box';
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts';
import { CHART_COLOR_PALETTE } from '../../constants';
import { data } from '../../pages/Analysis/HardCodingAnalysis/treeMockData'; //TODO: Remove mockData

const TreemapContent = (props: any) => {
  const { root, depth, x, y, width, height, index, colors, name, value } = props;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 4)] : 'rgba(255,255,255,0)',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 ? (
        <text x={x + width / 12} y={y + height / 2 + 7} textAnchor="start" fill="white" fontSize={14}>
          {name} - {value}
        </text>
      ) : null}
    </g>
  );
};

const CustomTooltip = (props: any) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    return (
      <Box bgcolor="white" sx={{ px: '10px', py: '5px', color: 'info.main' }} color="#233044" borderRadius={1}>
        {payload[0].payload.name}: {payload[0].value}
      </Box>
    );
  }

  return null;
};

const TreemapChart = () => {
  return (
    <ResponsiveContainer width={'100%'} aspect={1}>
      <Treemap
        data={data}
        dataKey="size"
        stroke="#FFFFFF"
        fill="#8884d8"
        content={<TreemapContent colors={CHART_COLOR_PALETTE} />}
      >
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default TreemapChart;
