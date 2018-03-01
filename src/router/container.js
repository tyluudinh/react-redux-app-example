import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import router from './router';
import { isAuthenticated } from 'app/data/me/selectors';

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
})

export default withRouter(connect(
  mapStateToProps,
  null,
)(router));