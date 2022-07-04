import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { forwardRef } from 'react';
import { useNotification } from './useNotification';

const Alert = forwardRef((props: AlertProps, ref: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} ref={ref} />;
});

export default function Notification() {
  const { messageModel, setMessageModel } = useNotification();

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessageModel.setMessageModel('', 'info');
  };

  const { messageModel: messageModelMsg } = messageModel;

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={!!messageModelMsg.message}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={messageModelMsg.severity as any}>
          {messageModelMsg.message ? <span>{messageModelMsg.message}</span> : null}
        </Alert>
      </Snackbar>
    </div>
  );
}
