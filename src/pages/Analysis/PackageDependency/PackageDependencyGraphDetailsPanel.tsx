import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IPackageDependencyGraphDetailsPanelProps } from './types';

const PackageDependencyGraphDetailsPanel = (props: IPackageDependencyGraphDetailsPanelProps) => {
  const { selectedNode } = props;

  if (!selectedNode) return null;

  return (
    <>
      <Card>
        <CardContent>
          <Typography component="div">
            <Box fontWeight="fontWeightMedium" fontSize="h6.fontSize" mb={6}>
              <Typography color="secondary" variant="h6">
                {selectedNode?.label}
              </Typography>
            </Box>
            <Box fontWeight="fontWeightMedium" my={2}>
              Description
            </Box>
            <Box fontWeight="fontSize" mb={4}>
              {selectedNode?.payload?.objectDevcText}
            </Box>
            <Box fontWeight="fontWeightMedium" my={2}>
              Application Component:
            </Box>
            <Box fontWeight="fontSize" mb={4}>
              {selectedNode?.payload?.component}
            </Box>
            <Box fontWeight="fontWeightMedium" my={2}>
              Application Component Desc:
            </Box>
            <Box fontWeight="fontSize" mb={4}>
              {selectedNode?.payload?.componentText}
            </Box>
            <Box fontWeight="fontWeightMedium" my={2}>
              DL Unit:
            </Box>
            <Box fontWeight="fontSize" mb={4}>
              {selectedNode?.payload?.dlvunit}
            </Box>
            <Box fontWeight="fontWeightMedium" my={2}>
              DDIC Only Flag:
            </Box>
            <Box fontWeight="fontSize" mb={4}>
              {selectedNode?.payload?.onlyDdDependencies?.toString()}
            </Box>
            <Box fontWeight="fontWeightMedium" my={2}>
              Calls To Packages:
            </Box>
            <Box fontWeight="fontSize" mb={4}>
              {selectedNode?.payload?.countOfReferences}
            </Box>
            <Box fontWeight="fontWeightMedium" my={2}>
              Calls From Packages:
            </Box>
            <Box fontWeight="fontSize" mb={4}>
              {selectedNode?.payload?.reverseCountOfReferences}
            </Box>
            {selectedNode?.summarizedNode === true && (
              <Box fontWeight="fontSize" mb={4} fontStyle="italic">
                Note: The data represents the summation of to/from calls.
              </Box>
            )}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default PackageDependencyGraphDetailsPanel;
