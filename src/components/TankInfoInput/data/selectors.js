const localState = state => state.components.TankInfoInput;

export const getInProgress = state => localState(state)['inProgress'];
export const getErrors = state => localState(state)['errors'];
export const getCompleted = state => localState(state)['completed'];
export const getList = state => localState(state)['list'];
export const getFetchedTanks = state => localState(state)['fetchedTanks'];
export const getFetchedTanksCount = state => localState(state)['fetchedTanksCount'];