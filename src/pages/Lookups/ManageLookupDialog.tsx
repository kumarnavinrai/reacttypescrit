import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { createLookup, getLookupByID, updateLookupByID } from '../../api/Lookups';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useSetNotification } from '../../components/notification/useNotification';
import { useStyles } from './Lookups.styles';
import { FromDataProps, ManageLookupDialogProps } from './types';

const initFormValues = {
  name: '',
  tag: '',
  type: '',
};

const ManageLookupDialog = (props: ManageLookupDialogProps) => {
  const classes = useStyles();
  const { hasChangedCallback, dialogCallback, updateProps, dialogOpen } = props;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    type: Yup.string().required('Type is required'),
    tag: Yup.string().required('Tag is required'),
  });
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
  } = useForm(formOptions);

  const [formData, setFormData] = useState<FromDataProps | null>(null);
  const [updateLookupData, setUpdateLookupData] = useState<FromDataProps | null>(null);
  const [isUpdatedState, setIsUpdatedState] = useState(0);
  const setMessage = useSetNotification();
  const { showApplicationError } = useShowApplicationError();

  const onSubmit = handleSubmit((data: FromDataProps) => setFormData(data));
  const onUpdateSubmit = handleSubmit((data: FromDataProps) => updateLookup(props, data));
  const handleDialogClose = () => {
    dialogCallback(false);
  };

  useEffect(() => {
    if (!formData || updateProps?.update) {
      return;
    }

    handleDialogClose();
    createLookup(formData)
      .then((data) => {
        hasChangedCallback();
        reset();
        setMessage.setMessageModel('Successfully Created!', 'success');
      })
      .catch((error) => showApplicationError(error, 'Error in creating Lookup'));
  }, [formData]);

  useEffect(() => {
    if (updateProps?.update && updateProps?.updateLookupId) {
      reset(initFormValues);

      getLookupByID(updateProps?.updateLookupId)
        .then((data) => {
          reset(data.payload);
          setUpdateLookupData(data);
        })
        .catch((error) => showApplicationError(error, 'Error in getting Lookup'));
    }
  }, [updateProps?.update, updateProps?.updateLookupId, reset, isUpdatedState]);

  const updateLookup = async (props: any, data: FromDataProps) => {
    if (updateProps && updateProps.updateLookupId) {
      const feedbackData = { ...updateLookupData, payload: data };
      updateLookupByID(updateProps?.updateLookupId || '', feedbackData)
        .then(() => {
          hasChangedCallback();
          reset();
          setMessage.setMessageModel('Successfully Updated!', 'success');
          setIsUpdatedState(isUpdatedState + 1);
        })
        .catch((error) => showApplicationError(error, 'Error in updating Lookup'));
    }
    handleDialogClose();
  };

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth>
        <DialogTitle id="form-dialog-title">
          <Typography className={classes.cardHeading} variant="h5" component="div">
            {updateProps?.update ? 'Update' : 'Create'} Lookup
          </Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <form noValidate onSubmit={updateProps?.update ? onUpdateSubmit : onSubmit}>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        autoFocus
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                        InputLabelProps={props.updateProps?.update ? { shrink: true } : {}}
                        {...register('name')}
                        {...field}
                      />
                    )}
                    name="name"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Type"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.type}
                        helperText={errors?.type?.message}
                        InputLabelProps={props.updateProps?.update ? { shrink: true } : {}}
                        disabled={props.updateProps?.update}
                        {...register('type')}
                        {...field}
                      />
                    )}
                    name="type"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Tag"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.tag}
                        helperText={errors?.tag?.message}
                        InputLabelProps={props.updateProps?.update ? { shrink: true } : {}}
                        disabled={props.updateProps?.update}
                        {...register('tag')}
                        {...field}
                      />
                    )}
                    name="tag"
                    control={control}
                  />
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          <br />
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
    </div>
  );
};

export default ManageLookupDialog;
