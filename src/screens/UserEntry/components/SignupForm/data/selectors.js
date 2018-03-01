const getLocalState = (state) => state.screens.UserEntry_SignupForm;

export const getErrors = (state) => getLocalState(state)['errors'];
export const getCompleted = (state) => getLocalState(state)['completed'];
export const getInProgress = (state) => getLocalState(state)['inProgress'];