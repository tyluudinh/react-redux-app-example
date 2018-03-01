import { connect } from 'react-redux';

import CreateForm from './CreateForm';
import { getResource } from 'app/data/resource/selectors';
import { fetchResource, addResource } from 'app/data/resource/actionCreators';

import { validateTankInfo, cleanTankInfoCreateForm } from '../../data/actionCreators';
import { getErrors, getInProgress, getPassed, getFields } from '../../data/selectors';

const mapStateToProps = state => {
  return {
    gasTypeResource: getResource(state, 'gasType'),
    locationResource: getResource(state, 'location'),
    loadMediumResource: getResource(state, 'loadMedium'),
    inProgress: getInProgress(state),
    errors: getErrors(state),
    passed: getPassed(state),
    fields: getFields(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResource: (key) => fetchResource(dispatch, key),
    addResource: (key, value) => addResource(dispatch, { key, value }),
    validateForm: (data) => validateTankInfo(dispatch, data),
    clean: () => cleanTankInfoCreateForm(dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm);