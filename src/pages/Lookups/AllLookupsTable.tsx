import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { deleteLookupByID, getLookups } from '../../api/Lookups';
import { CustomPagination } from '../../components/common/CustomPagination';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useSetNotification } from '../../components/notification/useNotification';
import ManageLookupDialog from './ManageLookupDialog';
import { AllLookupsTableProps, LookupsDataProps, LookupTableRowsProps } from './types';

const AllLookupsTable = (props: AllLookupsTableProps) => {
  const [lookupsData, setLookupsData] = useState<LookupsDataProps[]>([]);
  const [lookupTableRows, setLookupTableRows] = useState<LookupTableRowsProps[]>([]);
  const [updateLookupId, setUpdateLookupId] = useState<string | null>(null);
  const [deleteLookupId, setDeleteLookupId] = useState('');
  const [lookupsTableState, setLookupsTableState] = useState(0);
  const setMessage = useSetNotification();
  const { showApplicationError } = useShowApplicationError();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { lookupsTableStateProp } = props;

  const handleDeleteDialogOpen = (id: string) => {
    setDeleteDialogOpen(true);
    setDeleteLookupId(id);
  };

  const showDialogBox = (id: string) => {
    setDialogOpen(true);
    setUpdateLookupId(id);
  };

  const hideDialogBox = (val: boolean) => {
    setDialogOpen(val);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, hide: true },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    {
      field: 'icon',
      headerName: 'Actions',
      align: 'center',
      width: 200,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => showDialogBox(params.id)} aria-label="edit">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteDialogOpen(params.id)} aria-label="delete">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const deleteLookup = async (id: string) => {
    deleteLookupByID(id)
      .then((data) => {
        setLookupsTableState(lookupsTableState + 1);
        setDeleteDialogOpen(false);
        setMessage.setMessageModel('Successfully Deleted!', 'success');
      })
      .catch((error) => {
        setDeleteDialogOpen(false);
        showApplicationError(error, 'Error in deleting Lookup');
      });
  };

  useEffect(() => {
    getLookups()
      .then((data) => {
        setLookupsData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        showApplicationError(error, 'Error in getting Lookups');
        setIsLoading(false);
      });
  }, [lookupsTableStateProp, lookupsTableState, setIsLoading]);

  useEffect(() => {
    if (lookupsData.length > 0) {
      const rows = lookupsData.map((item: LookupsDataProps) => ({
        id: item.id,
        name: item.payload.name,
        type: item.payload.type,
      }));

      setLookupTableRows(rows);
    }
  }, [lookupsData]);

  const updateProps = {
    update: true,
    updateLookupId: updateLookupId,
  };

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={lookupTableRows}
          columns={columns}
          pageSize={5}
          loading={isLoading}
          components={{
            Pagination: CustomPagination,
          }}
        />
      </div>
      <ManageLookupDialog
        updateProps={updateProps}
        dialogOpen={dialogOpen}
        dialogCallback={hideDialogBox}
        hasChangedCallback={() => setLookupsTableState(lookupsTableState + 1)}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Lookup Delete?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="contained" size="small">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            autoFocus
            size="small"
            onClick={() => deleteLookup(deleteLookupId)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllLookupsTable;
