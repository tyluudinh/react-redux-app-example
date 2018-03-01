import { connect } from 'react-redux';

import Logout from './Logout';
import { ME_LOGOUT } from 'app/data/me/actionTypes';
import { getErrors, getInprogress } from 'app/data/me/selectors';

const mapStateToProps = state => ({
  inProgress: getInprogress(state),
  errors: getErrors(state),
})

const mapDispatchToProps = dispatch => ({
  logout: (history) => dispatch({ type: ME_LOGOUT, history })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);