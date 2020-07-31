import React from 'react';
import {withTable} from './TableProvider';
import {DeleteLink} from '@mxjs/a-button';

class TableDeleteLink extends React.Component {
  render() {
    const {table, ...props} = this.props;
    return <DeleteLink {...props} onDelete={table.reload}/>;
  }
}

export default withTable(TableDeleteLink);
