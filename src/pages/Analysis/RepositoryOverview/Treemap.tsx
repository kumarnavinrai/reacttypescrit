import Box from '@mui/material/Box';
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts';
import { CHART_COLOR_PALETTE } from '../../../constants';

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
        <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="white" fontSize={14}>
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
      <Box bgcolor="white" paddingY={0.5} paddingX={2} color="#233044" borderRadius={2}>
        <p className="label">
          {payload[0].value} - {payload[0].payload.name} ({payload[0].payload.description})
        </p>
      </Box>
    );
  }

  return null;
};

const RepositoryTreemap = (props: any) => {
  const { repositoryOverviewData } = props;

  const treeMapData = repositoryOverviewData?.objectTypeCounts?.map((item: any) => {
    return { name: item.objectType, totalCount: item.totalCount, description: item.objectTypeDescription };
  });

  return (
    <>
      {treeMapData && treeMapData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%" aspect={16 / 9}>
          <Treemap
            data={treeMapData}
            dataKey="totalCount"
            stroke="white"
            fill="#8884d8"
            content={<TreemapContent colors={CHART_COLOR_PALETTE} />}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      ) : null}
    </>
  );
};

export default RepositoryTreemap;
