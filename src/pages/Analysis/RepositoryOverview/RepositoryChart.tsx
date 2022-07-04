import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
import RepositoryBar from './Bar';
import RepositoryTreemap from './Treemap';

const RepositoryChart = (props: any) => {
  const { repositoryOverviewData } = props;
  const [value, setValue] = React.useState('treemap');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <Grid item xs={12}>
      <Card variant="outlined">
        <CardContent>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="chart-type" name="chart-type" value={value} onChange={handleChange}>
              <FormControlLabel value="treemap" control={<Radio />} label="Treemap" />
              <FormControlLabel value="bar" control={<Radio />} label="Bar Chart" />
            </RadioGroup>
          </FormControl>
          <br />
          <br />
          {value === 'treemap' ? (
            <RepositoryTreemap repositoryOverviewData={repositoryOverviewData} />
          ) : (
            <RepositoryBar repositoryOverviewData={repositoryOverviewData} />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RepositoryChart;
