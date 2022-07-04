import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import AddAttribute from './AddAttribute';
import AttributesTable from './AttributesTable';
import { useStyles } from './Classification.styles';
import useGetClassificationConfigs from './useGetClassificationConfigs';

const ClassificationAttributes = (props: any) => {
  const classes = useStyles();

  const { selectedClassificationType, selectedClassificationSubtype, selectedClassificationDetails } = props;
  const [addAttributesDialogOpen, setAddAttributesDialogOpen] = useState<boolean>(false);

  //Storing the Attribute Id for the update
  const [classificationConfigIdToUpdate, setClassificationConfigIdToUpdate] = useState<string>('');

  const { classificationConfig, isLoading, fetchDataFlag, setFetchDataFlag } = useGetClassificationConfigs(
    selectedClassificationType,
    selectedClassificationSubtype
  );

  const hideAddAttributesDialogBox = (val: boolean, refreshData: boolean) => {
    setAddAttributesDialogOpen(val);
    setClassificationConfigIdToUpdate('');
    if (refreshData) {
      setFetchDataFlag(!fetchDataFlag);
    }
  };

  return !selectedClassificationType && !selectedClassificationSubtype ? null : (
    <>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent className={classes.heading}>
            <Typography className={classes.cardHeading} variant="h5">
              Attributes
            </Typography>
            {selectedClassificationType && selectedClassificationSubtype && (
              <Button color="primary" onClick={() => setAddAttributesDialogOpen(true)} variant="contained" size="small">
                Add New Attributes
              </Button>
            )}
          </CardContent>
          <CardContent>
            <AttributesTable
              classificationConfig={classificationConfig}
              isLoading={isLoading}
              refreshData={() => setFetchDataFlag(!fetchDataFlag)}
              setClassificationConfigIdToUpdate={setClassificationConfigIdToUpdate}
              setAddAttributesDialogOpen={setAddAttributesDialogOpen}
            />
          </CardContent>
        </Card>
      </Grid>
      {addAttributesDialogOpen && (
        <AddAttribute
          dialogOpen={addAttributesDialogOpen}
          dialogCallback={hideAddAttributesDialogBox}
          selectedClassificationTypeTag={selectedClassificationType}
          selectedClassificationSubtypeTag={selectedClassificationSubtype}
          selectedClassificationDetails={selectedClassificationDetails}
          classificationConfigIdToUpdate={classificationConfigIdToUpdate}
        />
      )}
    </>
  );
};

export default ClassificationAttributes;
