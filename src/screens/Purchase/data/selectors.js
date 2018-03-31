const localState = state => state.screens.Purchase;

export const getInProgress = state => localState(state)['inProgress'];
export const getErrors = state => localState(state)['errors'];