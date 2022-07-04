import { useReactOidc } from '@axa-fr/react-oidc-context';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import MuiIconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function UserDropdown() {
  const auth = useReactOidc();
  const [anchorMenu, setAnchorMenu] = React.useState<any>(null);
  const history = useHistory();
  const { t } = useTranslation();

  const toggleMenu = (event: React.SyntheticEvent) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    await auth.logout();
    history.push('/');
  };

  return (
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <PowerSettingsNewIcon />
        </IconButton>
      </Tooltip>
      <Menu id="menu-appbar" anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={closeMenu}>
        <MenuItem onClick={closeMenu}>{t('profile')}</MenuItem>
        <MenuItem onClick={handleSignOut}>{t('signout')}</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default UserDropdown;
