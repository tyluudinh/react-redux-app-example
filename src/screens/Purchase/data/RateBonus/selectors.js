const localState = state => state.screens.Purchase_RatesBonus;

export const getRatesBonusInProgress = state => localState(state)['inProgress'];
export const getRatesBonusErrors = state => localState(state)['errors'];
export const getRates = state => localState(state)['rates'];
export const getBonus = state => localState(state)['bonus'];
export const getRatesBonusFetched = state => localState(state)['fetched'];