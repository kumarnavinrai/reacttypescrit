import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import TreemapChart from '../../../components/common/TreemapChart';

const HardCodingAnalysisChart = (props: any) => {
  const [switchChecked, setSwitchChecked] = useState(true);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setSwitchChecked(checked);
  };

  return (
    <CardContent>
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
      <br />
      <TreemapChart />
    </CardContent>
  );
};

export default HardCodingAnalysisChart;
