import { connect } from 'react-redux'

import AccountManagement from './AccountManagement';
import { getInProgress, getErrors, getFetched, getList, getFetchErrors } from '../../data/selectors';
import { fetchUserList, clean } from '../../data/actionCreators';
import { getInfo } from 'app/data/me/selectors';

const mapStateToProps = state => ({
  inProgress: getInProgress(state),
  errors: getErrors(state),
  fetchErrors: getFetchErrors(state),
  fetched: getFetched(state),
  userList: getList(state),
  me: getInfo(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUserList: () => fetchUserList(dispatch),
  clean: () => clean(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountManagement);