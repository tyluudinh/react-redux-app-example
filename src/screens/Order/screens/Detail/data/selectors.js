const localState = (state) => state.screens.Order_Detail;

export const getInProgress = (state) => localState(state)['inProgress'];
export const getErrors = (state) => localState(state)['errors'];
export const getDetail = (state) => localState(state)['detail'];
export const getTanks = (state) => localState(state)['tanks'];
export const getResevations = (state) => localState(state)['reservations'];
export const getDeletesErrors = (state) => localState(state)['deletesErrors'];
export const getDeleted = (state) => localState(state)['deleted'];