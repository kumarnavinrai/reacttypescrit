import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { CustomPagination } from '../../../components/common/CustomPagination';
import { IAnalysisPackageDepProps } from './types';
import useGetPackageDepDataByLandscapeId from './useGetPackageDepDataByLandscapeId';

const PackageDepTable = (props: IAnalysisPackageDepProps) => {
  const { search, landscapeId } = props;
  const { groupId } = useParams<{ groupId: string }>();

  const defaultPageSize = 10;

  const { packageDepDataByLandscape, pageSize, pageIndex, onPageSizeChange, onPageChange, isLoading } =
    useGetPackageDepDataByLandscapeId(landscapeId, search, defaultPageSize);

  const columns: GridColDef[] = [
    { field: 'uuid', headerName: 'ID', hide: true },
    {
      field: 'entryDevclass',
      headerName: 'Entry Package',
      description: 'Entry Package',
      minWidth: 200,
      headerAlign: 'left',
      renderCell: (params: GridCellParams) => (
        <>
          <Tooltip title={params.row.entryDevclass}>
            <Link
              component={RouterLink}
              to={`/packagedependency/graph/${groupId}/${props.landscapeId}/${encodeURIComponent(
                params.row.entryDevclass
              )}`}
            >
              {params.row.entryDevclass}
            </Link>
          </Tooltip>
        </>
      ),
    },
    {
      field: 'entryDevcText',
      headerName: 'Entry Package Description',
      description: 'Entry Package Description',
      minWidth: 380,
      headerAlign: 'left',
      renderCell: (params: GridCellParams) => (
        <>
          <Tooltip title={params.row.entryDevcText}>
            <span>{params.row.entryDevcText}</span>
          </Tooltip>
        </>
      ),
    },
    {
      field: 'objectDevclass',
      headerName: 'Dependent DevClass/Package',
      description: 'Dependent DevClass/Package',
      minWidth: 200,
      headerAlign: 'left',
      renderCell: (params: GridCellParams) => (
        <>
          <Tooltip title={params.row.objectDevclass}>
            <span>{params.row.objectDevclass}</span>
          </Tooltip>
        </>
      ),
    },
    {
      field: 'objectDevcText',
      headerName: 'Dependent DevClass/Package Description',
      description: 'Dependent DevClass/Package Description',
      minWidth: 380,
      headerAlign: 'left',
      renderCell: (params: GridCellParams) => (
        <>
          <Tooltip title={params.row.objectDevcText}>
            <span>{params.row.objectDevcText}</span>
          </Tooltip>
        </>
      ),
    },
    {
      field: 'pdevc',
      headerName: 'Parent DevClass',
      description: 'Parent DevClass',
      minWidth: 110,
      headerAlign: 'left',
    },
    {
      field: 'pdevcText',
      headerName: 'ParentDevClass Description',
      description: 'ParentDevClass Description',
      minWidth: 200,
      headerAlign: 'left',
      renderCell: (params: GridCellParams) => (
        <>
          <Tooltip title={params.row.pdevcText}>
            <span>{params.row.pdevcText}</span>
          </Tooltip>
        </>
      ),
    },
    {
      field: 'component',
      headerName: 'Application Component',
      description: 'Application Component',
      minWidth: 150,
      headerAlign: 'left',
    },
    {
      field: 'componentText',
      headerName: 'Application Component Description',
      description: 'Application Component Description',
      minWidth: 300,
      headerAlign: 'left',
      renderCell: (params: GridCellParams) => (
        <>
          <Tooltip title={params.row.componentText}>
            <span>{params.row.componentText}</span>
          </Tooltip>
        </>
      ),
    },
    {
      field: 'onlyDdDependencies',
      headerName: 'DDIC only',
      description: 'DDIC only',
      minWidth: 110,
      headerAlign: 'left',
      type: 'boolean',
    },
    {
      field: 'countOfReferences',
      headerName: 'Number of Calls To Dependent Package',
      description: 'Number of Calls To Dependent Package',
      minWidth: 110,
      type: 'number',
    },
    {
      field: 'reverseCountOfReferences',
      headerName: 'Number of Calls From Dependent Package',
      description: 'Number of Calls From Dependent Package',
      minWidth: 110,
      type: 'number',
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
          rows={packageDepDataByLandscape.data}
          columns={columns}
          autoHeight
          density="standard"
          paginationMode="server"
          rowCount={packageDepDataByLandscape.totalCount}
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

export default PackageDepTable;
