import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      display: 'flex',
    },
    menuItemRoot: {
      '&$menuItemSelected, &$menuItemSelected:focus, &$menuItemSelected:hover': {
        backgroundColor: '#E6F1F9',
      },
      color: '#4782da',
    },
    menuItemSelected: {},
    breadCrumbLink: {
      color: '#4782da',
      fontWeight: 400,
    },
  })
);
