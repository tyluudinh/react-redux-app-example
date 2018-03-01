import { connect } from 'react-redux';

import Detail from './Detail';
import { fetchDetail, cleanDetail, fetchTank, deleteReservation } from './data/actionCreators';
import { getInProgress, getErrors, getDetail, getTanks, getDeletesErrors, getDeleted } from './data/selectors';

const mapStateToProp = state => {
  return {
    inProgress: getInProgress(state),
    errors: getErrors(state),
    deletesErrors: getDeletesErrors(state),
    detail: getDetail(state),
    tanks: getTanks(state),
    deleted: getDeleted(state),
  }
}

const mapDispatchToProp = dispatch => {
  return {
    fetchDetail: (id) => fetchDetail(dispatch, id),
    fetchTank: (id) => fetchTank(dispatch, id),
    clean: () => cleanDetail(dispatch),
    deleteReservation: (id) => deleteReservation(dispatch, id),
  }
}

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(Detail)