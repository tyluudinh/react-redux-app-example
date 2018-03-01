import { getPrivate } from 'app/services/api';

export const fetchLogsApi = (id) =>  {
  return getPrivate(`/tank/${id}/log`);
};
