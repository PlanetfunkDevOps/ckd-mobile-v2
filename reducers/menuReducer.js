import { TAP_MENU } from '../actions/types';

const initialState = {
  openMenu: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TAP_MENU:
      return {
        ...state,
        openMenu: !state.openMenu
      };
    default:
      return state;
  }
}
