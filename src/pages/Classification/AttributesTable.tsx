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
import { CustomPagination } from '../../components/common/CustomPagination';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useSetNotification } from '../../components/notification/useNotification';
import { deleteClassificationConfig as deleteClassificationConfigAPI } from './../../api/Classification';

const AttributesTable = (props: any) => {
  const {
    classificationConfig,
    isLoading,
    refreshData,
    setClassificationConfigIdToUpdate,
    setAddAttributesDialogOpen,
  } = props;
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateLookupId, setUpdateLookupId] = useState<string | null>(null);
  const [deleteClassificationConfigId, setDeleteClassificationConfigId] = useState('');
  const setMessage = useSetNotification();
  const { showApplicationError } = useShowApplicationError();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, hide: true },
    { field: 'attributeName', headerName: 'Attribute Name', flex: 1 },
    { field: 'sequence', headerName: 'Sequence', flex: 1 },
    { field: 'classificationAttributeTag', headerName: 'Attribute Tag', flex: 1 },
    { field: 'attributeValue', headerName: 'Attribute Value', flex: 1 },
    {
      field: 'icon',
      headerName: 'Actions',
      align: 'left',
      width: 130,
      renderCell: (params: any) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEditAttributeDialogOpen(params.id)} aria-label="edit">
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

  const handleDeleteDialogOpen = (id: string) => {
    setDeleteDialogOpen(true);
    setDeleteClassificationConfigId(id);
  };

  const handleEditAttributeDialogOpen = (id: string) => {
    setClassificationConfigIdToUpdate(id);
    setAddAttributesDialogOpen(true);
  };

  // const handleDeleteClassificationConfig = async () => {
  //   try {
  //     await deleteClassificationConfigAPI(deleteClassificationConfigId);
  //   setAddAttributesDialogOpen(true);
  // };

  useEffect(() => {
    if (classificationConfig.data.length > 0) {
      setData(
        classificationConfig.data.map((row: any) => {
          return { id: row.id, ...row.payload };
        })
      );
    } else {
      setData([]);
    }
  }, [classificationConfig.data]);

  const deleteClassificationConfig = async (id: string) => {
    deleteClassificationConfigAPI(id)
      .then((data) => {
        setDeleteDialogOpen(false);
        setMessage.setMessageModel('Successfully Deleted!', 'success');
        refreshData();
      })
      .catch((error) => {
        setDeleteDialogOpen(false);
        showApplicationError(error, 'Error in deleting Attribute');
      });
  };

  const deleteDialog = () => {
    return (
      <>
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Attribute Delete?</DialogTitle>
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
              onClick={() => deleteClassificationConfig(deleteClassificationConfigId)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        density="compact"
        autoHeight
        components={{
          Pagination: CustomPagination,
        }}
        loading={isLoading}
      />
      {deleteDialog()}
    </div>
  );
};

export default AttributesTable;
