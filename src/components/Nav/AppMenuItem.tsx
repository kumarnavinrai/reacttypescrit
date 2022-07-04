import IconExpandLess from '@mui/icons-material/ExpandLess';
import IconExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './Nav.styles';

type AppMenuItemProps = {
  nestedItems: PathProps[];
  name: string;
  icon: JSX.Element;
};

type PathProps = {
  path: string;
  name: string;
  visible: boolean;
};

const AppMenuItem = ({ nestedItems, name, icon }: AppMenuItemProps) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  function handleClick() {
    setOpen(!open);
  }

  const renderedNestedItems = nestedItems.map(({ path, name, visible }, index) => {
    if (visible === true) {
      return (
        <ListItem button component={Link} to={path} key={index}>
          <ListItemText inset primary={name} />
        </ListItem>
      );
    }
  });

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon className={classes.iconColor}>{icon}</ListItemIcon>
        <ListItemText primary={name} />
        {open ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          {renderedNestedItems}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default AppMenuItem;
