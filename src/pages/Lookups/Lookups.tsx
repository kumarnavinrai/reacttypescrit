import { spacing } from '@mui/system';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MuiDivider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import AllLookupsTable from './AllLookupsTable';
import { useStyles } from './Lookups.styles';
import ManageLookupDialog from './ManageLookupDialog';

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const Lookups = () => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [lookupsTableState, setLookupsTableState] = useState(0);

  const showDialogBox = () => {
    setDialogOpen(true);
  };

  const hideDialogBox = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Admin Lookups
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent className={classes.heading}>
              <Typography className={classes.cardHeading} variant="h5">
                All Lookups
              </Typography>
              <Button variant="contained" color="primary" onClick={showDialogBox}>
                + Create New Lookup
              </Button>
            </CardContent>
            <CardContent>
              <AllLookupsTable lookupsTableStateProp={lookupsTableState} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ManageLookupDialog
        dialogOpen={dialogOpen}
        dialogCallback={hideDialogBox}
        hasChangedCallback={() => setLookupsTableState(lookupsTableState + 1)}
      />
    </>
  );
};

export default Lookups;
