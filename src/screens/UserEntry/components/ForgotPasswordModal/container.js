import { connect } from 'react-redux';

import ForgotPasswordPopup from './ForgotPasswordModal';
import { FORGOT_PASSWORD, FORGOT_PASSWORD_CLEAN } from './data/actionTypes';
import { getErrors, getCompleted, getInProgress } from './data/selectors';

const mapStateToProps = state => {
  return {
    errors: getErrors(state),
    inProgress: getInProgress(state),
    completed: getCompleted(state),
  }
};

const mapDispatchToProps = dispatch => ({
  submitEmail: (data) => dispatch({ type: FORGOT_PASSWORD, data}),
  clean: () => dispatch({ type: FORGOT_PASSWORD_CLEAN })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(ForgotPasswordPopup);