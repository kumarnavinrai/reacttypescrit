import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typesHeading: {
      color: '#0B4479',
    },
    typesSubHeading: {
      color: '#0B4479',
      fontSize: 14,
      marginBottom: 10,
    },
    bold: {
      fontWeight: 'bold',
    },
    subClassification: {
      color: '#0B4479',
    },
    expandedPanel: {
      backgroundColor: '#DEECF4',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      minWidth: 120,
      width: '100%',
    },
    cardHeading: {
      color: '#043D72',
      flexGrow: 1,
    },
    heading: {
      display: 'flex',
    },
  })
);
