import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useStyles } from './Repository.styles';

const RepositoryDetail = (props: any) => {
  const classes = useStyles();
  const { repositoryOverviewData } = props;

  const objectTypeSummaryAllCount = repositoryOverviewData?.objectTypeCounts
    ?.map((item: { totalCount: any }) => item.totalCount)
    .reduce((prev: any, curr: any) => prev + curr, 0);

  const objectTypeSummaryUsedCount = repositoryOverviewData?.objectTypeCounts
    ?.map((item: { usedCount: any }) => item.usedCount)
    .reduce((prev: any, curr: any) => prev + curr, 0);

  const otherObjectTypeSummaryAllCount = repositoryOverviewData?.otherObjectTypeCounts
    ?.map((item: { totalCount: any }) => item.totalCount)
    .reduce((prev: any, curr: any) => prev + curr, 0);

  const otherObjectTypeSummaryUsedCount = repositoryOverviewData?.otherObjectTypeCounts
    ?.map((item: { usedCount: any }) => item.usedCount)
    .reduce((prev: any, curr: any) => prev + curr, 0);

  return (
    <>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Object Count
            </Typography>
            <br />
            <Grid className={classes.heading} container spacing={2}>
              <Grid item xs={6}>
                Object Type
              </Grid>
              <Grid item xs={3} textAlign={'right'}>
                All
              </Grid>
              <Grid item xs={3} textAlign={'right'}>
                Used
              </Grid>
            </Grid>

            {repositoryOverviewData &&
              repositoryOverviewData.objectTypeCounts &&
              repositoryOverviewData.objectTypeCounts.map((item: any) => (
                <Grid container spacing={2} p={1}>
                  <Grid item xs={6}>
                    <Tooltip title={item.objectTypeDescription} placement="top-start">
                      <div>{item.objectType}</div>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={3} textAlign={'right'}>
                    {item.totalCount.toLocaleString('en-US')}
                  </Grid>
                  <Grid item xs={3} textAlign={'right'}>
                    {item.usedCount.toLocaleString('en-US')}
                  </Grid>
                </Grid>
              ))}

            <br />
            <Divider />
            <br />
            <Grid className={classes.heading} container spacing={2}>
              <Grid item xs={6}>
                TOTAL
              </Grid>
              <Grid item xs={3} textAlign={'right'}>
                {objectTypeSummaryAllCount && objectTypeSummaryAllCount.toLocaleString('en-US')}
              </Grid>
              <Grid item xs={3} textAlign={'right'}>
                {objectTypeSummaryUsedCount && objectTypeSummaryUsedCount.toLocaleString('en-US')}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Other Object Types
            </Typography>
            <br />
            <Grid className={classes.heading} container spacing={2}>
              <Grid item xs={6}>
                Object Type
              </Grid>
              <Grid item xs={3} textAlign={'right'}>
                All
              </Grid>
              <Grid item xs={3} textAlign={'right'}>
                Used
              </Grid>
            </Grid>

            {repositoryOverviewData &&
              repositoryOverviewData.otherObjectTypeCounts &&
              repositoryOverviewData.otherObjectTypeCounts.map((item: any) => (
                <Grid container spacing={2} p={1}>
                  <Grid item xs={6}>
                    <Tooltip title={item.objectTypeDescription} placement="top-start">
                      <div>{item.objectType}</div>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={3} textAlign={'right'}>
                    {item.totalCount.toLocaleString('en-US')}
                  </Grid>
                  <Grid item xs={3} textAlign={'right'}>
                    {item.usedCount.toLocaleString('en-US')}
                  </Grid>
                </Grid>
              ))}
            <br />
            <Divider />
            <br />
            <Grid className={classes.heading} container spacing={2}>
              <Grid item xs={6}>
                TOTAL
              </Grid>
              <Grid item xs={3} textAlign={'right'}>
                {otherObjectTypeSummaryAllCount && otherObjectTypeSummaryAllCount.toLocaleString('en-US')}
              </Grid>
              <Grid item xs={3} textAlign={'right'}>
                {otherObjectTypeSummaryUsedCount && otherObjectTypeSummaryUsedCount.toLocaleString('en-US')}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default RepositoryDetail;
