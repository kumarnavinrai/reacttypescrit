import { AuthenticationProvider, getUserManager, oidcLog, OidcSecure } from '@axa-fr/react-oidc-context';
import { InMemoryWebStorage, UserManagerSettings } from 'oidc-client';
import * as React from 'react';
import ApiClient from '../../api/apiClient';
import logger from '../../common/utils/logger';

interface AuthProviderProps {
  children?: React.ReactNode;
}

const NotAuthenticated = () => <span>Not authenticated</span>;

const Authenticating = () => <span>Authenticating ....</span>;

const AuthenicationDone = () => <span>Authentication successful. Loading the application..</span>;

const AuthProvider = (props: AuthProviderProps) => {
  const [oidcConfig, setOidcConfig] = React.useState<UserManagerSettings | undefined>();
  const [loading, setLoading] = React.useState(true);
  const [expired, setExpired] = React.useState(false);

  const getOidcConfig = async (): Promise<UserManagerSettings> => {
    const response = await fetch('/oidc-config');
    return response.json();
  };

  React.useEffect(() => {
    if (loading) {
      getOidcConfig().then((config) => {
        setOidcConfig(config);
        setLoading(false);
      });
    }
  }, [loading]);

  const logoutAndLogin = () => {
    const usermanager = getUserManager();
    usermanager?.signoutRedirect();
  };

  return loading ? (
    <div>Loading</div>
  ) : expired ? (
    <>
      <h1>Expired</h1>
      <button onClick={logoutAndLogin}>Login again</button>
    </>
  ) : (
    <AuthenticationProvider
      configuration={oidcConfig}
      loggerLevel={oidcLog.DEBUG}
      isEnabled={true}
      UserStore={InMemoryWebStorage}
      authenticating={Authenticating}
      notAuthenticated={NotAuthenticated}
      callbackComponentOverride={AuthenicationDone}
      customEvents={{
        onUserLoaded: (user) => {
          // updating header of the axios modernize instance
          ApiClient.defaults.headers['Authorization'] = 'Bearer ' + user.access_token;
        },
        onUserUnloaded: () => logger.debug('onUserUnloaded'),
        onSilentRenewError: (error) => {
          setExpired(true);
        },
        onUserSignedOut: () => logger.debug('onUserSignedOut'),
        onUserSessionChanged: () => logger.debug('onUserSessionChanged'),
        onAccessTokenExpiring: () => logger.debug('onAccessTokenExpiring'),
        onAccessTokenExpired: () => logger.debug('onAccessTokenExpired'),
      }}
    >
      <OidcSecure>{props.children}</OidcSecure>
    </AuthenticationProvider>
  );
};

export default AuthProvider;
