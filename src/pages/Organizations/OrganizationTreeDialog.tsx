import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useStyles } from './Organizations.styles';
import { IOrganizationTreeDialogProps } from './types';
import useGetOrgTreeData from './useGetOrgTreeData';

const OrganizationTreeDialog = (props: IOrganizationTreeDialogProps) => {
  const classes = useStyles();
  const { organizationTreeDialogOpen, setOrganizationTreeDialogOpen, handleSelectedOrganization } = props;
  const { orgTreeData } = useGetOrgTreeData();
  const [selectedNode, setSelectedNode] = useState({ orgId: '', orgName: '' });

  const getTreeItemsFromData = (treeItems: any[]) => {
    return treeItems.map((treeItemData) => {
      let children = undefined;
      if (treeItemData.childOrganizations && treeItemData.childOrganizations.length > 0) {
        children = getTreeItemsFromData(treeItemData.childOrganizations);
      }
      return (
        <TreeItem
          key={treeItemData.id}
          nodeId={treeItemData.id}
          label={treeItemData.organizationName}
          children={children}
          classes={{ root: classes.treeItemRoot }}
        />
      );
    });
  };

  const handleNodeSelect = (event: any, nodeId: any) => {
    setSelectedNode({ orgId: nodeId, orgName: event.currentTarget.innerText });
  };

  const handleSelectButtonClick = (e: any) => {
    if (selectedNode.orgId) handleSelectedOrganization(selectedNode.orgId, selectedNode.orgName);
    setSelectedNode({ orgId: '', orgName: '' });
    setOrganizationTreeDialogOpen(false);
  };

  return (
    <div>
      <Dialog
        open={organizationTreeDialogOpen}
        onClose={() => setOrganizationTreeDialogOpen(false)}
        aria-labelledby="organization-selection-dialog-title"
        maxWidth="xs"
        fullWidth
        scroll="body"
      >
        <DialogTitle id="organization-selection-dialog-title">
          <Typography className={classes.cardHeading} variant="h5" component="div">
            Select Organization
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TreeView
            multiSelect={false}
            onNodeSelect={handleNodeSelect}
            defaultCollapseIcon={<ExpandMoreOutlinedIcon />}
            defaultExpandIcon={<ChevronRightOutlinedIcon />}
          >
            {getTreeItemsFromData(orgTreeData)}
          </TreeView>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSelectButtonClick}>
            Select
          </Button>
          <Button onClick={() => setOrganizationTreeDialogOpen(false)} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrganizationTreeDialog;
