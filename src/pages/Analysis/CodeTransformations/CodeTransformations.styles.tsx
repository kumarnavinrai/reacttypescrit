import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardLayout: {
      textAlign: 'center',
      verticalAlign: 'middle',
    },
    cardTitle: { fontSize: 18, lineHeight: 1 },
    summaryNumbers: { textAlign: 'right', paddingRight: 10 },
    summaryHeading: {
      color: '#767676',
      fontSize: 12,
      fontWeight: 'bold',
      paddingBottom: 10,
      textAlign: 'right',
      paddingRight: 10,
    },
  })
);
