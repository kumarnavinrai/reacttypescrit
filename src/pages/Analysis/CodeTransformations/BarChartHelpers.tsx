import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography/Typography';

export const CustomTooltip = ({ active, payload, label, chartType }: any) => {
  if (active && payload && payload.length) {
    return (
      <Paper variant="outlined" square>
        <div className="custom-tooltip" style={{ textAlign: 'left', padding: '8px' }}>
          {chartType !== 'details' ? (
            <Typography variant="body1">{`${label}`}</Typography>
          ) : (
            <Typography variant="body1">{`${label} - ${payload[0].payload.ruleDescription}`}</Typography>
          )}

          {payload.map((entry: any) => (
            <>
              <Typography variant="body1">{`${getIntroOfPage(entry.name)} : ${entry.value.toLocaleString(
                'en-US'
              )}`}</Typography>
            </>
          ))}
        </div>
      </Paper>
    );
  }
  return null;
};

export const getIntroOfPage = (label: string) => {
  if (label === 'totalCount') {
    return 'Full Repository';
  }
  if (label === 'usedCount') {
    return 'Used Repository';
  }
  return '';
};
