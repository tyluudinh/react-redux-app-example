const localState = state => state.screens.Purchase_Fee;

export const getFeeInProgress = state => localState(state)['inProgress'];
export const getFeeErrors = state => localState(state)['errors'];
export const getFee = state => localState(state)['fee'];
export const getFeeFetched = state => localState(state)['fetched'];