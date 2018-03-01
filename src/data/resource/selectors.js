const localState = (state) => state.data.resource;

export const getResource = (state, key) => localState(state)[key]