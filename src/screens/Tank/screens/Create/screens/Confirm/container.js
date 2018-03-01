import { connect } from 'react-redux';

import Confirm from './Confirm';
import { cleanTankInfoCreateForm, submitTankCreate, resetTankInfoCreateForm } from '../../data/actionCreators';
import { getFields, getInProgress, getErrors, getSubmitted, getSubmittedId } from '../../data/selectors';

const mapStateToProp = state => {
  return {
    fields: getFields(state),
    inProgress: getInProgress(state),
    errors: getErrors(state),
    submitted: getSubmitted(state),
    submittedId: getSubmittedId(state)
  }
}

const mapDispatchToProp = dispatch => {
  return {
    cleanCreateForm: () => cleanTankInfoCreateForm(dispatch),
    submitTankCreate: (data) => submitTankCreate(dispatch, data),
    resetCreateForm: () => resetTankInfoCreateForm(dispatch),
  }
}

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(Confirm);