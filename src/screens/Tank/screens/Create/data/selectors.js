const localState = (state) => state.screens.Tank_Create;

export const getErrors = (state) => localState(state)['errors'];
export const getInProgress = (state) => localState(state)['inProgress'];
export const getCompleted = (state) => localState(state)['completed'];
export const getPassed = (state) => localState(state)['passed'];
export const getFields = (state) => localState(state)['fields'];
export const getSubmitted = (state) => localState(state)['submitted'];
export const getSubmittedId = (state) => localState(state)['submittedId'];