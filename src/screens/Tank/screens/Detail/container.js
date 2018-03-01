import { connect } from 'react-redux';

import Detail from './Detail';
import { fetchDetail, cleanDetail, deregister } from './data/actionCreators';
import { getInProgress, getErrors, getDetail, getDeregisterErrors, getDeregistered } from './data/selectors';

const mapStateToProp = state => {
  return {
    inProgress: getInProgress(state),
    errors: getErrors(state),
    detail: getDetail(state),
    deregistered: getDeregistered(state),
    deregisterErrors: getDeregisterErrors(state),
  }
}

const mapDispatchToProp = dispatch => {
  return {
    fetchDetail: (id) => fetchDetail(dispatch, id),
    clean: () => cleanDetail(dispatch),
    deregister: (id) => deregister(dispatch, id)
  }
}

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(Detail)