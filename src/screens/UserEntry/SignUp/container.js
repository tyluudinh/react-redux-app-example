import { connect } from 'react-redux';

import SignupForm from './index';
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
  signUp: (data, history) => dispatch({ type: SIGNUP, data,  history}),
  clean: () => dispatch({ type: SIGNUP_CLEAN })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupForm);