import React from 'react';
import PropTypes from 'prop-types';
import {withTable} from './TableProvider';
import $ from 'miaoxing';
import curUrl from '@mxjs/cur-url';
import {Checkbox} from 'antd';

// 记录checkbox状态，以免被外部重置
const store = {};

export default @withTable class TableStatusCheckbox extends React.Component {
  static propTypes = {
    mode: PropTypes.oneOf(['patch', 'toggle']),
    url: PropTypes.string,
    name: PropTypes.string.isRequired,
    row: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    table: PropTypes.shape({
      reload: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    mode: 'patch',
  }

  state = {
    checked: this.getValue(),
  };

  handleChange = () => {
    const checked = !this.state.checked;

    // 更改时，将状态记录起来
    store[this.props.row.id] = checked;

    this.setState({checked: checked});
    $.http({
      url: this.getUrl(),
      method: this.getMethod(),
      data: this.getData(),
    }).then(ret => {
      $.ret(ret);

      // 重载数据，加载新的状态
      this.props.table.reload();

      // 更改后,删除状态
      delete store[this.props.row.id];
    });
  };

  /**
   * @todo 支持自动生成 delete 地址
   */
  getUrl() {
    return this.props.url || curUrl.apiItem(this.props.row.id);
  }

  getMethod() {
    if (this.props.mode === 'patch') {
      return 'PATCH';
    }
    return this.state.checked ? 'DELETE' : 'PUT';
  };

  getData() {
    if (this.props.mode === 'patch') {
      return {
        id: this.props.row.id,
        [this.props.name]: !this.state.checked,
      };
    }
    return {};
  }

  getValue() {
    // 如果有更改过，显示更改过的状态
    if (typeof store[this.props.row.id] !== 'undefined') {
      return store[this.props.row.id];
    }

    let value = this.props.row[this.props.name];
    // 兼容数据库返回
    return value === '0' ? false : !!value;
  }

  render() {
    return <Checkbox checked={this.state.checked} onChange={this.handleChange}/>;
  }
}
