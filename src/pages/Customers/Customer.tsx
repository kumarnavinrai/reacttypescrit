import { yupResolver } from '@hookform/resolvers/yup';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import MuiDivider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MuiTypography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import * as Yup from 'yup';
import { createCustomer, getGroupDetails, getOrgsAsList, updateCustomer } from '../../api/Customers';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useSetNotification } from '../../components/notification/useNotification';
import Environments from '../Environments/Environments';
import Landscapes from '../Landscapes/Landscapes';
import OrganizationTreeDialog from '../Organizations/OrganizationTreeDialog';
import { useStyles } from './Customer.styles';
import { CustomerMetaDataProps, GroupDetailProps, OrgsListProps } from './types';

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const initCustomerDetailFormValues = {
  name: '',
  emailAddress: '',
  description: '',
  parentGroupId: '',
  parentGroupName: '',
  groupTypeTag: 'CUSTOMER',
  internalGroup: false,
};

export type CustomerFormDataProps = typeof initCustomerDetailFormValues;

interface ParamProps {
  mode: string;
  id?: string;
}

const Customer = ({ match }: RouteComponentProps<ParamProps>) => {
  const [orgsList, setOrgsList] = useState<OrgsListProps[] | null>(null);
  const [formData, setFormData] = useState<CustomerFormDataProps | null>(null);
  const [groupDetails, setGroupDetails] = useState<GroupDetailProps | null>(null);
  const [customerMetaData, setCustomerMetaData] = useState<CustomerMetaDataProps | null>(null);
  const [rerenderEnvironmentsFlag, setRerenderEnvironmentsFlag] = useState(0); // This state gets updated to rerender component upon change
  const [redirectToEditPage, setRedirectToEditPage] = useState(false); //Redirect to Edit page after Customer is CREATED.
  const [organizationTreeDialogOpen, setOrganizationTreeDialogOpen] = useState<boolean>(false);
  const [showProgressIndicator, setShowProgressIndicator] = React.useState(true);
  const setMessage = useSetNotification();

  const { showApplicationError } = useShowApplicationError();
  const history = useHistory();

  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Customer Name is required'),
    emailAddress: Yup.string().email('Please enter valid Email ID.').required('Email ID is required'),
    description: Yup.string(),
    parentGroupId: Yup.string(),
    parentGroupName: Yup.string().required('Organization is required'),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: initCustomerDetailFormValues,
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm(formOptions);

  const onSubmit = handleSubmit((data: CustomerFormDataProps) => {
    setFormData({
      ...initCustomerDetailFormValues,
      ...data,
    });
  });

  useEffect(() => {
    getOrgsAsList()
      .then((data) => setOrgsList(data))
      .catch((error) => showApplicationError(error, 'Error in getting Orgs list'));
  }, [showApplicationError]);

  useEffect(() => {
    if (match.params.mode === 'edit' && match.params.id && orgsList) {
      getGroupDetails(match.params.id)
        .then((data) => {
          setGroupDetails(data);
          var orgFound = orgsList.find((x) => x.groupId === data.payload.parentGroupId);
          reset(Object.assign(data.payload, { parentGroupName: orgFound?.groupName }));
          setCustomerMetaData(data.metadata);
          setShowProgressIndicator(false);
        })
        .catch((error) => {
          showApplicationError(error, 'Error in getting Group details');
          setShowProgressIndicator(false);
        });
    }
  }, [orgsList, showApplicationError, setShowProgressIndicator]);

  useEffect(() => {
    if (!match.params.id) setShowProgressIndicator(false);

    if (!formData) {
      return;
    }

    //We are ignoring parentGroupName from the form (NOT required).
    //It is a read-only data from the tree selection of Organization. Only for display purpose
    const { parentGroupName, ...customerFormData } = formData;

    if (match.params.mode === 'edit' && match.params.id && formData?.name && orgsList) {
      const feedbackData = { ...groupDetails, payload: customerFormData };

      updateCustomer(match.params.id, feedbackData)
        .then((data) => {
          setMessage.setMessageModel('Successfully Updated!', 'success');
          setGroupDetails(data);
          var orgFound = orgsList.find((x) => x.groupId === data.payload.parentGroupId);
          //Reset the form data along with Org Name (Read-only)
          reset(Object.assign(data.payload, { parentGroupName: orgFound?.groupName }));
          setCustomerMetaData(data.metadata);
        })
        .catch((error) => showApplicationError(error, 'Error in updating customer'));
      return;
    }

    createCustomer(customerFormData)
      .then((data) => {
        setGroupDetails(data);
        setCustomerMetaData(data.metadata);
        setRedirectToEditPage(true);
        setMessage.setMessageModel('Successfully Created!', 'success');
      })
      .catch((error) => showApplicationError(error, 'Error in creating customer'));
  }, [formData, showApplicationError, setShowProgressIndicator]);

  //Show environments and landscapes in EDIT mode only
  const environmentsAndLandscapes = (
    <>
      <br />
      <Environments
        groupId={groupDetails ? groupDetails.id : ''}
        rerenderEnvironmentsFlag={rerenderEnvironmentsFlag}
        setRerenderEnvironmentsFlag={() => setRerenderEnvironmentsFlag(rerenderEnvironmentsFlag + 1)}
      />
      <br />
      <Landscapes
        groupId={groupDetails ? groupDetails.id : ''}
        rerenderEnvironmentsFlag={rerenderEnvironmentsFlag}
        setRerenderEnvironmentsFlag={() => setRerenderEnvironmentsFlag(rerenderEnvironmentsFlag + 1)}
      />
    </>
  );

  //Redirect the user to EDIT screen after the Customer is CREATED.
  if (redirectToEditPage === true && groupDetails) {
    setRedirectToEditPage(false);
    history.push(`/customer/edit/${groupDetails.id}`);
  }

  //Set the org to the input fields which was selected from modal dialog
  const handleSelectedOrganization = (orgId: string, orgName: string) => {
    setValue('parentGroupId', orgId, {
      shouldValidate: true,
      shouldTouch: true,
    });
    setValue('parentGroupName', orgName, {
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <>
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {match.params && match.params.mode === 'edit' ? 'Update' : 'Add'} Customer
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent className={classes.heading}>
              <Typography className={classes.cardHeading} variant="h5">
                Customer Details
              </Typography>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                form="customer-details"
                type="submit"
              >
                Save Customer
              </Button>
            </CardContent>
            <form id="customer-details" noValidate onSubmit={onSubmit}>
              <CardContent className={classes.customerDetails}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <Paper elevation={0} className={classes.paper}>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            label="Customer Name"
                            variant="outlined"
                            size="small"
                            placeholder="Add customer name"
                            fullWidth
                            autoFocus
                            error={!!errors.name}
                            helperText={errors?.name?.message}
                            {...register('name')}
                            {...field}
                          />
                        )}
                        name="name"
                        control={control}
                      />
                    </Paper>
                    <Paper elevation={0} className={classes.paper}>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            label="Customer Contact"
                            variant="outlined"
                            placeholder="Enter Email Address"
                            fullWidth
                            size="small"
                            error={!!errors.emailAddress}
                            helperText={errors?.emailAddress?.message}
                            {...register('emailAddress')}
                            {...field}
                          />
                        )}
                        name="emailAddress"
                        control={control}
                      />
                    </Paper>
                    <Paper elevation={0} className={classes.paper}>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            label="Select Organization"
                            placeholder="Click here to Select organization"
                            variant="outlined"
                            fullWidth
                            size="small"
                            error={!!errors.parentGroupName}
                            helperText={errors?.parentGroupName?.message}
                            {...register('parentGroupName')}
                            {...field}
                            onClick={() => setOrganizationTreeDialogOpen(true)}
                            InputProps={{
                              readOnly: true,
                            }}
                          ></TextField>
                        )}
                        name="parentGroupName"
                        control={control}
                      />
                    </Paper>
                    <Paper elevation={0} className={classes.paper}>
                      <Controller
                        render={({ field }) => <input type="hidden" {...register('parentGroupId')} />}
                        name="parentGroupId"
                        control={control}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Paper elevation={0} className={classes.paper}>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            label="Customer Description (optional)"
                            placeholder="Describe the customer"
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                            size="small"
                            error={!!errors.description}
                            helperText={errors?.description?.message}
                            {...register('description')}
                            {...field}
                          />
                        )}
                        name="description"
                        control={control}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Paper elevation={0} className={classes.paper}>
                      <Grid container spacing={2}>
                        <Grid container item xs={12} spacing={2}>
                          <Grid item xs={6}>
                            <div className={classes.map}>Created By:</div>
                          </Grid>
                          <Grid item xs={6}>
                            <div className={classes.map}>{customerMetaData ? customerMetaData?.createdBy : ''}</div>
                          </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                          <Grid item xs={6}>
                            <div className={classes.map}>Created On:</div>
                          </Grid>
                          <Grid item xs={6}>
                            <div className={classes.map}>
                              {customerMetaData && customerMetaData.createdAt
                                ? new Date(customerMetaData.createdAt).toLocaleString()
                                : ''}
                            </div>
                          </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                          <Grid item xs={6}>
                            <div className={classes.map}>Last Changed By:</div>
                          </Grid>
                          <Grid item xs={6}>
                            <div className={classes.map}>{customerMetaData ? customerMetaData?.modifiedBy : ''}</div>
                          </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                          <Grid item xs={6}>
                            <div className={classes.map}>Last Changed On:</div>
                          </Grid>
                          <Grid item xs={6}>
                            <div className={classes.map}>
                              {customerMetaData && customerMetaData.modifiedAt
                                ? new Date(customerMetaData.modifiedAt).toLocaleString()
                                : ''}
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </form>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {match.params && match.params.mode === 'edit' ? environmentsAndLandscapes : null}
        </Grid>
      </Grid>
      <OrganizationTreeDialog
        organizationTreeDialogOpen={organizationTreeDialogOpen}
        setOrganizationTreeDialogOpen={setOrganizationTreeDialogOpen}
        handleSelectedOrganization={handleSelectedOrganization}
      ></OrganizationTreeDialog>
      <Backdrop
        className={classes.backdrop}
        open={showProgressIndicator}
        onClick={() => setShowProgressIndicator(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Customer;
