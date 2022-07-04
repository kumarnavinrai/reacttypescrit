import MuiIconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import i18next from 'i18next';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Flag = styled.img`
  border-radius: 50%;
  width: 22px;
  height: 22px;
`;

const LanguagesDropdown = () => {
  const { t } = useTranslation();

  const [anchorMenu, setAnchorMenu] = React.useState<any>(null);

  const toggleMenu = (event: React.SyntheticEvent) => {
    setAnchorMenu(event.currentTarget);
  };

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang).then((t) => {
      closeMenu();
    });
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const getLangImage = () => {
    return '/static/img/flags/' + i18next.language + '.png';
  };

  return (
    <React.Fragment>
      <Tooltip title="Languages">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <Flag src={getLangImage()} alt={i18next.language} />
        </IconButton>
      </Tooltip>
      <Menu id="menu-appbar" anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={closeMenu}>
        <MenuItem onClick={() => changeLanguage('en')}>{t('language.title.en')}</MenuItem>
        <MenuItem onClick={() => changeLanguage('de')}>{t('language.title.de')}</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default LanguagesDropdown;
