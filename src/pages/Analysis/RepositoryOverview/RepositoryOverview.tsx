import MuiDivider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import BreadcrumbNavigation, { IBreadcrumbData } from '../../../components/Nav/BreadcrumbNavigation';
import useGetLandscapeNavigationData from '../../Landscapes/useGetLandscapeNavigationData';
import RepositoryContainer from './RepositoryContainer';

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const RepositoryOverview = (props: any) => {
  const { groupId, landscapeId } = useParams<{ groupId: string; landscapeId: string }>();
  const { groupLandscapeData } = useGetLandscapeNavigationData(groupId);

  const breadcrumbData = [
    { path: `/customer/edit/${groupId}`, toolTip: 'Customer', label: groupLandscapeData.groupName },
    {
      path: `/analysisoverview/${groupId}`,
      toolTip: 'Analysis Overview',
      label: groupLandscapeData?.landScapes?.find((i: any) => i.id === landscapeId)?.name,
      state: { landscapeId: landscapeId },
    },
    { path: '', toolTip: '', label: 'Repository Overview', isActive: true },
  ] as IBreadcrumbData[];

  return (
    <div>
      <Grid justifyContent="flex-start" direction={'column'} container spacing={6}>
        <Grid item>
          <BreadcrumbNavigation data={breadcrumbData} />
          <br />
          <Typography variant="h3" gutterBottom>
            Repository Overview
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <RepositoryContainer landscapeId={landscapeId} />
    </div>
  );
};

export default RepositoryOverview;
