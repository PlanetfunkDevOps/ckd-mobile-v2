import { OPEN_LOGIN } from '../actions/types';

const initialState = {
  loginModal: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_LOGIN:
      return {
        ...state,
        loginModal: !state.loginModal
      };
    default:
      return state;
  }
}
