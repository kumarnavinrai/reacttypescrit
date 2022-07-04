import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCustomerSummary } from '../../api/Customers';
import { CustomPagination } from '../../components/common/CustomPagination';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'parentGroupName',
    headerName: 'Organization',
    flex: 0.8,
    headerAlign: 'left',
    hideSortIcons: true,
  },
  {
    field: 'groupName',
    headerName: 'Customer Name',
    flex: 1,
    headerAlign: 'left',
    hideSortIcons: true,
    renderCell: (params: GridCellParams) => (
      <>
        <Tooltip title={params.row.groupName}>
          <span>{params.row.groupName}</span>
        </Tooltip>
      </>
    ),
  },
  {
    field: 'analysisIcon',
    headerName: 'Analysis',
    hideSortIcons: true,
    disableColumnMenu: true,
    width: 100,
    headerAlign: 'left',
    align: 'center',
    renderCell: (params: GridCellParams) => (
      <>
        <Tooltip title={`Analysis Overview for ${params.row.groupName}`}>
          <IconButton component={Link} to={`/analysisoverview/${params.id}`}>
            <AssessmentOutlinedIcon color="primary" />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
  {
    field: 'numEnvironments',
    headerName: 'Environments',
    type: 'number',
    flex: 0.6,
    minWidth: 100,
    headerAlign: 'left',
    align: 'center',
    hideSortIcons: true,
    width: 50,
  },
  {
    field: 'numLandscapes',
    headerName: 'Landscapes',
    headerAlign: 'left',
    hideSortIcons: true,
    align: 'center',
    type: 'number',
    flex: 0.6,
    minWidth: 100,
  },
  {
    field: 'numExtracts',
    headerName: 'Extractions',
    headerAlign: 'left',
    hideSortIcons: true,
    align: 'center',
    type: 'number',
    flex: 0.6,
  },
  {
    field: 'contactEmail',
    headerName: 'Customer Contact',
    headerAlign: 'left',
    hideSortIcons: true,
    flex: 0.8,
    renderCell: (params: GridCellParams) => (
      <>
        <Tooltip title={params.row.contactEmail}>
          <span>{params.row.contactEmail}</span>
        </Tooltip>
      </>
    ),
  },
  {
    field: 'actionIcon',
    headerName: ' ',
    headerAlign: 'left',
    align: 'center',
    hideSortIcons: true,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    width: 40,
    renderCell: (params: GridCellParams) => (
      <>
        <Tooltip title="Edit">
          <IconButton component={Link} to={`/customer/edit/${params.id}`}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];

const CustomerTable = () => {
  const [customerTableRows, setCustomerTableRows] = useState<any>([]);
  const { showApplicationError } = useShowApplicationError();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCustomerSummary()
      .then((data) => {
        setCustomerTableRows(data);
        setIsLoading(false);
      })
      .catch((error) => {
        showApplicationError(error, 'Error getting customer summary');
        setIsLoading(false);
      });
  }, [showApplicationError, setIsLoading]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={customerTableRows}
        columns={columns}
        pageSize={5}
        loading={isLoading}
        components={{
          Pagination: CustomPagination,
        }}
      />
    </div>
  );
};

export default CustomerTable;
