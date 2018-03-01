import { connect } from 'react-redux';

import Confirm from './Confirm';

import { getSubmittedId, getInProgress, getErrors, getFields } from '../../data/selectors';
import { createReservation, cleanReservation, resetReservation } from '../../data/actionCreators';

const mapStateToProp = state => {
  return {
    submittedId: getSubmittedId(state),
    inProgress: getInProgress(state),
    errors: getErrors(state),
    fields: getFields(state),
  }
}

const mapDispatchToProp = dispatch => {
  return {
    submit: data => createReservation(dispatch, data),
    clean: () => cleanReservation(dispatch),
    reset: () => resetReservation(dispatch),
  }
}

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(Confirm);