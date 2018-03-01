import { connect } from 'react-redux';

import TankInfoInput from './TankInfoInput';

import { getInProgress, getErrors, getCompleted, getList, getFetchedTanks, getFetchedTanksCount } from './data/selectors';
import { searchTank, cleanResult, fetchTank } from './data/actionCreators';
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
    fetchedTanks: getFetchedTanks(state),
    fetchedTanksCount: getFetchedTanksCount(state),
  }
}

const mapDispatchToProp = dispatch => {
  return {
    fetchResource: (key) => fetchResource(dispatch, key),

    search: (data) => searchTank(dispatch, data),
    clean: () => cleanResult(dispatch),
    fetchTank: (id) => fetchTank(dispatch, id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProp,
)(TankInfoInput);