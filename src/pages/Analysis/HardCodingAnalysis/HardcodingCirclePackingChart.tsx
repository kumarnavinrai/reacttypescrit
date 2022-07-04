import Box from '@mui/material/Box';
import MuiDivider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import CirclePackingChart from '../../../components/common/CirclePackingChart';

const Divider = styled(MuiDivider)(spacing);

const HardcodingCirclePackingChart = (props: any) => {
  const { domainSelected, setDomainSelected } = props;

  const data = {
    name: 'Parent',
    loc: 0,
    children: [
      {
        name: 'Alfa',
        loc: Math.floor(Math.random() * 1000) + 1,
      },
      {
        name: 'Beta',
        loc: Math.floor(Math.random() * 1000) + 1,
      },
      {
        name: 'Gama',
        loc: Math.floor(Math.random() * 1000) + 1,
      },

      {
        name: 'Theta',
        loc: Math.floor(Math.random() * 1000) + 1,
      },
    ],
  };

  const [switchChecked, setSwitchChecked] = useState(true);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setSwitchChecked(checked);
  };

  return (
    <>
      <Box sx={{ mt: 4, ml: 2 }}>
        <Grid container direction="row" sx={{ mb: 2 }}>
          <Grid item display="flex" justifyContent="left">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Full System</Typography>
              <Switch
                size="small"
                color="primary"
                defaultChecked={switchChecked}
                inputProps={{ 'aria-label': 'switch between full system and usage' }}
                onChange={handleSwitchChange}
              />
              <Typography>Usage</Typography>
            </Stack>
          </Grid>
          <Grid item xs>
            <Grid container direction="row-reverse">
              <Grid item>
                <Typography sx={{ mr: 4 }} align="right">
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                      setDomainSelected('');
                    }}
                  >
                    Back
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={6}>
              <Typography variant="h6">Domain: {domainSelected}</Typography>
              <Typography variant="body1">Literal Value: {Math.floor(Math.random() * 8000000) + 1}</Typography>
              <Typography variant="body2">Occurrences: {Math.floor(Math.random() * 50) + 1}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Divider my={6} />
      <div style={{ height: '75vh' }}>
        <CirclePackingChart data={data} />
      </div>
    </>
  );
};

export default HardcodingCirclePackingChart;
