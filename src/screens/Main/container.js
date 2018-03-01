import { connect } from 'react-redux';

import Main from './Main';
import { getInProgress, getErrors, getOrders, getReservations, getTanks, getFound } from './data/selectors';
import { searchAll, clean } from './data/actionCreators';

const mapStateToProps = state => {
  return {
    inProgress: getInProgress(state),
    errors: getErrors(state),
    reservations: getReservations(state),
    tanks: getTanks(state),
    orders: getOrders(state),
    found: getFound(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: (keyword, options) => searchAll(dispatch, keyword, options),
    clean: () => clean(dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);