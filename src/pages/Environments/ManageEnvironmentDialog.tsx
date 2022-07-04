import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { createEnvironment, getEnvironmentById, updateEnvironmentById } from '../../api/Environments';
import { getLookupsByType } from '../../api/Lookups';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useSetNotification } from '../../components/notification/useNotification';
import { useStyles } from './Environments.styles';
import {
  DropdownType,
  EnvironmentFormDataType,
  ManageEnvironmentsDialogProps,
  UpdateEnvironmentFormDataType,
} from './types';

const initDropdowns = {
  ENVIRONMENT_TYPE: null,
  APPLICATION: null,
  APPLICATION_VERSION: null,
};

const initEnvironmentDetailFormValues = {
  sapSystemId: '',
  description: '',
  environmentTypeTag: '',
  applicationTag: '',
  applicationVersionTag: '',
};

const ManageEnvironmentDialog = (props: ManageEnvironmentsDialogProps) => {
  const classes = useStyles();

  const { groupId, hasChangedCallback, defaultSID, dialogClose } = props;

  const [environmentFormData, setEnvironmentFormData] = useState<EnvironmentFormDataType | null>(null);
  const [updateEnvironmentFormData, setUpdateEnvironmentFormData] = useState<UpdateEnvironmentFormDataType | null>(
    null
  );
  const [environmentDetails, setEnvironmentDetails] = useState<unknown>(null);
  const [dropdowns, setDropdowns] = useState<DropdownType>(initDropdowns);
  const setMessage = useSetNotification();
  const { showApplicationError } = useShowApplicationError();

  const validationSchema = Yup.object().shape({
    sapSystemId: Yup.string()
      .required('SID is required')
      .min(3, 'Must be exactly 3 characters')
      .max(3, 'Must be exactly 3 characters'),
    description: Yup.string().required('Description is required'),
    environmentTypeTag: Yup.string().required('Environment Type is required'),
    applicationTag: Yup.string().required('Application is required'),
    applicationVersionTag: Yup.string().required('Application Version is required'),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: useMemo(() => {
      if (defaultSID) {
        return { ...initEnvironmentDetailFormValues, sapSystemId: defaultSID };
      } else {
        return initEnvironmentDetailFormValues;
      }
    }, [defaultSID]),
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = handleSubmit((data: EnvironmentFormDataType) => {
    //CREATE NEW
    if (groupId && props.action === 'ADD') {
      setEnvironmentFormData({
        ...data,
        name: data.sapSystemId,
        groupId: groupId,
      });
    } else if (props.action === 'EDIT' && updateEnvironmentFormData) {
      //UPDATE
      setUpdateEnvironmentFormData({
        ...updateEnvironmentFormData,
        payload: {
          name: data.sapSystemId,
          groupId: groupId,
          sapSystemId: data.sapSystemId,
          description: data.description,
          environmentTypeTag: data.environmentTypeTag,
          applicationTag: data.applicationTag,
          applicationVersionTag: data.applicationVersionTag,
        },
      });
      setEnvironmentFormData({
        ...data,
        name: data.sapSystemId,
        groupId: groupId,
      });
    }
  });

  // Create or Update Environment once environmentFormData state is updated
  useEffect(() => {
    if (!environmentFormData) {
      return;
    }
    dialogClose();
    if (props.action === 'ADD') {
      createEnvironment(environmentFormData)
        .then((data) => {
          setEnvironmentDetails(data);
          setMessage.setMessageModel('Successfully Created!', 'success');
          hasChangedCallback();
        })
        .catch((error) => showApplicationError(error, 'Error in creating Environment'));
    } else if (props.action === 'EDIT' && updateEnvironmentFormData) {
      updateEnvironmentById(updateEnvironmentFormData)
        .then((data) => {
          setUpdateEnvironmentFormData(data);
          reset(data.payload);
          setMessage.setMessageModel('Successfully Updated!', 'success');
          hasChangedCallback();
        })
        .catch((error) => showApplicationError(error, 'Error in updating Environment'));
    }
  }, [environmentFormData]);

  // Populate form fields if props.action is to EDIT
  useEffect(() => {
    if (props.action === 'EDIT' && props.updateEnvironmentId) {
      reset(initEnvironmentDetailFormValues);
      getEnvironmentById(props.updateEnvironmentId)
        .then((data) => {
          reset(data.payload);
          setUpdateEnvironmentFormData(data);
        })
        .catch((error) => showApplicationError(error, 'Failed to get Environments by Id'));
    }
  }, [props.updateEnvironmentId]);

  // Populate dropdowns inside the dialog box
  useEffect(() => {
    let updatedDropdowns = { ...initDropdowns };
    Object.keys(initDropdowns).forEach((type) => {
      getLookupsByType(`${type}`)
        .then((data) => {
          updatedDropdowns = { ...updatedDropdowns, [type]: data };
          setDropdowns({ ...updatedDropdowns });
        })
        .catch((error) => showApplicationError(error, `Failed to get ${type} lookup`));
    });
  }, [showApplicationError]);

  return (
    <>
      <Dialog open={props.dialogOpen} onClose={dialogClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
        <DialogTitle id="form-dialog-title">
          <Typography className={classes.cardHeading} variant="h5" component="div">
            Add Environment
          </Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={dialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography className={classes.cardHeading} variant="h6">
            Environment Information
          </Typography>
          <br />
          <form id="environment-info" noValidate onSubmit={onSubmit}>
            <Grid container spacing={6}>
              <Grid item xs={6} sm={6}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        id="systemId"
                        label="System ID (SID)"
                        variant="outlined"
                        fullWidth
                        size="small"
                        autoFocus
                        disabled={!!defaultSID}
                        error={!!errors.sapSystemId}
                        helperText={errors?.sapSystemId?.message}
                        {...register('sapSystemId')}
                        {...field}
                      />
                    )}
                    name="sapSystemId"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        id="description"
                        label="System Description"
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
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={6} sm={6}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        select
                        label="Environment Type"
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors.environmentTypeTag}
                        helperText={errors?.environmentTypeTag?.message}
                        {...register('environmentTypeTag')}
                        {...field}
                      >
                        {dropdowns.ENVIRONMENT_TYPE && dropdowns.ENVIRONMENT_TYPE.length > 0 ? (
                          dropdowns.ENVIRONMENT_TYPE.map((type) => (
                            <MenuItem key={type.payload.tag} value={type.payload.tag}>
                              {type.payload.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                        )}
                      </TextField>
                    )}
                    name="environmentTypeTag"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item xs={6} sm={6}></Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={6} sm={6}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        select
                        label="Application"
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors.applicationTag}
                        helperText={errors?.applicationTag?.message}
                        {...register('applicationTag')}
                        {...field}
                      >
                        {dropdowns.APPLICATION && dropdowns.APPLICATION.length > 0 ? (
                          dropdowns.APPLICATION.map((type) => (
                            <MenuItem key={type.payload.tag} value={type.payload.tag}>
                              {type.payload.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                        )}
                      </TextField>
                    )}
                    name="applicationTag"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        select
                        label="Application Version"
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors.applicationVersionTag}
                        helperText={errors?.applicationVersionTag?.message}
                        {...register('applicationVersionTag')}
                        {...field}
                      >
                        {dropdowns.APPLICATION_VERSION && dropdowns.APPLICATION_VERSION.length > 0 ? (
                          dropdowns.APPLICATION_VERSION.map((type) => (
                            <MenuItem key={type.payload.tag} value={type.payload.tag}>
                              {type.payload.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                        )}
                      </TextField>
                    )}
                    name="applicationVersionTag"
                    control={control}
                  />
                </Paper>
              </Grid>
            </Grid>
          </form>
          <br />
          <Typography className={classes.cardHeading} variant="h6">
            Connection Details
          </Typography>
          <br />
          <Grid container spacing={6}>
            <Grid item xs={6} sm={6}>
              <Paper elevation={0} className={classes.paper}>
                <TextField
                  id="host-address"
                  label="Host Address"
                  variant="outlined"
                  fullWidth
                  size="small"
                  disabled={true}
                />
              </Paper>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Paper elevation={0} className={classes.paper}>
                <TextField
                  id="client-number"
                  label="Client Number"
                  variant="outlined"
                  fullWidth
                  size="small"
                  disabled={true}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={6} sm={6}>
              <Paper elevation={0} className={classes.paper}>
                <TextField
                  id="instance-number"
                  label="Instance Number (Formerly System Number)"
                  variant="outlined"
                  fullWidth
                  size="small"
                  disabled={true}
                />
              </Paper>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Paper elevation={0} className={classes.paper}>
                <TextField
                  id="connection-name"
                  label="Connection Logical Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  disabled={true}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={6} sm={6}>
              <Paper elevation={0} className={classes.authMode}>
                <fieldset>
                  <legend>Authentication Mode</legend>

                  <RadioGroup aria-label="authentication-mode" name="authentication-mode" value="username-pass">
                    <FormControlLabel
                      value="username-pass"
                      control={<Radio color="primary" />}
                      label="Username & Password"
                      disabled={true}
                    />
                    <FormControlLabel
                      value="snc/sso"
                      control={<Radio color="primary" />}
                      label="SNC/SSO"
                      disabled={true}
                    />
                  </RadioGroup>
                </fieldset>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={6}></Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="contained" color="primary" type="submit" form="environment-info">
            Save
          </Button>
          <Button onClick={dialogClose} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageEnvironmentDialog;
