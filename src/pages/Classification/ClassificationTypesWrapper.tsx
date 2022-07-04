import CircleIcon from '@mui/icons-material/Circle';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useStyles } from './Classification.styles';
import ClassificationType from './ClassificationType';

const ClassificationTypesWrapper = (props: any) => {
  const classes = useStyles();
  const {
    classificationTypes,
    classificationSubtypes,
    isLoading,
    setSelectedClassificationType,
    setSelectedClassificationSubtype,
    selectedClassificationSubtype,
    setSelectedClassificationDetails,
    setClassificationDialogOpen,
    setSubClassificationDialogOpen,
  } = props;
  const [expanded, setExpanded] = useState<string | false>(false);

  return (
    <Grid item xs={12}>
      <Card variant="outlined" style={{ height: '100%' }}>
        <CardContent>
          <Typography className={classes.typesHeading} variant="h5" component="div" gutterBottom>
            Object Classification Types
          </Typography>
          <div style={{ color: '#67AC5B' }}>
            <GlobalConfigurationIcon size={8} />
            <Typography variant="caption">Global Configuration</Typography>
          </div>
          <Button color="primary" onClick={() => setClassificationDialogOpen(true)}>
            <Typography className={classes.typesSubHeading} variant="h6">
              + Add New Classification
            </Typography>
          </Button>
          {isLoading ? (
            <Skeleton variant="rectangular" height={30} animation="wave" />
          ) : (
            classificationTypes.map((classificationType: any) => (
              <ClassificationType
                key={classificationType.id}
                data={classificationType}
                classificationSubtypes={classificationSubtypes?.filter(
                  (x: any) => x.payload.parentClassificationTypeTag === classificationType.payload.tag
                )}
                setSelectedClassificationType={setSelectedClassificationType}
                setSelectedClassificationSubtype={setSelectedClassificationSubtype}
                selectedClassificationSubtype={selectedClassificationSubtype}
                setSelectedClassificationDetails={setSelectedClassificationDetails}
                setSubClassificationDialogOpen={setSubClassificationDialogOpen}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            ))
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export const GlobalConfigurationIcon = (props: any) => {
  return <CircleIcon sx={{ fontSize: props.size, mr: 2, color: '#67AC5B' }} />;
};

export default ClassificationTypesWrapper;
