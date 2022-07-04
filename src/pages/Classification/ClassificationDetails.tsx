import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useStyles } from './Classification.styles';

const ClassificationDetails = (props: any) => {
  const classes = useStyles();

  const { selectedClassificationDetails } = props;

  return (
    <Grid item xs={12}>
      <Card variant="outlined">
        <CardContent>
          <Typography className={classes.typesHeading} variant="h5" component="div" gutterBottom>
            Object Classification Details
          </Typography>
          <br />
          <Grid container item xs={7} rowSpacing={4}>
            <Grid container item xs={12}>
              <Grid item xs={6}>
                <div className={classes.bold}>Object Classification Type</div>
                <div>{selectedClassificationDetails.classificationType}</div>
              </Grid>
              {selectedClassificationDetails.classificationSubtype && (
                <Grid item xs={6}>
                  <div className={classes.bold}>Object Classification Subtype</div>
                  <div>{selectedClassificationDetails.classificationSubtype}</div>
                </Grid>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ClassificationDetails;
