import { connect } from 'react-redux';

import Detail from './Detail';
import { fetchDetail, cleanDetail, fetchTank, deleteOrder, fetchReservation, completeOrder } from './data/actionCreators';
import { getInProgress, getErrors, getDetail, getTanks, getResevations, getDeletesErrors, getDeleted } from './data/selectors';

const mapStateToProp = state => {
  return {
    inProgress: getInProgress(state),
    errors: getErrors(state),
    deletesErrors: getDeletesErrors(state),
    detail: getDetail(state),
    tanks: getTanks(state),
    reservations: getResevations(state),
    deleted: getDeleted(state),
  }
}

const mapDispatchToProp = dispatch => {
  return {
    fetchDetail: (id) => fetchDetail(dispatch, id),
    fetchTank: (id) => fetchTank(dispatch, id),
    fetchReservation: (id) => fetchReservation(dispatch, id),
    clean: () => cleanDetail(dispatch),
    deleteOrder: (id) => deleteOrder(dispatch, id),
    completeOrder: (id) => completeOrder(dispatch, id),
  }
}

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(Detail)