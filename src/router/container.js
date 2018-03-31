import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import router from './router';
import { isAuthenticated, getInfo } from 'app/data/me/selectors';
import { ME_LOGIN_RESET } from 'app/data/me/actionTypes'

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  userLogged: getInfo(state),
});
const mapDispatchToProps = dispatch => {
  return {
    clearToken: () => dispatch({ type: ME_LOGIN_RESET })
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(router));