import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { BarData, Chart1, Chart2 } from './mockData';
import { useStyles } from './UsageAnalysis.styles';
import UsageAnalysisBarChart from './UsageAnalysisBarChart';
import UsageAnalysisDonutChart from './UsageAnalysisDonutChart';

const UsageAnalysisContainer = () => {
  const classes = useStyles();

  return (
    <Box>
      <Grid container xs={12} spacing="24">
        <Grid container item xs={3} alignContent="flex-start" spacing="24">
          <Grid item xs={12}>
            <Card variant="outlined" className={classes.cardLayout}>
              <CardContent>
                <Typography className={classes.cardTitle}>Total Objects Used:</Typography>
                <Typography className={classes.cardMiddleContent}>58%</Typography>
                <Typography className={classes.cardBottomContent}>26,542 / 45,70</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined" className={classes.cardLayout}>
              <CardContent>
                <Typography className={classes.cardTitle}>Used LOC:</Typography>
                <Typography className={classes.cardMiddleContent}>69%</Typography>
                <Typography className={classes.cardBottomContent}>1,623,239 / 2,363,753</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined" className={classes.cardLayout}>
              <CardContent>
                <Typography className={classes.cardTitle}>Used LOC (Normalized):</Typography>
                <Typography className={classes.cardMiddleContent}>70%</Typography>
                <Typography className={classes.cardBottomContent}>1,023,203 / 1,472,071</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container item xs={9} spacing="24">
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Grid container xs={12}>
                  <Grid item xs={6}>
                    <Typography className={classes.cardTitle}>Used & Unused Objects</Typography>
                    <UsageAnalysisDonutChart Data={Chart1} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.cardTitle}>Lines of Code (normalized)</Typography>
                    <UsageAnalysisDonutChart Data={Chart2} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography className={classes.cardTitle}>Used vs. Unused by Object Type</Typography>
                <UsageAnalysisBarChart Data={BarData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsageAnalysisContainer;
