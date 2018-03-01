import { connect } from 'react-redux';

import SigninForm from './SigninForm';
import { ME_LOGIN, ME_LOGIN_RESET } from 'app/data/me/actionTypes';
import { getErrors, getInprogress } from 'app/data/me/selectors';

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch({ type: ME_LOGIN, email, password }),
  reset: () => dispatch({ type: ME_LOGIN_RESET })
});

const mapStateToProps = state => ({
  errors: getErrors(state),
  inProgress: getInprogress(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SigninForm);