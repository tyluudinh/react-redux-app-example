const localState = state => state.screens.Settings;

export const getInProgress = state => localState(state)['inProgress'];
export const getErrors = state => localState(state)['errors'];
export const getFetchErrors = state => localState(state)['fetchErrors'];
export const getPermissionsErrors = state => localState(state)['permissionsErrors'];
export const getFetched = state => localState(state)['fetched'];
export const getList = state => localState(state)['list'];