import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useStyles } from './PackageDepOverview.styles';

const PackageDepSearch = (props: any) => {
  const { setSearch } = props;
  const classes = useStyles();

  const onSubmit = (data: any) => {
    setSearch(data.search);
  };

  const { register, handleSubmit } = useForm();

  return (
    <div>
      <form id="search" noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          placeholder="Search"
          className={classes.button}
          {...register('search')}
        />
        <Button className={classes.button} variant="contained" color="primary" type="submit">
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
};

export default PackageDepSearch;
