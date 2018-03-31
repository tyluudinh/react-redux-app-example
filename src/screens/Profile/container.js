import { connect } from 'react-redux';

import Profile from './Profile';
import { getInfo, getFetchErrors, getInProgress, getFetched, getUpdated, getUpdateErrors } from './data/selectors';
import { fetchProfile, clean, updateProfile } from './data/actionCreators';

const mapStateToProps = state => {
  return {
    inProgress: getInProgress(state),
    fetchErrors: getFetchErrors(state),
    info: getInfo(state),
    fetched: getFetched(state),
    updated: getUpdated(state),
    updateErrors: getUpdateErrors(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: () => fetchProfile(dispatch),
    updateProfile: (data) => updateProfile(dispatch, data),
    clean: () => clean(dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);