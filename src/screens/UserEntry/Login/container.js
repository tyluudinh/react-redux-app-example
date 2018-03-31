import { connect } from 'react-redux';

import LoginScreen from './index';

import { ME_LOGIN, ME_LOGIN_RESET, ME_LOGIN_SOCIAL } from 'app/data/me/actionTypes';
import { getErrors, getInprogress } from 'app/data/me/selectors';

const mapDispatchToProps = dispatch => ({
  login: (username, password, urlType) => dispatch({ type: ME_LOGIN, username, password, urlType }),
  loginSocial: (accessToken, provider) => dispatch({type: ME_LOGIN_SOCIAL, accessToken, provider}),
  reset: () => dispatch({ type: ME_LOGIN_RESET })
});

const mapStateToProps = state => ({
  errors: getErrors(state),
  inProgress: getInprogress(state),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);