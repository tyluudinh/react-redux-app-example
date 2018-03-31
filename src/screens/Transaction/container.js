import { connect } from 'react-redux';

import Transaction from './Transaction';
import { getList, getFetchErrors, getInProgress, getFetched  } from './data/selectors';
import { getInfo  } from 'app/data/me/selectors';
import { fetchListTransaction, clean } from './data/actionCreators';

const mapStateToProps = state => {
  return {
    inProgress: getInProgress(state),
    fetchErrors: getFetchErrors(state),
    list: getList(state),
    fetched: getFetched(state),
    user: getInfo(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchList: (params) => fetchListTransaction(dispatch, params),
    clean: () => clean(dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transaction);