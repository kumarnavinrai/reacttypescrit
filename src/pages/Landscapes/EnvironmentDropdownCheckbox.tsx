import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const EnvironmentDropdownCheckbox = (props: any) => {
  const { environmentsData, environmentList, setEnvironmentList, hasChangedCallback } = props;

  const ITEM_HEIGHT = 30;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        maxWidth: 250,
      },
    },
  };

  // Sets the environmentList state in the parent CollapsibleLandscape
  const handleChange = (event: SelectChangeEvent) => {
    setEnvironmentList(event.target.value as unknown as string[]);
    hasChangedCallback();
  };

  return (
    <FormControl style={{ width: 250 }}>
      <InputLabel id="demo-mutiple-checkbox-label">Add Environment</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        variant="outlined"
        value={environmentList}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected: any) => {
          const envs = environmentsData.filter((env: any) => (selected as string[]).includes(env.id));
          const envNames = envs.map((env: any) => env.payload.name);
          return (envNames as string[]).join(', ');
        }}
        MenuProps={MenuProps}
      >
        {environmentsData.map((environment: any) => (
          <MenuItem key={environment.id} value={environment.id}>
            <Checkbox checked={environmentList.indexOf(environment.id) > -1} />
            <ListItemText primary={environment.payload.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EnvironmentDropdownCheckbox;
