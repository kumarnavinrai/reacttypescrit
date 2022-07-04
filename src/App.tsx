import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/styled-engine-sc';
import { ThemeProvider as MuiThemeProvider } from '@mui/styles';
import jssPreset from '@mui/styles/jssPreset';
import StylesProvider from '@mui/styles/StylesProvider';
import { create } from 'jss';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/macro';
import AuthProvider from './components/auth/AuthProvider';
import Notification from './components/notification/Notification';
import { NotificationContainer } from './components/notification/Notification.context';
import './i18n/config';
import { AppStateType } from './redux/reducers';
import Routes from './routes';
import createTheme from './theme';

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point')!,
});

const App = () => {
  const theme = useSelector((state: AppStateType) => state.themeReducer);
  return (
    <AuthProvider>
      <CssBaseline />
      <StylesProvider jss={jss}>
        <LocalizationProvider dateAdapter={AdapterDateFns as any}>
          <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={createTheme(theme.currentTheme)}>
              <ThemeProvider theme={createTheme(theme.currentTheme)}>
                <NotificationContainer>
                  <Routes />
                  <Notification />
                </NotificationContainer>
              </ThemeProvider>
            </MuiThemeProvider>
          </StyledEngineProvider>
        </LocalizationProvider>
      </StylesProvider>
    </AuthProvider>
  );
};

export default App;
