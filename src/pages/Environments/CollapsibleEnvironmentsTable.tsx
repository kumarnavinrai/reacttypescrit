import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { deteteEnvironmentById, getEnvironmentsByGroupId, getExtractsByEnvironmentId } from '../../api/Environments';
import { useShowApplicationError } from '../../components/common/useShowApplicationError';
import { useSetNotification } from '../../components/notification/useNotification';
import ManageEnvironmentDialog from './ManageEnvironmentDialog';
import {
  CollapsibleEnvironmentsTableProps,
  EnvironmentsDataType,
  EnvironmentsPayloadType,
  ExtractsPayloadType,
} from './types';

const EnvironmentList = (props: {
  environmentId: string;
  payload: EnvironmentsPayloadType;
  showDialogBox: any;
  hasChangedCallback: () => void;
}) => {
  const { environmentId, payload: environment, showDialogBox, hasChangedCallback } = props;
  const [openExtractDetails, setOpenExtractDetails] = useState(false);
  const [extracts, setExtracts] = useState<ExtractsPayloadType[]>([]);
  const setMessage = useSetNotification();
  const { showApplicationError } = useShowApplicationError();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (openExtractDetails) {
      getExtractsByEnvironmentId(environmentId)
        .then((data) => {
          setExtracts(data.data);
        })
        .catch((error) =>
          showApplicationError(error, `Failed to search Extracts By Environment Id - ${environmentId}`)
        );
    }
  }, [openExtractDetails]);

  const deteteEnvironment = (environmentId: string) => {
    if (!environmentId) {
      return;
    }
    deteteEnvironmentById(environmentId)
      .then((data) => {
        hasChangedCallback();
        setMessage.setMessageModel('Environment deleted successfully', 'success');
      })
      .catch((error) => showApplicationError(error, 'Failed to delete an Environment'));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
          {environment.sapSystemId}
        </TableCell>
        <TableCell>{environment.applicationTag}</TableCell>
        <TableCell>{environment.applicationVersionTag}</TableCell>
        <TableCell>{environment.environmentTypeTag}</TableCell>
        <TableCell>
          {environment.latestExtractInfo ? (
            <>
              {new Date(environment.latestExtractInfo.latestJobStatusDate).toLocaleString() +
                ' - ' +
                environment.latestExtractInfo.extractTypeTag}
              {environment.latestExtractInfo.jobInProgress ? (
                <IconButton aria-label="expand row" size="small" style={{ marginLeft: '5px' }}>
                  <CircularProgress size={12} style={{ color: '#B00505' }} />
                </IconButton>
              ) : null}
            </>
          ) : null}
        </TableCell>
        <TableCell>
          {environment.extractCount ? (
            <>
              <span>{environment.extractCount} total</span>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpenExtractDetails(!openExtractDetails)}
              >
                {openExtractDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </>
          ) : null}
        </TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => showDialogBox(environmentId)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => deteteEnvironment(environmentId)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'unset' }} colSpan={3}>
          <Collapse in={openExtractDetails} timeout="auto" unmountOnExit>
            <Box pt={4} pb={4}>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableCell>Date</TableCell>
                    <TableCell>Extraction Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                    {extracts
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((extract: ExtractsPayloadType) =>
                        extract.payload.latestJobInfo ? (
                          <TableRow key={extract.id}>
                            <TableCell>
                              {new Date(extract.payload.latestJobInfo.currentStatus.occuredAt).toLocaleString()}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {extract.payload?.extractInfo?.sapSystemInfo?.extractTypeTag}
                            </TableCell>
                            <TableCell>{extract.payload.latestJobInfo.currentStatus.code}</TableCell>
                            <TableCell>
                              {extract.payload.latestJobInfo.name} - {extract.payload?.descriptionTag}
                            </TableCell>
                          </TableRow>
                        ) : null
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={extracts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const CollapsibleEnvironmentsTable = (props: CollapsibleEnvironmentsTableProps) => {
  const { groupId, environmentsDataUnderLandscape, rerenderEnvironmentsFlag, setRerenderEnvironmentsFlag } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [environmentsData, setEnvironmentsData] = useState<EnvironmentsDataType[]>([]);
  const [updateEnvironmentId, setupdateEnvironmentId] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { showApplicationError } = useShowApplicationError();

  // Set environmentsData state conditionally depending on Landscape scoped environments vs regular environments table
  useEffect(() => {
    if (!groupId) {
      return;
    }
    if (environmentsDataUnderLandscape) {
      setEnvironmentsData(environmentsDataUnderLandscape);
    } else {
      getEnvironmentsByGroupId(groupId)
        .then((data) => {
          setEnvironmentsData(data.data);
        })
        .catch((error) => showApplicationError(error, 'Failed to search Environments by GroupId'));
    }
  }, [groupId, environmentsDataUnderLandscape, rerenderEnvironmentsFlag, showApplicationError]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const showDialogBoxWithEnvId = (environmentId: string) => {
    setDialogOpen(true);
    setupdateEnvironmentId(environmentId);
  };

  return (
    <Paper variant="outlined">
      <TableContainer component={Paper}>
        <Table size="small" aria-label="collapsible table">
          <TableHead style={{ padding: '2px' }}>
            <TableRow>
              <TableCell>System ID (SID)</TableCell>
              <TableCell>SAP Application</TableCell>
              <TableCell>Application Version</TableCell>
              <TableCell>Environment Type</TableCell>
              <TableCell>Latest</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {environmentsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((environment: EnvironmentsDataType) => (
                <EnvironmentList
                  key={environment.id}
                  environmentId={environment.id}
                  payload={environment.payload}
                  showDialogBox={showDialogBoxWithEnvId}
                  hasChangedCallback={setRerenderEnvironmentsFlag}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={environmentsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {dialogOpen ? (
        <ManageEnvironmentDialog
          groupId={groupId}
          dialogOpen={dialogOpen}
          dialogClose={() => setDialogOpen(false)}
          hasChangedCallback={setRerenderEnvironmentsFlag}
          updateEnvironmentId={updateEnvironmentId || ''}
          action="EDIT"
        />
      ) : null}
    </Paper>
  );
};

export default CollapsibleEnvironmentsTable;
