import * as types from '../../constants';
import { THEMES } from '../../constants';
import { SetThemeType } from '../actions/themeActions';

export type ThemeInitialStateType = {
  currentTheme: string;
};

const initialState = {
  currentTheme: THEMES.DEFAULT,
};

export default function reducer(state = initialState, actions: ActionTypes): ThemeInitialStateType {
  switch (actions.type) {
    case types.THEME_SET:
      return {
        ...state,
        currentTheme: actions.payload,
      };

    default:
      return state;
  }
}

type ActionTypes = SetThemeType;
