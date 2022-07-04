import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardLayout: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      minHeight: 180,
    },
    cardTitle: { fontSize: 18, textAlign: 'center' },
    cardMiddleContent: { fontSize: 30 },
    cardBottomContent: { fontSize: 16 },
  })
);
