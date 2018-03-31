const localState = state => state.screens.Transaction;

export const getInProgress = state => localState(state)['inProgress'];
export const getFetchErrors = state => localState(state)['fetchErrors'];
export const getFetched = state => localState(state)['fetched'];
export const getList = state => localState(state)['list'];