import { useEffect, useRef, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import appendUrl from 'append-url';
import $ from 'miaoxing';
import curUrl from '@mxjs/cur-url';
import { Typography } from 'antd';
import { useTable } from './TableProvider';
import PropTypes from 'prop-types';

const LOADING_DELAY = 300;

const { Text } = Typography;

const getSortPrams = (querySorter) => {
  // 取消排序后，field 是点击的字段，order 是 undefined
  // 因此判断 order 无值则无需排序
  if (!querySorter.order) {
    return {};
  }

  let { field: sort, order } = querySorter;
  order = order === 'ascend' ? 'asc' : 'desc';

  return { sort, order };
};

const columnEmptyText = <Text type="secondary">-</Text>;

const Table = (
  { url, tableApi, tableRef, columns = [], postData, ...restProps }
) => {
  const table = useTable();

  let querySorter = {};

  const ref = useRef();
  url || (url = curUrl.apiData());

  // 默认不显示搜索，列设置了搜索才开启搜索
  let search = false;
  columns.map((column) => {
    column.search = column.search || false;
    if (column.search) {
      search = true;
    }

    if (typeof column.dataIndex === 'undefined') {
      column.dataIndex = column.title;
    }
  });

  useEffect(() => {
    if (table) {
      table.reload = ref.current.reload;
    }

    if (tableRef) {
      tableRef.current = table;
    }

    if (tableApi) {
      tableApi.hook(table);
    }
  }, []);

  const [ready, setReady] = useState(false);
  const handleRequest = async ({ current: page, pageSize: limit, ...params }, sort) => {
    table.sort = sort;

    const fullUrl = appendUrl(url, { page, limit, ...getSortPrams(querySorter), ...params, ...table.search });
    const { ret } = await $.get(fullUrl);
    if (ret.isErr()) {
      $.ret(ret);
      return;
    }

    return {
      data: ret.data,
      success: ret.isSuc(),
      total: ret.total,
    };
  };

  return (
    <ProTable
      postData={(data) => {
        setReady(true);
        return postData ? postData(data) : data;
      }}
      style={{ display: ready ? '' : 'none' }}
      columns={columns}
      columnEmptyText={columnEmptyText}
      actionRef={ref}
      request={handleRequest}
      options={false}
      search={search}
      rowKey="id"
      loading={{
          delay: LOADING_DELAY,
        }}
      onChange={(pagination, filters, sorter) => {
        querySorter = sorter;
        ref.current.reload();
      }}
      toolBarRender={() => {
        return ' ';
      }}
      cardBordered
      cardProps={{
        style: {
          marginBottom: 24,
        },
      }}
      {...restProps}
    />
  );
};

Table.propTypes = {
  url: PropTypes.string,
  tableApi: PropTypes.object,
  tableRef: PropTypes.object,
  columns: PropTypes.array,
  postData: PropTypes.func,
  /**
   * @experimental
   */
  result: PropTypes.oneOfType([PropTypes.object,  PropTypes.array]),
};

export default Table;
