import React, {useEffect, useRef} from 'react';
import ProTable from '@ant-design/pro-table';
import appendUrl from 'append-url';
import $ from 'miaoxing';
import curUrl from '@mxjs/cur-url';
import {withTable} from './TableProvider';

const getSortPrams = (querySorter) => {
  // 取消排序后，field 是点击的字段，order 是 undefined
  // 因此判断 order 无值则无需排序
  if (!querySorter.order) {
    return {};
  }

  let {field: sort, order} = querySorter;
  order = order === 'ascend' ? 'asc' : 'desc';

  return {sort, order};
};

const defaultRenderer = (value) => {
  if (typeof value === 'undefined' || value === '' || value === null) {
    return <span className="text-muted">-</span>;
  } else {
    return value;
  }
};

export default withTable(({url, table, tableApi, tableRef, columns = [], ...restProps}) => {
  let querySorter = {};

  const ref = useRef();
  url || (url = curUrl.apiData());

  columns.map((column) => {
    if (typeof column.dataIndex === 'undefined') {
      column.dataIndex = column.title;
    }
    if (typeof column.render === 'undefined') {
      column.render = defaultRenderer;
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

  return (
    <ProTable
      columns={columns}
      actionRef={ref}
      request={({current: page, pageSize: limit, ...params}) => {
        return new Promise(resolve => {
          const fullUrl = appendUrl(url, {page, limit, ...getSortPrams(querySorter), ...params, ...table.search});
          $.get(fullUrl).then(({ret}) => {
            resolve(ret);
          });
        });
      }}
      onRequestError={e => {
        throw e;
      }}
      options={false}
      search={false}
      rowKey="id"
      toolBarRender={false}
      onChange={(pagination, filters, sorter) => {
        querySorter = sorter;
        ref.current.reload();
      }}
      loading={false}
      {...restProps}
    />
  );
});

