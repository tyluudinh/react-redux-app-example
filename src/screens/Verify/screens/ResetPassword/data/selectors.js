const localState = state => state.screens.Verify_ResetPassword

export const getInProgress = state => localState(state)['inProgress'];
export const getErrors = state => localState(state)['errors'];
export const getDone = state => localState(state)['done'];