import Box from '@mui/material/Box';
import MuiDivider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import BreadcrumbNavigation, { IBreadcrumbData } from '../../components/Nav/BreadcrumbNavigation';
import useGetLandscapeNavigationData from '../Landscapes/useGetLandscapeNavigationData';
import TechDependencyForm from './TechDependencyForm';
import TechDependencyReporting from './TechDependencyReporting';
import useGetTechDependencyReportDataByLandscapeId from './useGetTechDependencyReportDataByLandscapeId';

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const TechDependencyOverview = (props: any) => {
  const { groupId, landscapeId } = useParams<{ groupId: string; landscapeId: string }>();
  const { groupLandscapeData } = useGetLandscapeNavigationData(groupId);
  const defaultPageSize = 10;

  const {
    reportDataByLandscape,
    pageSize,
    pageIndex,
    onPageSizeChange,
    onPageChange,
    isLoading,
    fetchDataFlag,
    setFetchDataFlag,
  } = useGetTechDependencyReportDataByLandscapeId(landscapeId, defaultPageSize);

  const breadcrumbData = [
    { path: `/customer/edit/${groupId}`, toolTip: 'Customer', label: groupLandscapeData.groupName },
    {
      path: `/analysisoverview/${groupId}`,
      toolTip: 'Analysis Overview',
      label: groupLandscapeData?.landScapes?.find((i: any) => i.id === landscapeId)?.name,
      state: { landscapeId: landscapeId },
    },
    { path: '', toolTip: '', label: 'Tech Dependencies', isActive: true },
  ] as IBreadcrumbData[];

  return (
    <>
      <Grid justifyContent="flex-start" direction={'column'} container spacing={6}>
        <Grid item>
          <BreadcrumbNavigation data={breadcrumbData} />
        </Grid>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Tech Dependencies
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <TechDependencyForm
              landscapeId={landscapeId}
              fetchDataFlag={fetchDataFlag}
              setFetchDataFlag={setFetchDataFlag}
            />
          </Box>
          <Box my={4}>
            <Typography variant="h4" gutterBottom display="inline">
              Download Reports
            </Typography>
          </Box>
          <TechDependencyReporting
            landscapeId={landscapeId}
            reportDataByLandscape={reportDataByLandscape}
            pageIndex={pageIndex}
            pageSize={pageSize}
            isLoading={isLoading}
            onPageSizeChange={onPageSizeChange}
            onPageChange={onPageChange}
            setFetchDataFlag={setFetchDataFlag}
            fetchDataFlag={fetchDataFlag}
          ></TechDependencyReporting>
        </Grid>
      </Grid>
    </>
  );
};

export default TechDependencyOverview;
