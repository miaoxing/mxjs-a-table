import { Tabs } from 'antd';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import { useTable } from './TableProvider';
import setValue from 'set-value';

const getItems = ({items, labelKey, valueKey, all}) => {
  const newItems = [];

  if (all) {
    newItems.push({
      key: '',
      label: '全部',
    });
  }

  map(items, (item, key) => {
    if (typeof item === 'object') {
      newItems.push({
        key: item[valueKey],
        label: item[labelKey],
      });
    } else {
      newItems.push({
        key: key,
        label: item,
      });
    }
  });

  return newItems;
};

const TableTabs = ({name = ['search', 'status'], defaultActiveKey = '', items, labelKey, valueKey, all}) => {
  const activeKey = defaultActiveKey;
  const table = useTable();

  const handleChange = (activeKey) => {
    table.addSearch(setValue({}, name, activeKey));
    table.reload();
  };

  return (
    <Tabs
      defaultActiveKey={activeKey} tabBarStyle={{marginBottom: 24}} onChange={handleChange}
      items={getItems({items, labelKey, valueKey, all})}
    />
  );
};

TableTabs.defaultProps = {
  labelKey: 'label',
  valueKey: 'value',
};

TableTabs.propTypes = {
  defaultActiveKey: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  all: PropTypes.bool,
};

export default TableTabs;
