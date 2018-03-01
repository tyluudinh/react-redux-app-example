import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import DownArrow from 'react-icons/lib/fa/angle-down';
import UpArrow from 'react-icons/lib/fa/angle-up';

import 'react-table/react-table.css';
import './Table.css';

export const attachArrows = (title) => {
  return (
    <span>
      {title}
      <DownArrow className="down-arrow" size={16} />
      <UpArrow className="up-arrow" size={16} />
    </span>
  )
}


export default class Table extends Component {
  render() {
    const { data, columns, pageSize, ...rest } = this.props;
    return (
      <ReactTable
        data={data}
        columns={columns}
        pageSize={pageSize}
        noDataText="Not found!"
        showPageJump={false}
        showPagination={false}
        {...rest}
      />
    )
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  pageSize: PropTypes.number,
}