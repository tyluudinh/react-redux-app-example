const localState = state => state.screens.Profile_Setting;

export const getInProgress = state => localState(state)['inProgress'];
export const getErrors = state => localState(state)['errors'];
export const getFetchErrors = state => localState(state)['fetchErrors'];
export const getUpdateErrors = state => localState(state)['updateErrors'];
export const getFetched = state => localState(state)['fetched'];
export const getUpdated = state => localState(state)['updated'];
export const getInfo = state => localState(state)['info'];