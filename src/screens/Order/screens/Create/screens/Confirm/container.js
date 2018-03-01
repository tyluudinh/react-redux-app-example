import { connect } from 'react-redux';

import Confirm from './Confirm';
import { getInProgress, getErrors, getSubmittedId, getFields } from '../../data/selectors';
import { cleanOrderCreateForm, submitOrderCreate, resetOrderCreateForm } from '../../data/actionCreators';
const mapStateToProps = state => {
  return {
    inProgress: getInProgress(state),
    errors: getErrors(state),
    fields: getFields(state),
    submittedId: getSubmittedId(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitOrder: (data) => submitOrderCreate(dispatch, data),
    clean: () => cleanOrderCreateForm(dispatch),
    reset: () => resetOrderCreateForm(dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Confirm);