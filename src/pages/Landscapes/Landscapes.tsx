import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getEnvironmentsByGroupId } from '../../api/Environments';
import { getLandscapesByGroupId } from '../../api/Landscapes';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useStyles } from '../Landscapes/Landscapes.styles';
import AddLandscape from './AddLandscape';
import CollapsibleLandscape from './CollapsibleLandscape';
import { ILandscapesProps } from './types';

const Landscapes = (props: ILandscapesProps) => {
  const classes = useStyles();
  const { groupId, rerenderEnvironmentsFlag, setRerenderEnvironmentsFlag } = props;
  const [rerenderLandscapesFlag, setRerenderLandscapesFlag] = useState(0);
  const [landscapesData, setLandscapesData] = useState([]);
  const [environmentsData, setEnvironmentsData] = useState([]);
  const { showApplicationError } = useShowApplicationError();

  useEffect(() => {
    if (!groupId) {
      return;
    }

    getLandscapesByGroupId(groupId)
      .then((data) => {
        setLandscapesData(data.data);
      })
      .catch((error) => showApplicationError(error, 'Failed to search Landscapes by Group'));

    getEnvironmentsByGroupId(groupId)
      .then((data) => {
        setEnvironmentsData(data.data);
      })
      .catch((error) => showApplicationError(error, 'Failed to search Environments by Group'));
  }, [rerenderLandscapesFlag, rerenderEnvironmentsFlag, groupId]);

  return (
    <>
      <Card>
        <CardContent className={classes.heading}>
          <Typography className={classes.cardHeading} variant="h5">
            Landscapes
          </Typography>

          <AddLandscape
            groupId={groupId}
            hasChangedCallback={() => setRerenderLandscapesFlag(rerenderLandscapesFlag + 1)}
          />
        </CardContent>
        <CardContent>
          <Paper variant="outlined">
            {landscapesData.length > 0 ? (
              <CollapsibleLandscape
                groupId={groupId}
                landscapesData={landscapesData}
                environmentsData={environmentsData}
                rerenderEnvironmentsFlag={rerenderEnvironmentsFlag}
                setRerenderEnvironmentsFlag={setRerenderEnvironmentsFlag}
                hasChangedCallback={() => setRerenderLandscapesFlag(rerenderLandscapesFlag + 1)}
              />
            ) : (
              <div>No Landscapes</div>
            )}
          </Paper>
        </CardContent>
      </Card>
    </>
  );
};

export default Landscapes;
