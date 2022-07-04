import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { CustomPagination } from '../../components/common/CustomPagination';
import { ITechDependencyReportingProps } from './types';
import useDownloadReport from './useDownloadReport';

const TechDependencyReporting = (props: ITechDependencyReportingProps) => {
  const { downloadReport } = useDownloadReport(); //For downloading reports
  const {
    reportDataByLandscape,
    pageSize,
    pageIndex,
    onPageSizeChange,
    onPageChange,
    isLoading,
    fetchDataFlag,
    setFetchDataFlag,
  } = props;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'jobName',
      headerName: 'Name',
      description: 'Name',
      flex: 0.7,
      headerAlign: 'left',
      renderCell: (params: GridCellParams) => (
        <>
          <Tooltip title={params.row.jobName}>
            <span>{params.row.jobName}</span>
          </Tooltip>
        </>
      ),
    },
    {
      field: 'occuredAt',
      headerName: 'Date',
      description: 'Report Date',
      type: 'date',
      width: 120,
      headerAlign: 'left',
    },
    {
      field: 'criteriaName',
      headerName: 'Criteria',
      description: 'Criteria',
      flex: 0.8,
      headerAlign: 'left',
    },
    {
      field: 'associatedExtractFilename',
      headerName: 'Extract File',
      description: 'Extract file name',
      flex: 0.8,
      headerAlign: 'left',
      renderCell: (params: GridCellParams) => (
        <>
          <Tooltip title={params.row.associatedExtractFilename}>
            <span>{params.row.associatedExtractFilename}</span>
          </Tooltip>
        </>
      ),
    },
    {
      field: 'jobStatusCode',
      headerName: 'Status',
      description: 'Report Status',
      width: 140,
      headerAlign: 'left',
    },
    {
      field: 'action',
      headerName: 'Action',
      description: 'Action',
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      sortable: false,
      width: 120,
      renderCell: (params: GridCellParams) => (
        <>
          {params.row.jobStatusCode === 'COMPLETED' ? (
            <Tooltip title="Download Report">
              <IconButton component={Button} onClick={() => downloadReport(params.id.toString())}>
                <GetAppOutlinedIcon fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>
          ) : null}
        </>
      ),
    },
  ];

  return (
    <>
      <Box bgcolor="#FFF">
        <Grid container item xs={12} direction="row-reverse" style={{ marginLeft: -31 }}>
          <Tooltip title="Refresh report table">
            <IconButton
              component={Button}
              onClick={() => (fetchDataFlag ? setFetchDataFlag(0) : setFetchDataFlag(1))}
              size="small"
              color="primary"
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <DataGrid
          pageSize={pageSize}
          page={pageIndex}
          onPageSizeChange={(newPageSize) => onPageSizeChange(newPageSize)}
          rowsPerPageOptions={[5, 10, 25]}
          pagination
          rows={reportDataByLandscape.data}
          columns={columns}
          autoHeight
          density="standard"
          paginationMode="server"
          rowCount={reportDataByLandscape.totalCount}
          onPageChange={(newPage) => onPageChange(newPage)}
          loading={isLoading}
          components={{
            Pagination: CustomPagination,
          }}
        />
      </Box>
    </>
  );
};

export default TechDependencyReporting;
