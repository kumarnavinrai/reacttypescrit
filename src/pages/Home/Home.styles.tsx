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
  })
);
