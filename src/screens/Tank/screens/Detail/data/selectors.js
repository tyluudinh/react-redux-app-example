const localState = (state) => state.screens.Tank_Detail;

export const getInProgress = (state) => localState(state)['inProgress'];
export const getErrors = (state) => localState(state)['errors'];
export const getDetail = (state) => localState(state)['detail'];
export const getDeregistered = (state) => localState(state)['deregistered'];
export const getDeregisterErrors = (state) => localState(state)['deregisterErrors'];