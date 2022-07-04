import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MuiDivider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import CustomerTable from './CustomerTable';
import { useStyles } from './Home.styles';

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Home
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent className={classes.heading}>
              <Typography className={classes.cardHeading} variant="h5">
                Customers
              </Typography>
              <Button component={Link} to="/customer/add" variant="contained" color="primary">
                + Add Customer
              </Button>
            </CardContent>
            <CardContent>
              <CustomerTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
