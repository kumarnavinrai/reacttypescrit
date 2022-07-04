import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MuiTypography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import * as Yup from 'yup';
import { createTechDepedencyJob } from '../../api/Reports';
import { useSetNotification } from '../../components/notification/useNotification';
import { useStyles } from '../Customers/Customer.styles';
import { ITechDependencyFormProps } from './types';

const Typography = styled(MuiTypography)(spacing);

const initTechDependencyFormValues = {
  reportName: '',
  landscapeId: '',
  groupId: '',
  sourceCodeDepth: 8,
  dataDictDepth: 6,
  otherDepth: 4,
  fileObjectType: 'none',
  criteriaInputFile: '',
};

export type TechDependencyFormDataProps = typeof initTechDependencyFormValues;

const TechDependencyForm = (props: ITechDependencyFormProps) => {
  const classes = useStyles();

  const [fileObjectType, setFileObjectType] = React.useState('none');
  const [criteriaFileSelected, setCriteriaFileSelected] = useState<File | null>(null);

  const { groupId } = useParams<{ groupId: string }>();

  const setMessage = useSetNotification();
  const { fetchDataFlag, setFetchDataFlag } = props;

  const validationSchema = Yup.object().shape({
    reportName: Yup.string().required('Job name is required'),
    criteriaInputFile: Yup.string().when('fileObjectType', {
      is: 'none',
      then: Yup.string(),
      otherwise: Yup.string().required('Criteria file is required.'),
    }),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: initTechDependencyFormValues,
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm(formOptions);

  const setFileReference = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const allowedFileTypes = ['application/vnd.ms-excel', 'text/plain', 'text/csv', 'text/tsv'];
      if (allowedFileTypes.indexOf(event.target.files[0].type) === -1) {
        setMessage.setMessageModel('Please choose valid csv file.', 'error');
        event.currentTarget.value = '';
      }
      setCriteriaFileSelected(event.target.files[0]);
    }
  };

  const selectFileObjectType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileObjectType((event.target as HTMLInputElement).value);
    if ((event.target as HTMLInputElement).value === 'none') {
      clearErrors('criteriaInputFile');
    }
  };

  const onSubmit = handleSubmit((data: TechDependencyFormDataProps) => {
    data.groupId = groupId;
    data.landscapeId = props.landscapeId;
    if (data.groupId && data.landscapeId) {
      createTechDepedencyJob(data, criteriaFileSelected)
        .then(() => {
          setMessage.setMessageModel('Report created successfully', 'success');
          fetchDataFlag ? setFetchDataFlag(0) : setFetchDataFlag(1);
          reset(initTechDependencyFormValues);
          setFileObjectType('none');
        })
        .catch(() => {
          setMessage.setMessageModel('Failed to create Tech Dependency job ', 'error');
        });
    } else {
      setMessage.setMessageModel('Unknown error occurred ', 'error');
    }
  });

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <form id="customer-details" noValidate onSubmit={onSubmit}>
            <Card>
              <CardContent className={classes.heading}>
                <Typography className={classes.cardHeading} variant="h3">
                  New Report
                </Typography>

                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  form="customer-details"
                  type="submit"
                >
                  Run Report
                </Button>
              </CardContent>

              <Grid item xs={12}>
                <Box style={{ padding: 16 }}>
                  <Typography style={{ fontSize: 16 }}>
                    Report Criteria{' '}
                    <span style={{ color: 'gray', fontStyle: 'italic' }}>
                      (Choose either Package or Main Object, both are not required)
                    </span>
                  </Typography>
                  <br />
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={4}>
                      <Typography className={classes.cardHeading}>Name</Typography>
                      <Paper elevation={0} className={classes.paper}>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              label=""
                              variant="outlined"
                              size="small"
                              placeholder="Enter report name"
                              autoFocus
                              error={!!errors.reportName}
                              helperText={errors?.reportName?.message}
                              {...register('reportName')}
                              {...field}
                              style={{ width: 350 }}
                            />
                          )}
                          name="reportName"
                          control={control}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.cardHeading}>Choose file type</Typography>
                      <Paper elevation={0} className={classes.paper}>
                        <Controller
                          render={({ field }) => (
                            <RadioGroup
                              value={fileObjectType}
                              onChange={(e) => {
                                field.onChange(e);
                                selectFileObjectType(e);
                              }}
                              style={{ alignContent: 'center' }}
                            >
                              <Box display="flex" flexDirection="row" justifyContent="flex-start">
                                <FormControlLabel value="Package" control={<Radio />} label="Package" />
                                <FormControlLabel value="MainObject" control={<Radio />} label="MainObject" />
                                <FormControlLabel value="none" control={<Radio />} label="None" />
                              </Box>
                            </RadioGroup>
                          )}
                          control={control}
                          name="fileObjectType"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.cardHeading}>Main Object</Typography>
                      <Paper elevation={0} className={classes.paper}>
                        <Controller
                          rules={{ required: fileObjectType ? true : false }}
                          render={({ field }) => (
                            <Input
                              id="main-object-file"
                              type="file"
                              placeholder="Select file for upload"
                              error={!!errors.criteriaInputFile}
                              {...register('criteriaInputFile')}
                              {...field}
                              inputProps={{
                                onChange: setFileReference,
                                disabled: fileObjectType ? fileObjectType === 'none' : false,
                              }}
                            />
                          )}
                          name="criteriaInputFile"
                          control={control}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
                <Box style={{ padding: 16 }}>
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={4}>
                      <Typography className={classes.cardHeading}>Source Code Depth</Typography>

                      <Paper elevation={0} className={classes.paper}>
                        <Controller
                          render={({ field }) => (
                            <Select style={{ width: 350 }} {...register('sourceCodeDepth')} {...field}>
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                              <MenuItem value={6}>6</MenuItem>
                              <MenuItem value={7}>7</MenuItem>
                              <MenuItem value={8} selected>
                                8
                              </MenuItem>
                            </Select>
                          )}
                          name="sourceCodeDepth"
                          control={control}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.cardHeading}>Data Dict Depth</Typography>
                      <Paper elevation={0} className={classes.paper}>
                        <Controller
                          render={({ field }) => (
                            <Select style={{ width: 350 }} {...register('dataDictDepth')} {...field}>
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                              <MenuItem value={6} selected>
                                6
                              </MenuItem>
                              <MenuItem value={7}>7</MenuItem>
                              <MenuItem value={8}>8</MenuItem>
                            </Select>
                          )}
                          name="dataDictDepth"
                          control={control}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.cardHeading}>Other Depth</Typography>
                      <Paper elevation={0} className={classes.paper}>
                        <Controller
                          render={({ field }) => (
                            <Select style={{ width: 350 }} {...register('otherDepth')} {...field}>
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4} selected>
                                4
                              </MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                              <MenuItem value={6}>6</MenuItem>
                              <MenuItem value={7}>7</MenuItem>
                              <MenuItem value={8}>8</MenuItem>
                            </Select>
                          )}
                          name="otherDepth"
                          control={control}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                  <br></br>
                </Box>
              </Grid>
            </Card>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default TechDependencyForm;
