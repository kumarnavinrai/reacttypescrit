import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={'#767676'}>
        {payload.ChartContent.InnerText}
      </text>
      <text x={cx} y={cy + 20} dy={8} textAnchor="middle" fill={'#000000'}>
        {payload.ChartContent.InnerNumber}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const renderLegend = (props: any) => {
  const { payload } = props;

  return (
    <Grid container style={{ justifyContent: 'center' }}>
      <div>
        {payload.map((entry: any, index: any) => (
          <Grid container spacing={1}>
            <Grid item>
              <FiberManualRecordIcon fontSize="small" style={{ color: entry.color }} />
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 14, color: '#767676', fontWeight: 'bold' }}>
                {entry.payload.name}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </div>
    </Grid>
  );
};
const COLORS = ['#FF9F40', '#5388D8'];
const UsageAnalysisDonutChart = (props: any) => {
  const { Data } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <ResponsiveContainer height="100%" width="100%" maxHeight={400}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={Data}
          innerRadius={85}
          outerRadius={135}
          fill="red"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {Data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default UsageAnalysisDonutChart;
