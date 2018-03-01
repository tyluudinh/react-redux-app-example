import { connect } from 'react-redux';

import CreateForm from './CreateForm';
import { getInProgress, getErrors, getPassed, getFields } from '../../data/selectors';
import { validateReservation, cleanReservation } from '../../data/actionCreators';
import { getResource } from 'app/data/resource/selectors';
import { fetchResource, addResource } from 'app/data/resource/actionCreators';

const mapStateToProp = state => {
  return {
    locationResource: getResource(state, 'location'),
    inProgress: getInProgress(state),
    errors: getErrors(state),
    passed: getPassed(state),
    fields: getFields(state),
  }
}

const mapDispatchToProp = dispatch => {
  return {
    validate: data => validateReservation(dispatch, data),
    clean: () => cleanReservation(dispatch),
    fetchResource: (key) => fetchResource(dispatch, key),
    addResource: (key, value) => addResource(dispatch, { key, value }),
  }
}

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(CreateForm);