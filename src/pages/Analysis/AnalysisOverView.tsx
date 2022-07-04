import Box from '@mui/material/Box';
import MuiDivider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import AnalysisCard from './AnalysisCard';
import AnalysisReporting from './AnalysisReporting';
import Navigator from './Navigator';

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const AnalysisOverview = (props: any) => {
  const { groupId } = useParams<{ groupId: string }>();
  const [landscapeSelected, setLandscapeSelected] = useState({ id: '', name: '' });
  const location = useLocation<any>();
  const history = useHistory();

  //Clear state after setting the landscape.
  const replaceHistory = useCallback(() => {
    history.replace({ ...location, state: undefined });
  }, [history, location]);

  useEffect(() => {
    if (location?.state?.landscapeId) {
      setLandscapeSelected({ id: location?.state?.landscapeId, name: '' });
      replaceHistory();
    }
  }, [location?.state?.landscapeId, replaceHistory]);

  return (
    <>
      <Grid justifyContent="flex-start" direction={'column'} container spacing={6}>
        <Grid item>
          <Navigator
            groupId={groupId}
            setLandscapeSelected={setLandscapeSelected}
            landscapeSelected={landscapeSelected}
            hideLandscapeSelection={false}
            tailText={''}
          ></Navigator>
        </Grid>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Analysis Overview
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mb={4}>
            <Typography variant="h5" gutterBottom display="inline">
              Repository Analysis
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start" alignItems="center">
            <AnalysisCard
              title="Usage Analysis"
              cardType="usageAnalysis"
              groupId={groupId}
              landscapeId={landscapeSelected.id}
            ></AnalysisCard>
            <AnalysisCard
              title="Repository Overview"
              cardType="repositoryOverview"
              groupId={groupId}
              landscapeId={landscapeSelected.id}
            ></AnalysisCard>
          </Box>
          <br />
          <Box mb={4}>
            <Typography variant="h5" gutterBottom display="inline">
              Code Modernization Analysis
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start" alignItems="center">
            <AnalysisCard
              title="Hard Coding Analysis"
              cardType="hardcodingAnalysis"
              groupId={groupId}
              landscapeId={landscapeSelected.id}
            ></AnalysisCard>
            <AnalysisCard
              title="Code Transformations"
              cardType="codetransformations"
              groupId={groupId}
              landscapeId={landscapeSelected.id}
            ></AnalysisCard>
          </Box>
          <br />
          <Box mb={4}>
            <Typography variant="h5" gutterBottom display="inline">
              Application Modernization
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start" alignItems="center">
            <AnalysisCard
              title="Tech Dependency"
              totalCount={0}
              cardType="techdependency"
              groupId={groupId}
              landscapeId={landscapeSelected.id}
            ></AnalysisCard>
            <AnalysisCard
              title="Package Dependencies"
              totalCount={0}
              cardType="packagedependency"
              groupId={groupId}
              landscapeId={landscapeSelected.id}
            ></AnalysisCard>
          </Box>
          <br />
          <br />
          <Box my={4}>
            <Typography variant="h4" gutterBottom display="inline">
              Download Files
            </Typography>
          </Box>
          <AnalysisReporting landscapeId={landscapeSelected.id}></AnalysisReporting>
        </Grid>
      </Grid>
    </>
  );
};

export default AnalysisOverview;
