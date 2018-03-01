import { connect } from 'react-redux';

import DetailForm from './DetailForm';
import { fetchResource, addResource } from 'app/data/resource/actionCreators';
import { getResource } from 'app/data/resource/selectors';
import { getInProgress, getErrors, getDetailPassed, getFields } from '../../data/selectors';
import { cleanOrderCreateForm, validateOrderDetail } from '../../data/actionCreators';
const mapStateToProps = state => {
  return {
    locationResource: getResource(state, 'location'),
    inProgress: getInProgress(state),
    errors: getErrors(state),
    passed: getDetailPassed(state),
    fields: getFields(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResource: key => fetchResource(dispatch, key),
    addResource: (key, value) => addResource(dispatch, { key, value }),
    validate: (data) => validateOrderDetail(dispatch, data),
    clean: () => cleanOrderCreateForm(dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailForm);