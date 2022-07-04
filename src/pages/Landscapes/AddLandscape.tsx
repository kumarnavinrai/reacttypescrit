import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { createLandscape } from '../../api/Landscapes';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useSetNotification } from '../../components/notification/useNotification';
import { useStyles } from '../Landscapes/Landscapes.styles';

const AddLandscape = (props: any) => {
  const classes = useStyles();
  const { groupId, hasChangedCallback } = props;
  const [landscapeName, setLandscapeName] = useState('');
  const [requestBody, setRequestBody] = useState<any>(null);
  const setMessage = useSetNotification();
  const { showApplicationError } = useShowApplicationError();

  const buildRequestBodyToCreateLandscape = (e: any) => {
    e.preventDefault();

    setRequestBody({
      name: landscapeName,
      environmentIds: [],
      groupId: groupId,
    });
  };

  useEffect(() => {
    if (!requestBody || !requestBody.name) {
      return;
    }

    createLandscape(requestBody)
      .then((data) => {
        setMessage.setMessageModel('Successfully Created!', 'success');
        hasChangedCallback();
        setLandscapeName('');
        setRequestBody(null);
      })
      .catch((error) => showApplicationError(error, 'Error in creating Landscape'));
  }, [requestBody]);

  return (
    <div>
      <form id="add-landscape" noValidate onSubmit={(e) => buildRequestBodyToCreateLandscape(e)}>
        <TextField
          label="Enter Landscape Name"
          variant="outlined"
          size="small"
          value={landscapeName}
          placeholder="Enter Landscape name"
          className={classes.button}
          onChange={(e) => setLandscapeName(e.target.value)}
        />

        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          type="submit"
          disabled={landscapeName.trim() ? false : true}
        >
          + Add Landscape
        </Button>
      </form>
    </div>
  );
};

export default AddLandscape;
