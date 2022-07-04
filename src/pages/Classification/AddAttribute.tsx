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
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import {
  editClassificationConfig,
  getClassificationAttributes,
  getClassificationConfig,
} from '../../api/Classification';
import { createClassificationConfig } from '../../api/Classification/index';
import { getGroupDetails } from '../../api/Customers';
import { getLookupsByType } from '../../api/Lookups';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useSetNotification } from '../../components/notification/useNotification';
import { useStyles } from './Classification.styles';
import { FormAttributeDataProps } from './types';

const AddAttribute = (props: any) => {
  const classes = useStyles();

  const {
    dialogCallback,
    dialogOpen,
    selectedClassificationTypeTag,
    selectedClassificationSubtypeTag,
    selectedClassificationDetails,
    classificationConfigIdToUpdate,
  } = props;

  //Fetching group details for scope
  const { data: groupDetails } = useQuery('getGroupDetails', () =>
    getGroupDetails(selectedClassificationDetails.classificationSubtypeGroupId)
  );

  const initFormValues = useMemo(() => {
    return {
      objectClassificationTag: selectedClassificationTypeTag,
      objectSubClassificationTag: selectedClassificationSubtypeTag,
      attributeName: '',
      attributeTypeTag: '',
      attributeValue: '',
      sequence: '',
      entityCheckOperatorTag: '',
      groupId: selectedClassificationDetails.classificationSubtypeGroupId,
      groupName: selectedClassificationDetails.classificationSubtypeDefaultGroup === false ? '' : 'DEFAULT',
      defaultGroup: selectedClassificationDetails.classificationSubtypeDefaultGroup,
    };
  }, [
    selectedClassificationDetails.classificationSubtypeDefaultGroup,
    selectedClassificationDetails.classificationSubtypeGroupId,
    selectedClassificationSubtypeTag,
    selectedClassificationTypeTag,
  ]);

  const validationSchema = Yup.object().shape({
    objectClassificationTag: Yup.string().required('Object Classification Tag is required'),
    objectSubClassificationTag: Yup.string().required('Object Sub Classification Tag is required'),
    attributeName: Yup.string().required('Attribute Name is required'),
    attributeTypeTag: Yup.string().required('Attribute Type is required'),
    attributeValue: Yup.string().required('Attribute Value is required'),
    sequence: Yup.string().required('Sequence is required'),
    entityCheckOperatorTag: Yup.string().required('Entity Check Operator Tag is required'),
    groupId: Yup.string(),
    groupName: Yup.string(),
    defaultGroup: Yup.bool(),
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
    setValue,
  } = useForm(formOptions);

  const [formData, setFormData] = useState<FormAttributeDataProps | null>(null);
  const setMessage = useSetNotification();
  const { showApplicationError } = useShowApplicationError();

  //Fetching classification attribute types
  const { data: attributesData } = useQuery('getClassificationAttributes', () => getClassificationAttributes());

  //Fetching entity check operator types
  const { data: entityCheckOperatorLookupData } = useQuery('entityCheckOperatorLookupData', () =>
    getLookupsByType('ENTITY_CHECK_OPERATOR')
  );

  //Fetching classification attribute types
  const { data: classificationConfigData } = useQuery(
    'getClassificationConfig',
    () => getClassificationConfig(classificationConfigIdToUpdate),
    { enabled: classificationConfigIdToUpdate && classificationConfigIdToUpdate ? true : false }
  );

  const renderAttributeTypeMenuItems = () => {
    if (attributesData && attributesData.length > 0) {
      return attributesData.map((e: any, i: any) => (
        <MenuItem key={e.payload.tag} value={e.payload.tag}>
          {e.payload.name}
        </MenuItem>
      ));
    }
    return null;
  };

  const renderEntityCheckOperatorMenuItems = () => {
    if (entityCheckOperatorLookupData && entityCheckOperatorLookupData.length > 0) {
      return entityCheckOperatorLookupData.map((e: any, i: any) => (
        <MenuItem key={e.payload.tag} value={e.payload.tag}>
          {e.payload.name}
        </MenuItem>
      ));
    }
    return null;
  };

  const onSubmit = handleSubmit((data: FormAttributeDataProps) => {
    setFormData(data);
  });

  const handleDialogClose = useCallback(
    (refreshData: boolean) => {
      reset(initFormValues);

      setFormData(null);
      dialogCallback(false, refreshData);
    },
    [dialogCallback, initFormValues, reset]
  );

  useEffect(() => {
    if (classificationConfigIdToUpdate && classificationConfigData) {
      setValue('objectClassificationTag', classificationConfigData.payload.classificationTypeTag);
      setValue('objectSubClassificationTag', classificationConfigData.payload.classificationSubtypeTag);
      setValue('attributeName', classificationConfigData.payload.attributeName);
      setValue('attributeTypeTag', classificationConfigData.payload.classificationAttributeTag);
      setValue('attributeValue', classificationConfigData.payload.attributeValue);
      setValue('sequence', classificationConfigData.payload.sequence);
      setValue('entityCheckOperatorTag', classificationConfigData.payload.entityCheckOperatorTag);
      setValue('groupId', classificationConfigData.payload.groupId);
      setValue('defaultGroup', classificationConfigData.payload.defaultConfig);
    }
  }, [classificationConfigData, classificationConfigIdToUpdate, setValue]);

  //Assign Group Name to the Input field
  useEffect(() => {
    if (groupDetails && groupDetails.payload && groupDetails.payload.name) {
      setValue('groupName', groupDetails?.payload?.name, { shouldTouch: true });
    }
  }, [groupDetails, setValue]);

  useEffect(() => {
    if (!classificationConfigIdToUpdate && formData) {
      //Add
      createClassificationConfig(formData)
        .then(() => {
          setMessage.setMessageModel('Config-Attribute successfully created!', 'success');
          handleDialogClose(true);
        })
        .catch((error: Error) => showApplicationError(error, 'Error in creating Config-Attribute'));
    }
  }, [classificationConfigIdToUpdate, formData, handleDialogClose, setMessage, showApplicationError]);

  useEffect(() => {
    if (classificationConfigIdToUpdate && formData) {
      //Edit

      let dataToUpdate = classificationConfigData;

      dataToUpdate.payload.attributeName = formData.attributeName;
      dataToUpdate.payload.classificationAttributeTag = formData.attributeTypeTag;
      dataToUpdate.payload.attributeValue = formData.attributeValue;
      dataToUpdate.payload.sequence = formData.sequence;
      dataToUpdate.payload.entityCheckOperatorTag = formData.entityCheckOperatorTag;

      editClassificationConfig(dataToUpdate)
        .then(() => {
          setMessage.setMessageModel('Config-Attribute successfully edited!', 'success');
          handleDialogClose(true);
        })
        .catch((error: Error) => showApplicationError(error, 'Error in editing Config-Attribute'));
    }
  }, [
    classificationConfigData,
    classificationConfigIdToUpdate,
    formData,
    handleDialogClose,
    setMessage,
    showApplicationError,
  ]);

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
            {classificationConfigIdToUpdate ? 'Edit ' : 'Add New '} Attribute
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
                  Attribute Details
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Classification Type"
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={true}
                        error={!!errors.objectClassificationTag}
                        helperText={errors?.objectClassificationTag?.message}
                        {...register('objectClassificationTag')}
                        {...field}
                      />
                    )}
                    name="objectClassificationTag"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Sub-Classification Type"
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={true}
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
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Scope"
                        placeholder="Scope"
                        variant="outlined"
                        fullWidth
                        size="small"
                        disabled={true}
                        error={!!errors.groupName}
                        helperText={errors?.groupName?.message}
                        {...register('groupName')}
                        {...field}
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
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Attribute Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        autoFocus
                        error={!!errors.attributeName}
                        helperText={errors?.attributeName?.message}
                        {...register('attributeName')}
                        {...field}
                      />
                    )}
                    name="attributeName"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        select
                        label="Attribute Type"
                        placeholder="Attribute Type"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.attributeTypeTag}
                        helperText={errors?.attributeTypeTag?.message}
                        {...register('attributeTypeTag')}
                        {...field}
                      >
                        {renderAttributeTypeMenuItems()}
                      </TextField>
                    )}
                    name="attributeTypeTag"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="Attribute Value"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.attributeValue}
                        helperText={errors?.attributeValue?.message}
                        {...register('attributeValue')}
                        {...field}
                      />
                    )}
                    name="attributeValue"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        select
                        label="Sequence"
                        placeholder="Sequence"
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors.sequence}
                        helperText={errors?.sequence?.message}
                        {...register('sequence')}
                        {...field}
                      >
                        {[...Array(10)].map((e, i) => (
                          <MenuItem key={+i} value={+i}>
                            {+i}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                    name="sequence"
                    control={control}
                  />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper elevation={0} className={classes.paper}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        select
                        label="Entity Check Operator"
                        placeholder="Entity Check Operator"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.entityCheckOperatorTag}
                        helperText={errors?.entityCheckOperatorTag?.message}
                        {...register('entityCheckOperatorTag')}
                        {...field}
                      >
                        {renderEntityCheckOperatorMenuItems()}
                      </TextField>
                    )}
                    name="entityCheckOperatorTag"
                    control={control}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Paper elevation={0}>
              <Controller
                render={({ field }) => <input type="hidden" {...register('defaultGroup')} />}
                name="defaultGroup"
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
    </div>
  );
};

export default AddAttribute;
