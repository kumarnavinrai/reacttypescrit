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
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { createOrganization } from '../../api/Organizations';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useStyles } from './Organizations.styles';
import { ICreateOrganizationDialogProps, IOrganizationsFormData } from './types';

const initFormValues = {
  name: '',
  emailAddress: '',
  internalGroup: false,
  groupTypeTag: 'ORGANIZATION',
  parentGroupId: null,
};

const CreateOrganizationDialog = (props: ICreateOrganizationDialogProps) => {
  const {
    parentGroupId,
    parentGroupName,
    resetNodeInfo,
    showNotification,
    hasChangedCallback,
    dialogCallback,
    dialogOpen,
  } = props;

  const { showApplicationError } = useShowApplicationError();

  const classes = useStyles();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    emailAddress: Yup.string().email('Please enter a valid Email Address').required('Email Address is required'),
    internalGroup: Yup.bool(),
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

  const [formData, setFormData] = useState<IOrganizationsFormData | null>(null);

  const onSubmit = handleSubmit((data: IOrganizationsFormData) => {
    if (typeof parentGroupId != 'undefined' && parentGroupId) {
      setFormData({
        ...initFormValues,
        ...data,
        parentGroupId: parentGroupId,
      });
    } else {
      setFormData({ ...initFormValues, ...data, parentGroupId: null });
    }
  });

  const handleDialogClose = () => {
    dialogCallback(false);
    resetNodeInfo();
  };

  useEffect(() => {
    if (!formData) {
      return;
    }

    handleDialogClose();

    if (formData?.name) {
      createOrganization(formData)
        .then((data) => {
          hasChangedCallback();
          reset();
          showNotification('Successfully Created!', 'success');
        })
        .catch((error) => showApplicationError(error, 'Error in creating Organization'));

      resetNodeInfo();
    }
  }, [formData]);

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth>
        <DialogTitle id="form-dialog-title">
          <Typography className={classes.cardHeading} variant="h5" component="div">
            Create Organization{' '}
            {typeof parentGroupName != 'undefined' && parentGroupName ? `- ${parentGroupName}` : null}
          </Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <form noValidate onSubmit={onSubmit}>
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
                        InputLabelProps={{}}
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
                        label="Description"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.description}
                        helperText={errors?.description?.message}
                        InputLabelProps={{}}
                        {...register('description')}
                        {...field}
                      />
                    )}
                    name="description"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Email Address"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.emailAddress}
                        helperText={errors?.emailAddress?.message}
                        InputLabelProps={{}}
                        {...register('emailAddress')}
                        {...field}
                      />
                    )}
                    name="emailAddress"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <FormControlLabel
                    control={
                      <Controller
                        name="internalGroup"
                        defaultValue={false}
                        control={control}
                        render={({ field }) => <Checkbox checked={!!field.value} {...field} />}
                      />
                    }
                    label="Internal Group"
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

export default CreateOrganizationDialog;
