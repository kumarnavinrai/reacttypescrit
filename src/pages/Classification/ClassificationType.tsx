import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useStyles } from './Classification.styles';
import { GlobalConfigurationIcon } from './ClassificationTypesWrapper';

const ClassificationType = (props: any) => {
  const classes = useStyles();

  const {
    data,
    classificationSubtypes,
    setSelectedClassificationType,
    setSelectedClassificationSubtype,
    setSelectedClassificationDetails,
    selectedClassificationSubtype,
    setSubClassificationDialogOpen,
    expanded,
    setExpanded,
  } = props;

  const handleExpandChange =
    (panel: string, tag: string, name: string, groupId: string, defaultGroup: boolean) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (isExpanded) {
        setExpanded(panel);
        setSelectedClassificationType(tag);
        setSelectedClassificationDetails({
          classificationType: name,
          classificationTypeGroupId: groupId,
          classificationTypeDefaultGroup: defaultGroup,
          classificationSubtype: '',
        });
      } else {
        setSelectedClassificationType('');
        setSelectedClassificationDetails({
          classificationType: '',
          classificationTypeGroupId: '',
          classificationTypeDefaultGroup: false,
          classificationSubtype: '',
        });
        setExpanded(false);
      }

      setSelectedClassificationSubtype('');
    };

  const setSubTypeSelection = (tag: string, name: string, groupId: string, defaultSubType: boolean) => {
    setSelectedClassificationSubtype(tag);
    setSelectedClassificationDetails((prev: any) => ({
      classificationType: prev.classificationType,
      classificationTypeDefaultGroup: prev.classificationTypeDefaultGroup,
      classificationTypeGroupId: prev.classificationTypeGroupId,
      classificationSubtype: name,
      classificationSubtypeDefaultGroup: defaultSubType,
      classificationSubtypeGroupId: groupId,
    }));
  };

  return (
    <div>
      <Accordion
        expanded={expanded === data.id}
        onChange={handleExpandChange(
          data.id,
          data.payload.tag,
          data.payload.name,
          data.payload.groupId,
          data.payload.defaultType
        )}
      >
        <AccordionSummary classes={{ expanded: classes.expandedPanel }} expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.typesHeading} variant="h5">
            {data.payload.defaultType ? <GlobalConfigurationIcon size={10} /> : <>&nbsp;&nbsp;&nbsp;&nbsp;</>}
            {data.payload.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.subClassification} sx={{ ml: 3 }}>
          <Button color="primary" onClick={() => setSubClassificationDialogOpen(true)}>
            <Typography className={classes.typesSubHeading} variant="h6">
              + Add New Sub-Classification
            </Typography>
          </Button>
          {classificationSubtypes?.map((subtype: any) => (
            <Box
              key={subtype.id}
              sx={{ background: selectedClassificationSubtype === subtype.payload.tag ? '#DEECF4' : '#ffffff' }}
            >
              <Typography
                key={subtype.id}
                gutterBottom
                onClick={() =>
                  setSubTypeSelection(
                    subtype.payload.tag,
                    subtype.payload.name,
                    subtype.payload.groupId,
                    subtype.payload.defaultSubtype
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                {subtype.payload.defaultSubtype ? (
                  <GlobalConfigurationIcon size={10} />
                ) : (
                  <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
                )}
                {subtype.payload.name}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ClassificationType;
