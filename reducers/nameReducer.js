import { UPDATE_NAME, UPDATE_AVATAR } from '../actions/types';

initialState = {
  userName: 'Usuario Invitado',
  avatar:
    'https://image.shutterstock.com/image-vector/default-avatar-profile-icon-grey-260nw-518740717.jpg'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        userName: action.userName
      };
    case UPDATE_AVATAR:
      return {
        ...state,
        avatar: action.avatar
      };
    default:
      return state;
  }
}
