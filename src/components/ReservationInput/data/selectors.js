const localState = state => state.components.ReservationInput;

export const getInProgress = state => localState(state)['inProgress'];
export const getErrors = state => localState(state)['errors'];
export const getCompleted = state => localState(state)['completed'];
export const getList = state => localState(state)['list'];
export const getFetchedReservations = state => localState(state)['fetchedReservations'];
export const getFetchedReservationsCount = state => localState(state)['fetchedReservationsCount'];