import {
  RESOURCE_ADD_START,
  RESOURCE_ADD_SUCCESS,
  RESOURCE_ADD_FAIL,
  RESOURCE_FETCH_START,
  RESOURCE_FETCH_SUCCESS,
  RESOURCE_FETCH_FAIL
} from "./actionTypes";

const initialState = {
  type: { fetching: false, list: [] },
  location: { fetching: false, list: [] },
  address: { fetching: false, list: [] },
  gasType: { fetching: false, list: [] },
  loadMedium: { fetching: false, list: [] }
};

const indexOf = (value, list) => {
  console.log(list, value);
  for (let i = 0, len = list.length; i < len; i++) {
    if (value === list[i].value) return i;
  }
}

const replaceResourceItem = (state, action, props) => {
  const { key, value } = action;
  const newList = [...state[key].list];
  const index = indexOf(value, newList);
  const targetItem = newList[index];
  console.log(targetItem, index, props);
  newList[index] = {...targetItem, ...props};
  return newList
}

const transformFetchedLIst = (list) => {
  const transformedList = [];
  for (let i = 0, len = list.length; i < len; i++) {
    const { value } = list[i];
    transformedList.push({
      value,
      label: value,
      serverSync: true,
    });
  }
  return transformedList;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RESOURCE_ADD_START: {
      const { key, value } = action;
      let newList = [
        ...state[key].list,
        { value, label: value, serverSync: false }
      ];
      return {
        ...state,
        ...{
          [key]: {
            ...state[key],
            ...{ fetching: true, list: newList }
          }
        }
      };
    }
    case RESOURCE_ADD_FAIL: {
      const { key, errors } = action;
      return {
        ...state,
        ...{
          [key]: {
            ...state[key],
            ...{ fetching: false, errors }
          }
        }
      }
    }
    case RESOURCE_ADD_SUCCESS: {
      const { key } = action;
      const newList = replaceResourceItem(state, action, {serverSync: true});
      return {
        ...state,
        ...{
          [key]: {
            ...state[key],
            ...{fetching: false, list: newList}
          }
        }
      }
    }
    case RESOURCE_FETCH_START: {
      const { key } = action;
      return {
        ...state,
        ...{
          [key]: {
            ...state[key],
            fetching: true,
          }
        }
      };
    }
    case RESOURCE_FETCH_FAIL: {
      return {
        ...state,
        ...{
          [action.key]: {
            fetching: false,
            errors: action.errors,
          }
        }
      }
    }
    case RESOURCE_FETCH_SUCCESS: {
      return {
        ...state,
        ...{
          [action.key]: {
            fetching: false,
            list: [
              { value: null, label: '', serverSync: true },
              ...transformFetchedLIst(action.list)
            ]
          }
        }
      }
    }
    default:
      return state;
  }
};
