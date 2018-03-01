import { connect } from 'react-redux'

import ResetPassword from './ResetPassword';
import { getErrors, getDone, getInProgress } from './data/selectors';
import { resetPassword, clean } from './data/actionCreators';

const mapStateToProps = state => ({
  errors: getErrors(state),
  done: getDone(state),
  inProgress: getInProgress(state),
})

const mapDispatchToProps = dispatch => ({
  reset: (token, password, confirmPassword) => resetPassword(dispatch, token, password, confirmPassword),
  clean: () => clean(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);