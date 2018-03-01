import { connect } from 'react-redux';

import Edit from './Edit';
import { getInProgress, getErrors, getFields, getFetched, getFetchErrors, getSubmitted } from './data/selectors';
import { submitOrderEdit, cleanOrderEdit, fetchOrderEdit } from './data/actionCreators';
import { getResource } from 'app/data/resource/selectors';
import { fetchResource, addResource } from 'app/data/resource/actionCreators';

const mapStateToProp = state => {
  return {
    locationResource: getResource(state, 'location'),
    inProgress: getInProgress(state),
    errors: getErrors(state),
    submitted: getSubmitted(state),
    fields: getFields(state),
    fetched: getFetched(state),
    fetchErrors: getFetchErrors(state),
  }
}

const mapDispatchToProp = dispatch => {
  return {
    submit: data => submitOrderEdit(dispatch, data),
    clean: () => cleanOrderEdit(dispatch),
    fetchFields: (id) => fetchOrderEdit(dispatch, id),
    fetchResource: (key) => fetchResource(dispatch, key),
    addResource: (key, value) => addResource(dispatch, { key, value }),
  }
}

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(Edit);