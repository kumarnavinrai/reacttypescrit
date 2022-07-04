import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeading: {
      color: '#043D72',
      flexGrow: 1,
    },
    heading: {
      display: 'flex',
    },
    button: {
      margin: '0 4px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      minWidth: 120,
      width: '100%',
      fontSize: theme.typography.fontSize,
    },
    map: {
      textAlign: 'left',
      color: theme.palette.text.secondary,
      width: '100%',
    },
    customerDetails: {
      width: '100%',
    },
    formControl: {
      padding: theme.spacing(2),
      minWidth: 120,
      textAlign: 'left',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);
