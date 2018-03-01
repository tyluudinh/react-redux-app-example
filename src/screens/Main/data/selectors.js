const localState = state => state.screens.Main;

export const getInProgress = state => localState(state)['inProgress'];
export const getErrors = state => localState(state)['errors'];
export const getOrders = state => localState(state)['orders'];
export const getReservations = state => localState(state)['reservations'];
export const getTanks = state => localState(state)['tanks'];
export const getFound = state => localState(state)['found'];