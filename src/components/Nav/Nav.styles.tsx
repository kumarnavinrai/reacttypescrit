import MuiAppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import MuiDrawer from '@mui/material/Drawer';
import InputBase from '@mui/material/InputBase';
import MuiPaper from '@mui/material/Paper';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { createStyles, makeStyles } from '@mui/styles';
import { spacing } from '@mui/system';
import { darken } from 'polished';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled, { createGlobalStyle } from 'styled-components/macro';
import { GlobalStyleProps } from '../../types/styles';

const drawerWidth = 225;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
      backgroundColor: '#102A3E',
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    title: {
      flexGrow: 1,
    },
    // necessary for content to be below app bar
    toolbar: {
      ...theme.mixins.toolbar,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    drawerPaper: {
      width: drawerWidth,
      color: '#EEEEEE',
      backgroundColor: '#233044',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    divider: {
      background: theme.palette.divider,
    },
    iconColor: {
      color: '#EEEEEE',
    },
  })
);

export const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up('md')} {
    display: block;
  }
`;

export const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(2.5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    width: 160px;
  }
`;

export const Paper = styled(MuiPaper)(spacing);
export const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};
  padding-top: 80px;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html,
  body,
  #root {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
    margin: 0;
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

export const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

export const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

export const SidebarFooter = styled.div`
  background-color: ${(props) => props.theme.sidebar.footer.background} !important;
  padding: ${(props) => props.theme.spacing(2.75)} ${(props) => props.theme.spacing(4)};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

export const SidebarFooterBadge = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)};
  span {
    background-color: ${(props) => props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;

export const SidebarFooterText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
`;

export const SidebarFooterSubText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
  font-size: 0.7rem;
  display: block;
  padding: 1px;
`;

export const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;
