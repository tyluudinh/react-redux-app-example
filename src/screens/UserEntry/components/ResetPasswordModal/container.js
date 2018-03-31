import { connect } from 'react-redux';

import ResetPasswordPopup from './ResetPasswordModal';
import { RESET_PASSWORD, RESET_PASSWORD_CLEAN } from './data/actionTypes';
import { getErrors, getCompleted, getInProgress } from './data/selectors';

const mapStateToProps = state => {
  return {
    errors: getErrors(state),
    inProgress: getInProgress(state),
    completed: getCompleted(state),
  }
};

const mapDispatchToProps = dispatch => ({
  submit: (data) => dispatch({ type: RESET_PASSWORD, data}),
  clean: () => dispatch({ type: RESET_PASSWORD_CLEAN })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(ResetPasswordPopup);