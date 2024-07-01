import {LinkActions} from '@mxjs/actions';
import {Typography} from 'antd';
import propTypes from 'prop-types';

const {Text} = Typography;
const empty = <Text type="secondary">-</Text>;

const TableActions = ({children, ...props}) => {
  return (
    <LinkActions empty={empty} {...props}>
      {children}
    </LinkActions>
  );
};

TableActions.propTypes = {
  children: propTypes.node,
};

export default TableActions;
