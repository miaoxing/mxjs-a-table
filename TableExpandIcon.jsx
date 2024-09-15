import classNames from 'classnames';
import PropTypes from 'prop-types';

const TableExpandIcon = ({expanded, onExpand}) => {
  const iconPrefix = 'ant-table-row-expand-icon';
  return (
    <>
      <span className="ant-table-row-indent indent-level-0"></span>
      <button
        className={classNames(iconPrefix, {
          [iconPrefix + '-expanded']: expanded,
          [iconPrefix + '-collapsed']: !expanded,
        })}
        onClick={onExpand}
        title={expanded ? '关闭全部行' : '展开全部行'}
      >
      </button>
    </>
  );
};

TableExpandIcon.propTypes = {
  expanded: PropTypes.bool,
  onExpand: PropTypes.func,
};

export default TableExpandIcon;