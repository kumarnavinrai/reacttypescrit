import { useReactOidc } from '@axa-fr/react-oidc-context';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppMenuItem from './AppMenuItem';
import LanguagesDropdown from './LanguagesDropdown';
import {
  AppBar,
  AppContent,
  Drawer,
  GlobalStyle,
  Input,
  MainContent,
  Root,
  Scrollbar,
  Search,
  SearchIconWrapper,
  SidebarFooter,
  SidebarFooterBadge,
  SidebarFooterSubText,
  SidebarFooterText,
  useStyles,
} from './Nav.styles';
import './perfect-scrollbar.css';
import UserDropdown from './UserDropdown';

const navRoutes = [
  {
    path: '/',
    name: 'Home',
    icon: <HomeOutlinedIcon />,
    visible: true,
  },
  {
    path: '/customers',
    name: 'Customers',
    icon: <PeopleAltOutlinedIcon />,
    visible: false,
  },
  {
    path: [
      {
        path: '/lookups',
        name: 'Lookups',
        visible: true,
      },
      {
        path: '/organizations',
        name: 'Organizations',
        visible: true,
      },
      {
        path: '/classifications',
        name: 'Classifications',
        visible: true,
      },
    ],
    name: 'Admin',
    icon: <BuildOutlinedIcon />,
    visible: true,
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: <SettingsOutlinedIcon />,
    visible: false,
  },
];

const Nav = (props: any) => {
  const { window } = props;
  const auth = useReactOidc();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!auth.oidcUser) {
    return null;
  }

  const org = auth.oidcUser.profile.email?.split('@')[1].split('.')[0].toUpperCase();

  const drawer = (
    <>
      <div className={classes.toolbar}>
        <Typography variant="h6">smartShift&nbsp;Modernize</Typography>
      </div>
      <Divider />
      <br />
      <Scrollbar>
        <List>
          {navRoutes.map(({ path, name, icon, visible }, index) => {
            if (typeof path === 'string') {
              if (visible === true) {
                return (
                  <ListItem button key={index} component={Link} to={path}>
                    <ListItemIcon className={classes.iconColor}>{icon}</ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItem>
                );
              }
            } else {
              return <AppMenuItem nestedItems={path} name={name} icon={icon} key={index} />;
            }
          })}
        </List>
      </Scrollbar>
      <SidebarFooter>
        <Grid container spacing={2}>
          <Grid item>
            <SidebarFooterBadge
              overlap="circular"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot"
            >
              <Avatar alt={auth.oidcUser.profile.name} src="/static/img/avatars/avatar-1.jpg" />
            </SidebarFooterBadge>
          </Grid>
          <Grid item>
            <SidebarFooterText variant="body2">{auth.oidcUser.profile.name}</SidebarFooterText>
            <SidebarFooterSubText variant="caption">{org}</SidebarFooterSubText>
          </Grid>
        </Grid>
      </SidebarFooter>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="center">
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid style={{ marginLeft: '260px' }} item>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Input placeholder="Search topics" />
              </Search>
            </Grid>
            <Grid item xs />
            <Grid item>
              <LanguagesDropdown />
              <UserDropdown />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <AppContent>
        <MainContent p={isLgUp ? 5 : 5}>{props.children}</MainContent>
      </AppContent>
    </Root>
  );
};

export default Nav;
