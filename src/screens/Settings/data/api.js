import { getPrivate, putPrivate } from 'app/services/api';

export const fetchUserListApi = () => {
  return getPrivate('/user/list');
}

export const setUserPermissionApi = (id, permissionRequest) => {
  return putPrivate(`/user/${id}/permission`, { ...permissionRequest })
}