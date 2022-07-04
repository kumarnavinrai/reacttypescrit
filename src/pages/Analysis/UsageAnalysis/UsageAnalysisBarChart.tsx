import Typography from '@mui/material/Typography';
import { Bar, BarChart, ResponsiveContainer, Text, Tooltip, XAxis } from 'recharts';

const getIntroOfPage = (label: string) => {
  if (label === 'usedObjects') {
    return 'Used Objects';
  }
  if (label === 'unUsedObjects') {
    return 'Unused Objects';
  }
  return '';
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ fontWeight: 'bold', fontSize: 15 }}>
        <Typography className="label">{`${label}`}</Typography>
        {payload.map((entry: any) => (
          <>
            <Typography className="label">{`${getIntroOfPage(entry.name)} : ${entry.value}`}</Typography>
          </>
        ))}
      </div>
    );
  }
  return null;
};

const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <Text x={x} y={y} width={75} textAnchor="middle" verticalAnchor="start">
      {payload.value}
    </Text>
  );
};

const UsageAnalysisBarChart = (props: any) => {
  const { Data } = props;
  return (
    <ResponsiveContainer aspect={4 / 3} width="100%" height="100%" maxHeight={250}>
      <BarChart data={Data} barSize={25}>
        <XAxis dataKey="name" axisLine={false} tick={<CustomizedAxisTick />} />
        <Tooltip content={CustomTooltip} />
        <Bar dataKey="usedObjects" stackId="a" fill="#FF9F40" />
        <Bar dataKey="unUsedObjects" stackId="a" fill="#5388D8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsageAnalysisBarChart;
