import PropTypes from 'prop-types';
import {withTable} from './TableProvider';
import {DeleteLink} from '@mxjs/a-button';

const TableDeleteLink = ({table, ...props}) => {
  return <DeleteLink {...props} onDelete={table.reload}/>;
};

TableDeleteLink.propTypes = {
  table: PropTypes.shape({
    reload: PropTypes.func.isRequired,
  }).isRequired,
};

export default withTable(TableDeleteLink);
