import { connect } from 'react-redux';

import CreateAdminUser from './CreateAdminUser';
import { getInProgress, getErrors, getSubmitted, getFields, getPassed } from './data/selectors';
import { submitAdminCreate, cleanAdminCreate, validateAdminCreate } from './data/actionCreators';

const mapStateToProps = state => {
  return {
    inProgress: getInProgress(state),
    errors: getErrors(state),
    submitted: getSubmitted(state),
    passed: getPassed(state),
    fields: getFields(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submit: (data) => submitAdminCreate(dispatch, data),
    validate: (data) => validateAdminCreate(dispatch, data),
    clean: () => cleanAdminCreate(dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAdminUser);