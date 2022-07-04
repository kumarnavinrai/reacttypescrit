import MuiDivider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import BreadcrumbNavigation, { IBreadcrumbData } from '../../../components/Nav/BreadcrumbNavigation';
import useGetLandscapeNavigationData from '../../Landscapes/useGetLandscapeNavigationData';
import { useStyles } from './PackageDepOverview.styles';
import PackageDepSearch from './PackageDepSearch';
import PackageDepTable from './PackageDepTable';

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const PackageDepOverview = (props: any) => {
  const { groupId, landscapeId } = useParams<{ groupId: string; landscapeId: string }>();
  const classes = useStyles();

  const { groupLandscapeData } = useGetLandscapeNavigationData(groupId);

  const [search, setSearch] = useState('');

  const breadcrumbData = [
    { path: `/customer/edit/${groupId}`, toolTip: 'Customer', label: groupLandscapeData.groupName },
    {
      path: `/analysisoverview/${groupId}`,
      toolTip: 'Analysis Overview',
      label: groupLandscapeData?.landScapes?.find((i: any) => i.id === landscapeId)?.name,
      state: { landscapeId: landscapeId },
    },
    { path: '', toolTip: '', label: 'Package Dependencies', isActive: true },
  ] as IBreadcrumbData[];

  return (
    <>
      <Grid justifyContent="flex-start" direction={'column'} container spacing={6}>
        <Grid item>
          <BreadcrumbNavigation data={breadcrumbData} />
          <br />
          <Typography variant="h3" gutterBottom className={classes.heading}>
            Package Dependencies
            <div style={{ flexGrow: 1 }}></div>
            <PackageDepSearch setSearch={setSearch} />
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PackageDepTable landscapeId={landscapeId} search={search}></PackageDepTable>
        </Grid>
      </Grid>
    </>
  );
};

export default PackageDepOverview;
