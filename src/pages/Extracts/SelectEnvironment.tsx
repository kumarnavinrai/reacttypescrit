import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { getEnvironmentsWithAnalysisJobs } from '../../api/Environments';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'systemId',
    headerName: 'System ID (SID)',
    width: 150,
  },
  {
    field: 'environmentName',
    headerName: 'Environment name',
    width: 180,
  },
  {
    field: 'extractProcessDate',
    headerName: 'Process Date',
    width: 200,
    renderCell: (params: GridCellParams) => (
      <>
        <Tooltip title={new Date(params.row.extractProcessDate).toLocaleString() || ''}>
          <span>{new Date(params.row.extractProcessDate).toLocaleString()}</span>
        </Tooltip>
      </>
    ),
  },
  {
    field: 'landscapeNames',
    headerName: 'Landscape(s)',
    width: 200,
    renderCell: (params: GridCellParams) => (
      <>
        <Tooltip title={params.row.landscapeNames.join(', ') || ''}>
          <span>{params.row.landscapeNames.join(', ')}</span>
        </Tooltip>
      </>
    ),
  },
];

const SelectEnvironment = (props: any) => {
  const { groupId, selectedEnvironmentsForUsageExtract, setSelectedEnvironmentsForUsageExtract } = props;
  const { data, isLoading } = useQuery('getEnvironmentsWithAnalysisJobs', () =>
    getEnvironmentsWithAnalysisJobs(groupId)
  );

  return isLoading ? (
    <div>
      <Skeleton variant="rectangular" height={40} width="100%">
        Loading...
      </Skeleton>
    </div>
  ) : (
    <Box sx={{ width: '100%' }}>
      <div>Select the relative environment(s) for the file</div>
      <br />
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        density="compact"
        onSelectionModelChange={(newSelection) => {
          setSelectedEnvironmentsForUsageExtract(newSelection);
        }}
        selectionModel={selectedEnvironmentsForUsageExtract}
        disableColumnMenu
        autoHeight
      />
    </Box>
  );
};

export default SelectEnvironment;
