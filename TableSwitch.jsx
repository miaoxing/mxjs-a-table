import PropTypes from 'prop-types';
import { Switch } from 'antd';
import TableStatusCheckbox from './TableStatusCheckbox';

const TableSwitch = (props) => {
  return <TableStatusCheckbox size="small" {...props} component={Switch} />;
};

TableSwitch.propTypes = {
  mode: PropTypes.oneOf(['patch', 'toggle']),
  url: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  row: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
};

export default TableSwitch;
