import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/macro';
import {
  getAllClassificationSubypes,
  getClassificationTypes,
  getDefaultClassificationGroup,
} from '../../api/Classification';
import BreadcrumbNavigation, { IBreadcrumbData } from '../../components/Nav/BreadcrumbNavigation';
import AddClassification from './AddClassification';
import AddSubClassification from './AddSubClassification';
import ClassificationAttributes from './ClassificationAttributes';
import ClassificationDetails from './ClassificationDetails';
import ClassificationTypesWrapper from './ClassificationTypesWrapper';
import { DefaultGroupDataContext } from './DefaultGroupDataContext';

const Typography = styled(MuiTypography)(spacing);

const ClassificationConfigurationOverview = (props: any) => {
  const breadcrumbData = [
    { path: '', toolTip: 'Administration', label: 'Administration' },
    {
      path: '',
      toolTip: 'Configurations',
      label: 'Configurations',
    },
    { path: '', toolTip: '', label: 'Classification Types', isActive: true },
  ] as IBreadcrumbData[];

  //Fetching default group for classification
  const { data: defaultClassificationGroupData } = useQuery('getDefaultClassificationGroup', () =>
    getDefaultClassificationGroup()
  );

  //Fetching classification types
  const {
    data: classificationTypes,
    isLoading,
    refetch: refetchClassificationTypes,
  } = useQuery('getClassificationTypes', () => getClassificationTypes());

  //Fetching classification sub-types
  const {
    data: classificationSubtypes,

    refetch: refetchAllClassificationSubypes,
  } = useQuery('getAllClassificationSubypes', () => getAllClassificationSubypes());

  // Parameters to fetch ClassificationAttributes
  const [classificationDialogOpen, setClassificationDialogOpen] = useState<boolean>(false);
  const [subClassificationDialogOpen, setSubClassificationDialogOpen] = useState<boolean>(false);
  const [selectedClassificationType, setSelectedClassificationType] = useState('');
  const [selectedClassificationSubtype, setSelectedClassificationSubtype] = useState('');

  //Storing the details of selected classification and sub-classification
  const [selectedClassificationDetails, setSelectedClassificationDetails] = useState({
    classificationType: '',
    classificationTypeDefaultGroup: false,
    classificationTypeGroupId: '',
    classificationSubtype: '',
    classificationSubtypeDefaultGroup: false,
    classificationSubtypeGroupId: '',
  });

  const hideClassificationDialogBox = (dialogOpen: boolean, refreshData: boolean) => {
    setClassificationDialogOpen(dialogOpen);
    if (refreshData) {
      refetchClassificationTypes();
    }
  };

  const hideSubClassificationDialogBox = (dialogOpen: boolean, refreshData: boolean) => {
    setSubClassificationDialogOpen(dialogOpen);
    if (refreshData) {
      refetchAllClassificationSubypes();
    }
  };

  return (
    <>
      <DefaultGroupDataContext.Provider value={defaultClassificationGroupData}>
        <Box>
          <Grid container spacing={6}>
            <Grid item>
              <BreadcrumbNavigation data={breadcrumbData} />
              <br />
              <Typography variant="h3" gutterBottom>
                Object Classification Configuration
              </Typography>
            </Grid>
          </Grid>

          <br />
          <Grid container spacing="24">
            <Grid container item xs={4}>
              <ClassificationTypesWrapper
                classificationTypes={classificationTypes}
                classificationSubtypes={classificationSubtypes}
                isLoading={isLoading}
                setSelectedClassificationType={setSelectedClassificationType}
                setSelectedClassificationSubtype={setSelectedClassificationSubtype}
                setSelectedClassificationDetails={setSelectedClassificationDetails}
                selectedClassificationSubtype={selectedClassificationSubtype}
                setClassificationDialogOpen={setClassificationDialogOpen}
                setSubClassificationDialogOpen={setSubClassificationDialogOpen}
              />
            </Grid>
            {!selectedClassificationType && !selectedClassificationSubtype ? null : (
              <Grid container item xs={8} spacing={4}>
                <Grid item xs={12}>
                  <ClassificationDetails
                    selectedClassificationDetails={selectedClassificationDetails}
                    selectedClassificationType={selectedClassificationType}
                    selectedClassificationSubtype={selectedClassificationSubtype}
                  />
                  <br />
                  <ClassificationAttributes
                    selectedClassificationType={selectedClassificationType}
                    selectedClassificationSubtype={selectedClassificationSubtype}
                    selectedClassificationDetails={selectedClassificationDetails}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>

        {classificationDialogOpen && (
          <AddClassification dialogOpen={classificationDialogOpen} dialogCallback={hideClassificationDialogBox} />
        )}

        {subClassificationDialogOpen && (
          <AddSubClassification
            dialogOpen={subClassificationDialogOpen}
            dialogCallback={hideSubClassificationDialogBox}
            selectedClassificationType={selectedClassificationType}
            selectedClassificationDetails={selectedClassificationDetails}
          />
        )}
      </DefaultGroupDataContext.Provider>
    </>
  );
};

export default ClassificationConfigurationOverview;
