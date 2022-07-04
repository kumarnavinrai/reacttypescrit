import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useQuery } from 'react-query';
import { getRepositoryOverviewReportData } from '../../../api/Reports';
import RepositoryChart from './RepositoryChart';
import RepositoryDetail from './RepositoryDetail';

const RepositoryContainer = (props: any) => {
  const { landscapeId } = props;

  //Fetching Repository Overview Data
  const { data: repositoryOverviewData } = useQuery('repositoryOverviewData', () =>
    getRepositoryOverviewReportData(landscapeId)
  );

  return (
    <Box>
      <Grid container xs={12} spacing="24">
        <Grid container item xs={4} alignContent="flex-start" spacing="24">
          <RepositoryDetail repositoryOverviewData={repositoryOverviewData} />
        </Grid>
        <Grid container item xs={8} spacing="24">
          <RepositoryChart repositoryOverviewData={repositoryOverviewData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RepositoryContainer;
