import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useStyles } from '../Customers/Customer.styles';
import UploadExtractsDialog from '../Extracts/UploadExtractsDialog';
import CollapsibleEnvironmentsTable from './CollapsibleEnvironmentsTable';
import ManageEnvironmentDialog from './ManageEnvironmentDialog';
import { EnvironmentsProps } from './types';

const Environments = (props: EnvironmentsProps) => {
  const classes = useStyles();
  const [envDialogOpen, setEnvDialogOpen] = useState<boolean>(false);
  const [extractsDialogOpen, setExtractsDialogOpen] = useState<boolean>(false);
  const [defaultSID, setDefaultSID] = useState<string | null>(null);
  const { groupId, rerenderEnvironmentsFlag, setRerenderEnvironmentsFlag } = props;

  const showDefaultEnvDialogBox = () => {
    setDefaultSID(null);
    setEnvDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardContent className={classes.heading}>
          <Typography className={classes.cardHeading} variant="h5">
            Environments
          </Typography>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => setExtractsDialogOpen(true)}
            disabled={groupId ? false : true}
          >
            + Add Extract
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={showDefaultEnvDialogBox}
            disabled={groupId ? false : true}
          >
            + Add Environment
          </Button>
        </CardContent>
        <CardContent>
          <CollapsibleEnvironmentsTable
            groupId={groupId}
            rerenderEnvironmentsFlag={rerenderEnvironmentsFlag}
            setRerenderEnvironmentsFlag={setRerenderEnvironmentsFlag}
          />
        </CardContent>
      </Card>
      {envDialogOpen ? (
        <ManageEnvironmentDialog
          groupId={groupId}
          dialogOpen={envDialogOpen}
          dialogClose={() => setEnvDialogOpen(false)}
          hasChangedCallback={setRerenderEnvironmentsFlag}
          updateEnvironmentId=""
          action="ADD"
          defaultSID={defaultSID}
        />
      ) : null}
      {extractsDialogOpen ? (
        <UploadExtractsDialog
          groupId={groupId}
          dialogOpen={extractsDialogOpen}
          showEnvDialogBox={() => setEnvDialogOpen(true)}
          setExtractsDialogOpen={setExtractsDialogOpen}
          hasChangedCallback={setRerenderEnvironmentsFlag}
          setRerenderEnvironmentsFlag={setRerenderEnvironmentsFlag}
          setDefaultSID={setDefaultSID}
        />
      ) : null}
    </>
  );
};

export default Environments;
