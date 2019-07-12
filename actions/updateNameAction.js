import { UPDATE_NAME, UPDATE_AVATAR } from './types';

export const updateName = userName => {
  return {
    type: UPDATE_NAME,
    userName: userName
  };
};

export const updateAvatar = avatar => {
  return {
    type: UPDATE_AVATAR,
    avatar: avatar
  };
};
