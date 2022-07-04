import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import Grid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import BreadcrumbNavigation, { IBreadcrumbData } from '../../../components/Nav/BreadcrumbNavigation';
import useGetLandscapeNavigationData from '../../Landscapes/useGetLandscapeNavigationData';
import { useStyles } from './HardCodingAnalysis.styles';
import HardCodingAnalysisChart from './HardCodingAnalysisChart';
import HardcodingCirclePackingChart from './HardcodingCirclePackingChart';
import HardCodingTable from './HardCodingTable';

const Typography = styled(MuiTypography)(spacing);

const HardCodingAnalysisOverview = (props: any) => {
  const { groupId, landscapeId } = useParams<{ groupId: string; landscapeId: string }>();
  const { groupLandscapeData } = useGetLandscapeNavigationData(groupId);
  const [domainSelected, setDomainSelected] = useState('');
  const classes = useStyles();

  const breadcrumbData = [
    { path: `/customer/edit/${groupId}`, toolTip: 'Customer', label: groupLandscapeData.groupName },
    {
      path: `/analysisoverview/${groupId}`,
      toolTip: 'Analysis Overview',
      label: groupLandscapeData?.landScapes?.find((i: any) => i.id === landscapeId)?.name,
      state: { landscapeId: landscapeId },
    },
    { path: '', toolTip: '', label: 'Hard Coding Analysis', isActive: true },
  ] as IBreadcrumbData[];

  const renderChart = () => {
    if (domainSelected)
      return <HardcodingCirclePackingChart domainSelected={domainSelected} setDomainSelected={setDomainSelected} />;

    return <HardCodingAnalysisChart />;
  };

  return (
    <Box>
      <Grid container>
        <Grid item>
          <BreadcrumbNavigation data={breadcrumbData} />
          <br />
          <Typography variant="h3" gutterBottom>
            Hard Coding Analysis
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <Card variant="outlined" className={classes.cardLayout}>
            <CardContent>
              <HardCodingTable setDomainSelected={setDomainSelected} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card variant="outlined" sx={{ height: '100%', width: '100%' }}>
            <CardContent>{renderChart()}</CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HardCodingAnalysisOverview;
