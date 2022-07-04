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
    root: {
      width: '100%',
    },
    accordionHeading: {
      fontSize: theme.typography.pxToRem(15),
      flexGrow: 1,
    },
    accordionSummary: {
      flexDirection: 'row-reverse',
    },
    accordionDetails: {
      flexDirection: 'column',
    },
    content: {
      alignItems: 'center',
    },
  })
);
