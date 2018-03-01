const localState = state => state.screens.Tank_Logs

export const getInProgress = state => localState(state)['inProgress'];
export const getErrors = state => localState(state)['errors'];
export const getData = state => localState(state)['data'];