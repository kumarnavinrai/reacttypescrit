import MaterialTable, { Column } from '@material-table/core';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IOrganizationData, IOrganizationListViewProps } from './types';

const OrganizationListView = (props: IOrganizationListViewProps) => {
  const { organizationData, isLoading } = props;

  //Handler to Add organization
  const handleAddOrganization = (e: React.MouseEvent<HTMLButtonElement>, action_type: string, rowData: any) => {
    e.preventDefault();
    if (action_type === 'ADD_ORGANIZATION') {
      props.handleParentOrgDataForNewOrganization(rowData.id, rowData.organizationName);
      props.showDialogBox();
    }
  };

  let orgDataColumns: Column<IOrganizationData>[] = [
    { title: 'id', field: 'id', hidden: true, type: 'string', width: '1%' },
    {
      title: 'Organization',
      field: 'organizationName',
      defaultSort: 'asc',
      customSort: (a, b) => {
        const a1 = a.organizationName || '';
        const b1 = b.organizationName || '';
        return a1.localeCompare(b1);
      },
      cellStyle: {
        whiteSpace: 'nowrap',
        widh: '15%',
      },
    },
    {
      title: 'Customer Name',
      field: 'customerName',
      tooltip: 'Customer Name',
      cellStyle: {
        width: '15%',
        color: '#43A5DC',
      },
      headerStyle: {
        whiteSpace: 'nowrap',
      },
    },
    {
      title: 'Landscapes',
      field: 'landscapes',
      type: 'numeric',
      width: '10px',
    },
    {
      title: 'Extracts',
      field: 'extracts',
      type: 'numeric',
      width: '10px',
    },
    {
      title: 'Customer Contact',
      field: 'customerContactEmail',
      cellStyle: {
        noWrap: true,
        width: '15%',
      },
    },
    {
      title: 'Actions',
      field: 'actionsMenu',
      sorting: false,
      minWidth: '160px',
      render: (rowData: IOrganizationData) => {
        return rowData.organizationType === 'CUSTOMER' ? (
          <Box display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-end" alignItems="center">
            <Tooltip title="Edit Customer">
              <IconButton component={RouterLink} to={`/customer/edit/${rowData.id}`}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Box display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-end" alignItems="center">
            <InputLabel>{rowData.totalCustomers} Customers</InputLabel>
            <Tooltip title="Add Group">
              <IconButton aria-label="add" onClick={(e) => handleAddOrganization(e, 'ADD_ORGANIZATION', rowData)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ] as Column<IOrganizationData>[];

  const fnParentChildData = (row: IOrganizationData, rows: IOrganizationData[]) =>
    rows.find((a) => a.id === row.parentOrganizationId);

  return isLoading ? (
    <div>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" height={120} />
    </div>
  ) : (
    <Box width="100%">
      <MaterialTable
        title={''}
        data={organizationData}
        columns={orgDataColumns}
        parentChildData={fnParentChildData}
        options={{
          showTextRowsSelected: true,
          padding: 'dense',
          rowStyle: (rowData) => ({
            backgroundColor:
              rowData.organizationType === 'CUSTOMER'
                ? '#F7F9FC'
                : rowData.tableData.isTreeExpanded === true
                ? '#eeeeee'
                : '#ffffff',
          }),
        }}
      />
    </Box>
  );
};

export default OrganizationListView;
