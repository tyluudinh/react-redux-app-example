import { connect } from 'react-redux';

import { getInProgress, getErrors, getData } from './data/selectors';
import { fetchLogs } from './data/actionCreators';

import Logs from './Logs';

const mapStateToProps = state => {
  console.log('get inprogress', getInProgress(state));
  return {
    inProgress: getInProgress(state),
    errors: getErrors(state),
    data: getData(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLogs: id => fetchLogs(dispatch, id)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logs)