import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import Grid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import BreadcrumbNavigation, { IBreadcrumbData } from '../../../components/Nav/BreadcrumbNavigation';
import useGetLandscapeNavigationData from '../../Landscapes/useGetLandscapeNavigationData';
import PackageDependencyGraphDetailsPanel from './PackageDependencyGraphDetailsPanel';
import PackageDependencyNetworkGraph from './PackageDependencyNetworkGraph';
import { NodeData } from './types';

const Typography = styled(MuiTypography)(spacing);

const PackageDependencyNetworkGraphContainer = (props: any) => {
  const { groupId, landscapeId, entryDevClass } =
    useParams<{ groupId: string; landscapeId: string; entryDevClass: string }>();
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const { groupLandscapeData } = useGetLandscapeNavigationData(groupId);

  const breadcrumbData = [
    { path: `/customer/edit/${groupId}`, toolTip: 'Customer', label: groupLandscapeData.groupName },
    {
      path: `/analysisoverview/${groupId}`,
      toolTip: 'Analysis Overview',
      label: groupLandscapeData?.landScapes?.find((i) => i.id === landscapeId)?.name,
      state: { landscapeId: landscapeId },
    },
    { path: '', toolTip: '', label: 'Package Dependency', isActive: true },
  ] as IBreadcrumbData[];

  return (
    <>
      <Grid container>
        <Grid item>
          <BreadcrumbNavigation data={breadcrumbData} />
          <br />
          <Typography variant="h3" gutterBottom>
            Package Dependencies
          </Typography>
        </Grid>
      </Grid>
      <br />

      <Grid container spacing={6}>
        <Grid item xs={9}>
          <Card variant="outlined">
            <CardContent>
              <PackageDependencyNetworkGraph
                groupId={groupId}
                landscapeId={landscapeId}
                entryDevClassParam={entryDevClass}
                setSelectedNode={setSelectedNode}
              ></PackageDependencyNetworkGraph>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="outlined" sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <PackageDependencyGraphDetailsPanel selectedNode={selectedNode}></PackageDependencyGraphDetailsPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PackageDependencyNetworkGraphContainer;
