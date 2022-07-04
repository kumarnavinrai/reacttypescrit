import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { CustomTooltip } from './BarChartHelpers';

const RulesetDetailChart = (props: any) => {
  const { rulesetDetail } = props;

  return (
    <>
      <ResponsiveContainer aspect={16 / 16} width="100%" maxHeight={280}>
        <BarChart data={rulesetDetail}>
          <XAxis dataKey="ruleId" axisLine={false} />
          <Tooltip content={<CustomTooltip chartType="details" />} />
          <Bar dataKey="totalCount" stackId="a" fill="#FF9F40" barSize={25} />
          <Bar dataKey="usedCount" stackId="a" fill="#5388D8" barSize={25} />
        </BarChart>
      </ResponsiveContainer>
      <Grid container direction="column">
        <Grid item container justifyContent="center">
          <Grid item>
            <Typography>Used Repository</Typography>
          </Grid>
          <Grid item>
            <FiberManualRecordIcon style={{ color: '#5388D8' }} />
          </Grid>
        </Grid>
        <Grid item container justifyContent="center">
          <Grid item>
            <Typography>Full Repository</Typography>
          </Grid>
          <Grid item>
            <FiberManualRecordIcon style={{ color: '#FF9F40' }} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RulesetDetailChart;
