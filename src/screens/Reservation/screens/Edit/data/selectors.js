const localState = (state) => state.screens.Reservation_Edit;

export const getErrors = (state) => localState(state)['errors'];
export const getFetchErrors = (state) => localState(state)['fetchErrors'];
export const getFetched = (state) => localState(state)['fetched'];
export const getInProgress = (state) => localState(state)['inProgress'];
export const getCompleted = (state) => localState(state)['completed'];
export const getPassed = (state) => localState(state)['passed'];
export const getFields = (state) => localState(state)['fields'];
export const getSubmitted = (state) => localState(state)['submitted'];