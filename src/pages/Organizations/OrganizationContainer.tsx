import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MuiDivider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MuiTypography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useSetNotification } from '../../components/notification/useNotification';
import CreateOrganizationDialog from './CreateOrganizationDialog';
import OrganizationListView from './OrganizationListView';
import { useStyles } from './Organizations.styles';
import useFetchOrganizationListData from './useFetchOrganizationListData';

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const OrganizationContainer = () => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [parentOrgDataForCreateOrganization, setParentOrgDataForCreateOrganization] = useState({
    parentGroupId: '',
    parentGroupName: '',
  });
  const { organizationData, isLoading, fetchDataFlag, setFetchDataFlag } = useFetchOrganizationListData();
  const setMessage = useSetNotification();

  const showNotification = (message: string, severity: string) => {
    setMessage.setMessageModel(message, severity);
  };

  const showDialogBox = () => {
    setDialogOpen(true);
  };

  const hideDialogBox = () => {
    setDialogOpen(false);
  };

  //This will be called when the user clicks on the "Add Organization" button and set the Parent groupId and name will be set
  const handleParentOrgDataForNewOrganization = (parentGroupId: string, parentGroupName: string) => {
    setParentOrgDataForCreateOrganization({ parentGroupId: parentGroupId, parentGroupName: parentGroupName });
  };

  const resetParentOrgDataForNewOrganization = () => {
    setParentOrgDataForCreateOrganization({ parentGroupId: '', parentGroupName: '' });
  };

  return (
    <>
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Organizations
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent className={classes.heading}>
              <Typography className={classes.cardHeading} variant="h6">
                All Organizations
              </Typography>
              <Button variant="contained" color="primary" onClick={showDialogBox}>
                + Add Organizations
              </Button>
            </CardContent>
            <CardContent>
              <Paper className={classes.paper} variant="outlined">
                <OrganizationListView
                  showDialogBox={showDialogBox}
                  handleParentOrgDataForNewOrganization={handleParentOrgDataForNewOrganization}
                  showNotification={showNotification}
                  organizationData={organizationData}
                  isLoading={isLoading}
                ></OrganizationListView>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <CreateOrganizationDialog
        dialogOpen={dialogOpen}
        dialogCallback={hideDialogBox}
        hasChangedCallback={() => setFetchDataFlag(fetchDataFlag + 1)}
        showNotification={showNotification}
        parentGroupId={parentOrgDataForCreateOrganization.parentGroupId}
        parentGroupName={parentOrgDataForCreateOrganization.parentGroupName}
        resetNodeInfo={resetParentOrgDataForNewOrganization}
      />
    </>
  );
};

export default OrganizationContainer;
