const localState = state => state.screens.Reservation_Create

export const getInProgress = state => localState(state)['inProgress'];
export const getErrors = state => localState(state)['errors'];
export const getFields = state => localState(state)['fields'];
export const getPassed = state => localState(state)['passed'];
export const getSubmittedId = state => localState(state)['submittedId'];