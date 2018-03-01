const localState = state => state.screens.Setting_CreateAdminUser;

export const getInProgress = state => localState(state)['inProgress'];
export const getErrors = state => localState(state)['errors'];
export const getSubmitted = state => localState(state)['submitted'];
export const getPassed = state => localState(state)['passed'];
export const getFields = state => localState(state)['fields'];