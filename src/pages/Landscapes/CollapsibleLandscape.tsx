import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteLandscape, updateLandscapeById } from '../../api/Landscapes';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useSetNotification } from '../../components/notification/useNotification';
import CollapsibleEnvironmentsTable from '../Environments/CollapsibleEnvironmentsTable';
import { EnvironmentsDataType } from '../Environments/types';
import EnvironmentDropdownCheckbox from './EnvironmentDropdownCheckbox';
import { useStyles } from './Landscapes.styles';
import { ICollapsibleLandscapeProps, ILandscapeProps } from './types';

const Landscape = (props: ILandscapeProps) => {
  const classes = useStyles();
  const setMessage = useSetNotification();
  const {
    groupId,
    landscape,
    environmentsData,
    rerenderEnvironmentsFlag,
    setRerenderEnvironmentsFlag,
    hasChangedCallback,
  } = props;
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const [environmentList, setEnvironmentList] = useState<string[]>(landscape.payload.environmentIds);
  const [environmentListHasChangedFlag, setEnvironmentListHasChangedFlag] = useState(0);
  const [environmentsDataUnderLandscape, setEnvironmentsDataUnderLandscape] = useState<EnvironmentsDataType[]>([]);
  const [currentLandscapeData, setCurrentLandscapeData] = useState(landscape);
  const { showApplicationError } = useShowApplicationError();

  const handleEnvironmentListChange = (selectedEnvironmentsList: string[]) => {
    setEnvironmentList(selectedEnvironmentsList);
  };

  useEffect(() => {
    if (Array.isArray(environmentsData) && environmentsData.length > 0) {
      // Filter data to be rendered in CollapsibleEnvironmentsTable passed as a prop
      const result = environmentsData.filter((env: any) => environmentList.includes(env.id));
      setEnvironmentsDataUnderLandscape(result);
    }

    // Update landscape upon environmentList change
    if (environmentListHasChangedFlag) {
      const payload = { ...currentLandscapeData.payload, environmentIds: environmentList };
      const feedbackData = { ...currentLandscapeData, payload: payload };

      updateLandscapeById(currentLandscapeData.id, feedbackData)
        .then((data) => {
          setCurrentLandscapeData(data);
        })
        .catch((error) => showApplicationError(error, 'Error in updating Landscape'));
    }
  }, [environmentList, environmentListHasChangedFlag, environmentsData]);

  const handleLandscapeExpandToggle = () => {
    setExpanded(!expanded);
  };

  const handleDeleteLandscape = (e: any) => {
    e.stopPropagation();
    deleteLandscape(currentLandscapeData.id)
      .then((data) => {
        setMessage.setMessageModel('Landscape deleted successfully', 'success');
        hasChangedCallback();
      })
      .catch((error) => showApplicationError(error, 'Error in deleting Landscape'));
  };

  return (
    <Accordion expanded={expanded} onChange={handleLandscapeExpandToggle}>
      <AccordionSummary
        className={classes.accordionSummary}
        classes={{ content: classes.content }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={landscape.payload.name}
        id={landscape.id}
      >
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
              <Typography className={classes.accordionHeading} variant="h4">
                {landscape.payload.name}
              </Typography>
              <Tooltip title={`Analysis Overview for ${landscape.payload.name}`}>
                <IconButton
                  component={Link}
                  to={{
                    pathname: `/analysisoverview/${groupId}`,
                    state: { landscapeId: landscape.id },
                  }}
                >
                  <AssessmentOutlinedIcon color="primary" />
                  <Typography variant="body1" color="primary">
                    Analysis
                  </Typography>
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
          <Grid>
            <IconButton size="small" onClick={handleDeleteLandscape}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <EnvironmentDropdownCheckbox
          environmentsData={environmentsData}
          environmentList={environmentList}
          setEnvironmentList={handleEnvironmentListChange}
          hasChangedCallback={() => setEnvironmentListHasChangedFlag(environmentListHasChangedFlag + 1)}
        />
        <br />
        <CollapsibleEnvironmentsTable
          groupId={groupId}
          environmentsDataUnderLandscape={environmentsDataUnderLandscape}
          rerenderEnvironmentsFlag={rerenderEnvironmentsFlag}
          setRerenderEnvironmentsFlag={setRerenderEnvironmentsFlag}
        />
      </AccordionDetails>
    </Accordion>
  );
};

const CollapsibleLandscape = (props: ICollapsibleLandscapeProps) => {
  const {
    groupId,
    landscapesData,
    environmentsData,
    rerenderEnvironmentsFlag,
    setRerenderEnvironmentsFlag,
    hasChangedCallback,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {landscapesData.map((landscape: any) => (
        <Landscape
          key={landscape.id}
          groupId={groupId}
          landscape={landscape}
          environmentsData={environmentsData}
          rerenderEnvironmentsFlag={rerenderEnvironmentsFlag}
          setRerenderEnvironmentsFlag={setRerenderEnvironmentsFlag}
          hasChangedCallback={hasChangedCallback}
        />
      ))}
    </div>
  );
};

export default CollapsibleLandscape;
