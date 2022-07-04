import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios, { CancelTokenSource } from 'axios';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { uploadExtractFileMultipart } from '../../api/Extracts';
import { getLookupsByType } from '../../api/Lookups';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useSetNotification } from '../../components/notification/useNotification';
import { useStyles } from './Extracts.styles';
import FileUploader from './FileUploader';
import SelectEnvironment from './SelectEnvironment';

const UploadExtractsDialog = (props: any) => {
  const classes = useStyles();
  const { groupId, setExtractsDialogOpen, showEnvDialogBox, setRerenderEnvironmentsFlag, setDefaultSID } = props;

  const [extractValidationResponse, setExtractValidationResponse] = useState<{ extractInfo: any; valid: boolean }>({
    extractInfo: {},
    valid: false,
  });
  const [performUpload, setPerformUpload] = useState(false);
  const [progress, setProgress] = useState(0);

  const [reValidateFlag, setReValidateFlag] = useState(false);
  const [uploadFileSelected, setUploadFileSelected] = useState<File | null>(null);
  const [extractDescriptionList, setExtractDescriptionList] = useState<{ value: string; label: string }[]>([]);
  const setMessage = useSetNotification();
  const { showApplicationError } = useShowApplicationError();
  const cancelTokenSource = useRef<CancelTokenSource>();

  // Holds the selected environments for UsageExtracts
  const [selectedEnvironmentsForUsageExtract, setSelectedEnvironmentsForUsageExtract] = useState<string[]>([]);

  const validationSchema = Yup.object().shape({
    extractDescription: Yup.string().required('Description tag is required'),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: initialExtractFormValues,
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm(formOptions);

  const resetForm = useCallback(() => {
    reset(initialExtractFormValues);
  }, [reset]);

  const canUpload = useCallback(() => {
    if (extractValidationResponse.valid && performUpload && uploadFileSelected) return true;
    return false;
  }, [extractValidationResponse.valid, performUpload, uploadFileSelected]);

  const onCancel = useCallback(() => {
    if (cancelTokenSource.current) cancelTokenSource.current.cancel('Extract file upload aborted by user.');
    setExtractsDialogOpen(false);
  }, [setExtractsDialogOpen]);

  const isUsageExtract = () => {
    return (
      !_.isEmpty(extractValidationResponse.extractInfo) &&
      extractValidationResponse.extractInfo.sapSystemInfo.extractTypeTag === 'USAGE'
    );
  };
  
  const uploadFile = useCallback(async (): Promise<any> => {
    if (uploadFileSelected) {
      cancelTokenSource.current = axios.CancelToken.source();
      
      uploadExtractFileMultipart(
        groupId,
        uploadFileSelected,
        getValues('extractDescription'),
        selectedEnvironmentsForUsageExtract,
        setProgress,
        cancelTokenSource.current.token
      )
        .then((data) => {
          setMessage.setMessageModel('Successfully uploaded!', 'success');

          setExtractsDialogOpen(false);

          //Refresh enviorment list after few seconds. There is a delay in job scheduling.
          setTimeout(function () {
            setRerenderEnvironmentsFlag();
          }, 8000);
        })
        .catch((error) => {
          showApplicationError(error, 'Error in uploading extracts file');
        });
    }
  }, [getValues, groupId, setExtractsDialogOpen, setMessage, showApplicationError, uploadFileSelected, selectedEnvironmentsForUsageExtract]);

  // Populate dropdowns inside the dialog box
  useEffect(() => {
    getLookupsByType('EXTRACT_DESCRIPTION')
      .then((data) => {
        let listData = data.map((item: any) => ({ value: item.payload?.tag, label: item.payload?.name }));
        setExtractDescriptionList(listData);
      })
      .catch((error) => showApplicationError(error, `Failed to get extract description lookup`));
  }, [showApplicationError]);

  // Populate form details and update SID with response from validation API
  useEffect(() => {
    if (_.isEmpty(extractValidationResponse.extractInfo)) return;

    reset({
      systemId: extractValidationResponse.extractInfo.sapSystemInfo.systemId,
      extractType: extractValidationResponse.extractInfo.extractType,
      ...extractValidationResponse.extractInfo.envInfo,
    });

    if (!_.isEmpty(extractValidationResponse.extractInfo) && !extractValidationResponse.valid) {
      setDefaultSID(extractValidationResponse.extractInfo.sapSystemInfo.systemId);
    }
  }, [
    extractValidationResponse.extractInfo,
    extractValidationResponse.extractInfo.envInfo,
    extractValidationResponse.extractInfo.extractType,
    extractValidationResponse.valid,
    reset,
    setDefaultSID,
  ]);

  useEffect(() => {
    if (canUpload()) {
      uploadFile();

      return () => {
        reset(initialExtractFormValues);
        setPerformUpload(false);
        cancelTokenSource.current = undefined;
      };
    }
  }, [
    canUpload,
    groupId,
    setMessage,
    setExtractsDialogOpen,
    setPerformUpload,
    showApplicationError,
    uploadFile,
    reset,
  ]);

  

  const LinearProgressWithLabel = (props: any) => {
    if (props.value === 100)
      return (
        <Box display="flex" alignItems="flex-start">
          <Box mr={1}>
            <CircularProgress color="success" size={20} />
          </Box>
          <Box sx={{ ml: 4 }}>
            <Typography variant="body1">File has been uploaded. Please wait while we process your request.</Typography>
          </Box>
        </Box>
      );

    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box>
          <Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Dialog open={props.dialogOpen} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogTitle id="form-dialog-title">
          <Typography className={classes.cardHeading} variant="h5" component="div">
            Upload Extraction File
          </Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="body2" component="div">
            Choose a file to upload for extraction and smartShift will automatically select the Extraction Type and the
            Environment Details
          </Typography>
          <FileUploader
            groupId={groupId}
            setExtractValidationResponse={setExtractValidationResponse}
            reValidateFlag={reValidateFlag}
            uploadFileSelected={uploadFileSelected}
            setUploadFileSelected={setUploadFileSelected}
            resetForm={resetForm}
          />
          {canUpload() && (
            <>
              <LinearProgressWithLabel value={progress} />
              <br />
            </>
          )}
          <form id="extract-info" noValidate onSubmit={handleSubmit(() => setPerformUpload(true))}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      id="extractType"
                      label="Extract Type"
                      variant="outlined"
                      fullWidth
                      size="small"
                      {...register('extractType')}
                      {...field}
                    />
                  )}
                  name="extractType"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      id="systemId"
                      label="System ID (SID)"
                      variant="outlined"
                      fullWidth
                      size="small"
                      {...register('systemId')}
                      {...field}
                    />
                  )}
                  name="systemId"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      id="environmentType"
                      label="Environment Type"
                      variant="outlined"
                      fullWidth
                      size="small"
                      {...register('environmentType')}
                      {...field}
                    />
                  )}
                  name="environmentType"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      id="application"
                      label="Application"
                      variant="outlined"
                      fullWidth
                      size="small"
                      {...register('application')}
                      {...field}
                    />
                  )}
                  name="application"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      id="applicationVersion"
                      label="Application Version"
                      variant="outlined"
                      fullWidth
                      size="small"
                      {...register('applicationVersion')}
                      {...field}
                    />
                  )}
                  name="applicationVersion"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      select
                      label="Select Description"
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors.extractDescription}
                      helperText={errors?.extractDescription?.message}
                      {...register('extractDescription')}
                      {...field}
                    >
                      {extractDescriptionList && extractDescriptionList.length > 0 ? (
                        extractDescriptionList.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                      )}
                    </TextField>
                  )}
                  name="extractDescription"
                  control={control}
                />
              </Grid>
              <br />
              <br />
              <br />
              {isUsageExtract() ? (
                <Grid item xs={12}>
                  <SelectEnvironment
                    groupId={groupId}
                    selectedEnvironmentsForUsageExtract={selectedEnvironmentsForUsageExtract}
                    setSelectedEnvironmentsForUsageExtract={setSelectedEnvironmentsForUsageExtract}
                  />
                </Grid>
              ) : null}
            </Grid>
          </form>
          <br />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={showEnvDialogBox}
            disabled={_.isEmpty(extractValidationResponse.extractInfo) || extractValidationResponse.valid}
          >
            + Add Environment
          </Button>
          <div className={classes.filler}></div>
          {!(_.isEmpty(extractValidationResponse.extractInfo) || extractValidationResponse.valid) ? (
            <Button variant="contained" color="primary" onClick={() => setReValidateFlag(!reValidateFlag)}>
              Re-Validate
            </Button>
          ) : null}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            form="extract-info"
            disabled={
              !extractValidationResponse.valid ||
              (isUsageExtract() && selectedEnvironmentsForUsageExtract.length === 0) ||
              canUpload()
            }
          >
            Upload
          </Button>
          <Button onClick={onCancel} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const initialExtractFormValues = {
  extractType: '',
  extractDescription: '',
  environmentType: '',
  systemId: '',
  application: '',
  applicationVersion: '',
};

export default UploadExtractsDialog;
