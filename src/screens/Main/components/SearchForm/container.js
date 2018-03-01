import { connect } from 'react-redux'

import SearchForm from './SearchForm';
import { getResource } from 'app/data/resource/selectors';
import { fetchResource } from 'app/data/resource/actionCreators';

const mapStateToProps = state => {
  return {
    locationResource: getResource(state, 'location')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResource: (key) => fetchResource(dispatch, key)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);