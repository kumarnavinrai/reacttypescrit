import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { CustomPagination } from '../../components/common/CustomPagination';
import { IAnalysisReportingProps } from './types';
import useDownloadReport from './useDownloadReport';
import useGetReportDataByLandscapeId from './useGetReportDataByLandscapeId';

const AnalysisReporting = (props: IAnalysisReportingProps) => {
  const defaultPageSize = 10;

  const { downloadReport } = useDownloadReport(); //For downloading reports
  const { reportDataByLandscape, pageSize, pageIndex, onPageSizeChange, onPageChange, isLoading } =
    useGetReportDataByLandscapeId(props.landscapeId, defaultPageSize);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'environment',
      headerName: 'Environment',
      description: 'Environment',
      width: 160,
      headerAlign: 'left',
    },
    {
      field: 'reportDate',
      headerName: 'Date',
      description: 'Report Date',
      type: 'date',
      width: 110,
      headerAlign: 'left',
    },
    {
      field: 'reportTitle',
      headerName: 'File Name',
      description: 'File Name',
      flex: 1,
      headerAlign: 'left',
      renderCell: (params: GridCellParams) => (
        <>
          <Tooltip title={params.row.reportTitle || ''}>
            <span>{params.row.reportTitle}</span>
          </Tooltip>
        </>
      ),
    },
    {
      field: 'extractFileName',
      headerName: 'Extract File',
      description: 'Extract file name',
      flex: 1,
      headerAlign: 'left',
      renderCell: (params: GridCellParams) => (
        <>
          <Tooltip title={params.row.extractFileName || ''}>
            <span>{params.row.extractFileName}</span>
          </Tooltip>
        </>
      ),
    },
    {
      field: 'reportStatus',
      headerName: 'Status',
      description: 'Report Status',
      width: 120,
      headerAlign: 'left',
    },
    {
      field: 'download',
      headerName: ' ',
      description: 'Download Report',
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      sortable: false,
      width: 8,
      renderCell: (params: GridCellParams) => (
        <>
          <Tooltip title="Download Report">
            <IconButton component={Button} onClick={() => downloadReport(params.id.toString())}>
              <GetAppOutlinedIcon fontSize="small" color="primary" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <Box bgcolor="#FFF">
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

export default AnalysisReporting;
