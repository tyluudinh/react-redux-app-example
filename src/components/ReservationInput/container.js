import { connect } from 'react-redux';

import ReservationInput from './ReservationInput';

import { getInProgress, getErrors, getCompleted, getList, getFetchedReservations, getFetchedReservationsCount } from './data/selectors';
import { searchReservation, cleanResult, fetchReservation } from './data/actionCreators';
import { getResource } from 'app/data/resource/selectors';
import { fetchResource } from 'app/data/resource/actionCreators';

const mapStateToProps = state => {
  return {
    gasTypeResource: getResource(state, 'gasType'),
    locationResource: getResource(state, 'location'),

    inProgress: getInProgress(state),
    errors: getErrors(state),
    completed: getCompleted(state),
    list: getList(state),
    fetchedReservations: getFetchedReservations(state),
    fetchedReservationsCount: getFetchedReservationsCount(state),
  }
}

const mapDispatchToProp = dispatch => {
  return {
    fetchResource: (key) => fetchResource(dispatch, key),

    search: (data) => searchReservation(dispatch, data),
    clean: () => cleanResult(dispatch),
    fetchReservation: (id) => fetchReservation(dispatch, id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProp,
)(ReservationInput);