import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useGetLandscapeNavigationData from '../Landscapes/useGetLandscapeNavigationData';
import { useStyles } from './AnalysisOverview.styles';
import { INavigatorProps } from './types';

const Navigator = (props: INavigatorProps) => {
  const classes = useStyles();
  const { groupId, landscapeSelected, setLandscapeSelected, hideLandscapeSelection, tailText } = props;
  const { groupLandscapeData, error } = useGetLandscapeNavigationData(groupId);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [landscapeSelectedName, setLandscapeSelectedName] = React.useState('');

  useEffect(() => {
    if (groupLandscapeData.landScapes && groupLandscapeData.landScapes.length > 0) {
      //Get the default landscape from the list of landscapes
      const defaultLandscape = groupLandscapeData.landScapes.find((i) => i.defaultLandscape);

      //SET default landscape otherwise set the first landscape from the list.
      if (landscapeSelected.id) {
        const landScapeFound = groupLandscapeData.landScapes.find((i) => i.id === landscapeSelected.id);
        if (landScapeFound) setLandscapeSelectedName(landScapeFound.name);
      } else {
        if (defaultLandscape) {
          setLandscapeSelected({ id: defaultLandscape.id, name: defaultLandscape.name });
        } else {
          setLandscapeSelected({
            id: groupLandscapeData?.landScapes[0].id,
            name: groupLandscapeData?.landScapes[0].name,
          });
        }
      }
    }
  }, [groupLandscapeData.landScapes]);

  const handleClickLandscapeLink = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    const itemFound = groupLandscapeData.landScapes.find((i) => i.id === event.currentTarget.id);
    if (itemFound) {
      setLandscapeSelected({ id: itemFound.id, name: itemFound.name });
      setLandscapeSelectedName(itemFound.name);
    }
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (error)
    return (
      <Box color="error.main" component="div">
        {error}
      </Box>
    );

  return (
    <>
      <Breadcrumbs aria-label="Breadcrumb" separator=">">
        <Link
          component={RouterLink}
          to={`/customer/edit/${groupId}`}
          title={'Customer'}
          className={classes.breadCrumbLink}
        >
          {groupLandscapeData.groupName}
        </Link>
        <Link
          onClick={handleClickLandscapeLink}
          className={classes.breadCrumbLink}
          component={hideLandscapeSelection ? RouterLink : Button}
          to={hideLandscapeSelection ? `/analysisoverview/${groupId}` : ''}
        >
          <Grid container direction="row" alignItems="center">
            {landscapeSelectedName ? landscapeSelectedName : landscapeSelected.name}
            {hideLandscapeSelection ? '' : <ExpandMoreOutlinedIcon />}
          </Grid>
        </Link>
        {hideLandscapeSelection ? (
          <Link component={Button} className={classes.breadCrumbLink}>
            <Grid container direction="row" alignItems="center">
              {tailText ? tailText : ''}
            </Grid>
          </Link>
        ) : (
          ''
        )}
      </Breadcrumbs>
      <Menu id="landScapeMenu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {groupLandscapeData.landScapes.map(function (landscape) {
          return (
            <MenuItem
              classes={{ root: classes.menuItemRoot, selected: classes.menuItemSelected }}
              key={landscape.id}
              id={landscape.id}
              onClick={(event) => handleMenuItemClick(event)}
              selected={landscape.id === landscapeSelected.id}
            >
              {landscape.name}
              {landscape.defaultLandscape && `\u00A0\u00A0\u00A0\u00A0(default)`}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default Navigator;
