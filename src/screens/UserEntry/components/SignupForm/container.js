import { connect } from 'react-redux';

import SignupForm from './SignupForm';
import { SIGNUP, SIGNUP_CLEAN } from './data/actionTypes';
import { getErrors, getCompleted, getInProgress } from './data/selectors';

const mapStateToProps = state => {
  return {
    errors: getErrors(state),
    completed: getCompleted(state),
    inProgress: getInProgress(state),
  }
};

const mapDispatchToProps = dispatch => ({
  signup: (userInfo) => dispatch({ type: SIGNUP, userInfo }),
  clean: () => dispatch({ type: SIGNUP_CLEAN })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupForm);