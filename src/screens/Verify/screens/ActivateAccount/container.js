import { connect } from 'react-redux'

import ActivateAccount from './ActivateAccount';
import { getErrors, getDone, getInProgress } from './data/selectors';
import { activateAccount, clean } from './data/actionCreators';

const mapStateToProps = state => ({
  errors: getErrors(state),
  done: getDone(state),
  inProgress: getInProgress(state),
})

const mapDispatchToProps = dispatch => ({
  activate: token => activateAccount(dispatch, token),
  clean: () => clean(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivateAccount);