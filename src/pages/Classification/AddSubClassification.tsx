import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import { createSubClassification } from '../../api/Classification/index';
import { getGroupDetails } from '../../api/Customers';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useSetNotification } from '../../components/notification/useNotification';
import OrganizationTreeDialog from '../Organizations/OrganizationTreeDialog';
import { useStyles } from './Classification.styles';
import { DefaultGroupDataContext } from './DefaultGroupDataContext';
import { FormSubClassificationDataProps } from './types';

const AddSubClassification = (props: any) => {
  const classes = useStyles();

  const { dialogCallback, dialogOpen, selectedClassificationType, selectedClassificationDetails } = props;

  var defaultGroupContextData = React.useContext(DefaultGroupDataContext);

  //Fetching group details for scope
  const { data: groupDetails } = useQuery('getGroupDetails', () =>
    getGroupDetails(selectedClassificationDetails.classificationTypeGroupId)
  );

  const validationSchema = Yup.object().shape({
    parentObjectClassificationTag: Yup.string().required('Parent Object Classification Type is required'),
    objectSubClassificationName: Yup.string().required('Sub-Classification Name is required'),
    objectSubClassificationTag: Yup.string().required('Sub-Classification Tag is required'),
    defaultGroup: Yup.bool(),
    groupId: Yup.string(),
    groupName: Yup.string().when('defaultGroup', { is: false, then: Yup.string().required('Scope (Org) is required') }),
  });

  let initFormValues = {
    parentObjectClassificationTag: selectedClassificationType,
    objectSubClassificationName: '',
    objectSubClassificationTag: '',
    groupId:
      selectedClassificationDetails.classificationTypeDefaultGroup === false
        ? selectedClassificationDetails.classificationTypeGroupId
        : defaultGroupContextData.groupId,
    groupName: selectedClassificationDetails.classificationTypeDefaultGroup === false ? '' : 'DEFAULT',
    defaultGroup: selectedClassificationDetails.classificationTypeDefaultGroup,
  };

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: initFormValues,
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm(formOptions);

  const [formData, setFormData] = useState<FormSubClassificationDataProps | null>(null);
  const [organizationTreeDialogOpen, setOrganizationTreeDialogOpen] = useState<boolean>(false);
  const setMessage = useSetNotification();
  const { showApplicationError } = useShowApplicationError();

  const isDefaultGroupSelected = watch('defaultGroup');

  const onSubmit = handleSubmit((data: FormSubClassificationDataProps) => {
    setFormData(data);
  });

  //Set the org to the input fields which was selected from modal dialog
  const handleSelectedOrganization = (orgId: string, orgName: string) => {
    setValue('groupId', orgId, {
      shouldValidate: true,
      shouldTouch: true,
    });
    setValue('groupName', orgName, {
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  //Handle checkbox change event for DEFAULT group
  const handleDefaultGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('defaultGroup', event.target.checked, {
      shouldTouch: true,
    });

    //Set the Default group name and id when the checkbox is checked
    if (event.target.checked) {
      setValue('groupName', 'DEFAULT', {
        shouldTouch: true,
      });

      if (defaultGroupContextData.defaultGroup === true) {
        setValue('groupId', defaultGroupContextData.groupId, { shouldTouch: true });
      }
    }

    //Clear groupid and groupname if the checkbox is unchecked
    if (!event.target.checked) {
      setValue('groupId', '', {
        shouldTouch: true,
      });

      setValue('groupName', '', {
        shouldTouch: true,
      });
    }
  };

  const handleDialogClose = useCallback(
    (refreshData: boolean) => {
      reset();
      setFormData(null);
      dialogCallback(false, refreshData);
    },
    [dialogCallback, reset]
  );

  //Assign Group Name to the Input field
  useEffect(() => {
    if (groupDetails && groupDetails.payload && groupDetails.payload.name) {
      setValue('groupName', groupDetails?.payload?.name, { shouldTouch: true });
    }
  }, [groupDetails, setValue]);

  useEffect(() => {
    if (formData) {
      createSubClassification(formData)
        .then(() => {
          reset();
          setMessage.setMessageModel('Sub-Classification successfully created!', 'success');
          handleDialogClose(true);
        })
        .catch((error: Error) => showApplicationError(error, 'Error in creating Sub-Classification'));
    }
  }, [formData, handleDialogClose, reset, setMessage, showApplicationError]);

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={() => handleDialogClose(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          <Typography className={classes.cardHeading} variant="h5" component="div">
            Add New Sub Classification
          </Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleDialogClose(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />

        <form noValidate onSubmit={onSubmit}>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  Sub-Classification Details
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Object Classification Tag"
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={true}
                        error={!!errors.parentObjectClassificationTag}
                        helperText={errors?.parentObjectClassificationTag?.message}
                        {...register('parentObjectClassificationTag')}
                        {...field}
                      />
                    )}
                    name="parentObjectClassificationTag"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Sub-Classification"
                        variant="outlined"
                        size="small"
                        fullWidth
                        autoFocus
                        error={!!errors.objectSubClassificationName}
                        helperText={errors?.objectSubClassificationName?.message}
                        {...register('objectSubClassificationName')}
                        {...field}
                      />
                    )}
                    name="objectSubClassificationName"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Sub-Classification tag"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.objectSubClassificationTag}
                        helperText={errors?.objectSubClassificationTag?.message}
                        {...register('objectSubClassificationTag')}
                        {...field}
                      />
                    )}
                    name="objectSubClassificationTag"
                    control={control}
                  />
                </Paper>
              </Grid>
              {selectedClassificationDetails.classificationTypeDefaultGroup === true && (
                <Grid item sm={12}>
                  <Paper elevation={0} sx={{ ml: 0, pl: 2, mt: 1 }}>
                    <FormControlLabel
                      control={
                        <Controller
                          name="defaultGroup"
                          defaultValue={false}
                          control={control}
                          render={({ field: { value } }) => (
                            <Checkbox checked={!!value} onChange={handleDefaultGroupChange} />
                          )}
                        />
                      }
                      label="Global Scope"
                    />
                  </Paper>
                </Grid>
              )}
              {!isDefaultGroupSelected && (
                <Grid item sm={12}>
                  <Paper elevation={0} className={classes.paper}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          label="Select Scope"
                          placeholder="Click here to Select Scope (Org)"
                          variant="outlined"
                          fullWidth
                          size="small"
                          disabled={!selectedClassificationDetails.classificationTypeDefaultGroup}
                          error={!!errors.groupName}
                          helperText={errors?.groupName?.message}
                          {...register('groupName')}
                          {...field}
                          onClick={() => {
                            if (selectedClassificationDetails.classificationTypeDefaultGroup === true) {
                              setOrganizationTreeDialogOpen(true);
                            }
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        ></TextField>
                      )}
                      name="groupName"
                      control={control}
                    />
                  </Paper>
                </Grid>
              )}
            </Grid>
            <Paper elevation={0}>
              <Controller
                render={({ field }) => <input type="hidden" {...register('groupId')} />}
                name="groupId"
                control={control}
              />
            </Paper>
          </DialogContent>
          <Divider />
          <br />
          <DialogActions>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
        <br />
      </Dialog>

      <OrganizationTreeDialog
        organizationTreeDialogOpen={organizationTreeDialogOpen}
        setOrganizationTreeDialogOpen={setOrganizationTreeDialogOpen}
        handleSelectedOrganization={handleSelectedOrganization}
      ></OrganizationTreeDialog>
    </div>
  );
};

export default AddSubClassification;
