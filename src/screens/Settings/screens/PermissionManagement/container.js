import { connect } from 'react-redux'

import PermissionManagement from './PermissionManagement';
import { getInProgress, getErrors, getFetched, getList, getFetchErrors } from '../../data/selectors';
import { fetchUserList, clean, setUserPermission } from '../../data/actionCreators';

const mapStateToProps = state => ({
  inProgress: getInProgress(state),
  errors: getErrors(state),
  fetchErrors: getFetchErrors(state),
  fetched: getFetched(state),
  userList: getList(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUserList: () => fetchUserList(dispatch),
  setUserPermission: (acc) => setUserPermission(dispatch, acc),
  clean: () => clean(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PermissionManagement);