import { connect } from 'react-redux';

import Edit from './Edit';
import { getResource } from 'app/data/resource/selectors';
import { fetchResource, addResource } from 'app/data/resource/actionCreators';

import { validateTankInfo, fetchTankEdit, cleanTankEdit } from './data/actionCreators';
import { getErrors, getInProgress, getFields, getFetchErrors, getFetched, getSubmitted } from './data/selectors';

const mapStateToProps = state => {
  return {
    typeResource: getResource(state, 'type'),
    gasTypeResource: getResource(state, 'gasType'),
    locationResource: getResource(state, 'location'),
    loadMediumResource: getResource(state, 'loadMedium'),
    inProgress: getInProgress(state),
    errors: getErrors(state),
    fetchErrors: getFetchErrors(state),
    fetched: getFetched(state),
    fields: getFields(state),
    submitted: getSubmitted(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResource: (key) => fetchResource(dispatch, key),
    addResource: (key, value) => addResource(dispatch, { key, value }),
    validateForm: (data) => validateTankInfo(dispatch, data),
    clean: () => cleanTankEdit(dispatch),
    fetchFields: (id) => fetchTankEdit(dispatch, id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);