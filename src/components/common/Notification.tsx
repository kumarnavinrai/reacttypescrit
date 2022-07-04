import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

const Alert = React.forwardRef((props: AlertProps, ref: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} ref={ref} />;
});

const Notification = (props: any) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    props.hideNotification();
  };

  return (
    <div>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;
