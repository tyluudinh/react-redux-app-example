import { store } from 'app/App';
const localState = (state) => state.data.me;

export const isAuthenticated = state => localState(state).authenticated;
export const getErrors = state => localState(state).errors;
export const getInprogress = state => localState(state).inProgress;
export const getInfo = state => localState(state).info;
export const getToken = state => (state) ? localState(state).token : localState(store.getState()).token;
