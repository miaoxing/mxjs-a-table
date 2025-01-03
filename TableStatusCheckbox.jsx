import { useState } from 'react';
import PropTypes from 'prop-types';
import { withTable } from './TableProvider';
import $ from 'miaoxing';
import curUrl from '@mxjs/cur-url';
import { Checkbox } from 'antd';
import { setValue, getValue } from 'rc-field-form/lib/utils/valueUtil';

// 记录 checkbox 状态，以免被外部重置
const store = {};

const getName = (name) => {
  return Array.isArray(name) ? name : [name];
};
const getInitialValue = (row, name) => {
  if (typeof store[row.id] !== 'undefined') {
    return store[row.id];
  }

  let value = getValue(row, getName(name));
  return value === '0' ? false : !!value;
};

const getUrl = (url, rowId) => {
  return url || curUrl.apiItem(rowId);
};

const getMethod = (mode, checked) => {
  if (mode === 'patch') {
    return 'PATCH';
  }
  return checked ? 'DELETE' : 'PUT';
};

const getData = (mode, rowId, name, checked) => {
  if (mode === 'patch') {
    return Object.assign(
      { id: rowId },
      setValue({}, getName(name), checked)
    );
  }
  return {};
};

const StatusCheckbox = ({ mode = 'patch', url, name, row, table }) => {
  const [checked, setChecked] = useState(getInitialValue(row, name));

  const handleChange = (e) => {

    const newChecked = e.target.checked;

    // 更改时，将状态记录起来
    store[row.id] = newChecked;

    setChecked(newChecked);
    $.http({
      url: getUrl(url, row.id),
      method: getMethod(mode, newChecked),
      data: getData(mode, row.id, name, newChecked),
    }).then(({ ret }) => {
      $.ret(ret);

      // 重载数据，加载新的状态
      table.reload();

      // 更改后,删除状态
      delete store[row.id];
    });
  };

  return <Checkbox checked={checked} onChange={handleChange} />;
};

StatusCheckbox.propTypes = {
  mode: PropTypes.oneOf(['patch', 'toggle']),
  url: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  row: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  table: PropTypes.shape({
    reload: PropTypes.func.isRequired,
  }).isRequired,
};

const TableStatusCheckbox = withTable(StatusCheckbox);

export default TableStatusCheckbox;
