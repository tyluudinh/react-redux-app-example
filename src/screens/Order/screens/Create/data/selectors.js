const localState = (state) => state.screens.Order_Create;

export const getErrors = (state) => localState(state)['errors'];
export const getInProgress = (state) => localState(state)['inProgress'];
export const getCompleted = (state) => localState(state)['completed'];
export const getDetailPassed = (state) => localState(state)['detailPassed'];
export const getLogisticPassed = (state) => localState(state)['logisticPassed'];
export const getFields = (state) => localState(state)['fields'];
export const getSubmitted = (state) => localState(state)['submitted'];
export const getSubmittedId = (state) => localState(state)['submittedId'];