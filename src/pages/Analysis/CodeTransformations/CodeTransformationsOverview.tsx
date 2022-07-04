import MuiDivider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { getCodeTransformationRuleset } from '../../../api/Reports';
import BreadcrumbNavigation, { IBreadcrumbData } from '../../../components/Nav/BreadcrumbNavigation';
import useGetLandscapeNavigationData from '../../Landscapes/useGetLandscapeNavigationData';
import CodeTransformations from './CodeTransformations';

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const CodeTransformationsOverview = (props: any) => {
  const { groupId, landscapeId } = useParams<{ groupId: string; landscapeId: string }>();
  const { groupLandscapeData } = useGetLandscapeNavigationData(groupId);

  const breadcrumbData = [
    { path: `/customer/edit/${groupId}`, toolTip: 'Customer', label: groupLandscapeData.groupName },
    {
      path: `/analysisoverview/${groupId}`,
      toolTip: 'Landscapes',
      label: groupLandscapeData?.landScapes?.find((i: any) => i.id === landscapeId)?.name,
      state: { landscapeId: landscapeId },
    },
    { path: '', toolTip: '', label: 'Code Transformations', isActive: true },
  ] as IBreadcrumbData[];

  //Fetching Ruleset Summary and Details
  const { data: rulesetData } = useQuery('rulesetSummary', () => getCodeTransformationRuleset(landscapeId));

  return (
    <div>
      <Grid justifyContent="flex-start" direction={'column'} container spacing={6}>
        <Grid item>
          <BreadcrumbNavigation data={breadcrumbData} />
          <br />
          <Typography variant="h3" gutterBottom>
            Code Transformations
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <CodeTransformations rulesetData={rulesetData} />
    </div>
  );
};

export default CodeTransformationsOverview;
