import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import { useGridSlotComponentProps } from '@mui/x-data-grid';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

/**
This component is used for Custom Pagination for datagrid and table.
*/
export const CustomPagination = () => {
  const { state, apiRef } = useGridSlotComponentProps();
  const classes = useStyles();

  return (
    <Pagination
      className={classes.root}
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
      siblingCount={2}
      showFirstButton
      showLastButton
    />
  );
};
