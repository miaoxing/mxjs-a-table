import React from 'react';
import PropTypes from 'prop-types';
import {withTable} from './TableProvider';
import {DeleteLink} from '@mxjs/a-button';

class TableDeleteLink extends React.Component {
  static propTypes = {
    table: PropTypes.shape({
      reload: PropTypes.func.isRequired
    }).isRequired
  }

  render() {
    const {table, ...props} = this.props;
    return <DeleteLink {...props} onDelete={table.reload}/>;
  }
}

export default withTable(TableDeleteLink);
