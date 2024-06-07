import {useContext, useEffect, useRef} from 'react';
import {ProTable} from '@ant-design/pro-components';
import appendUrl from 'append-url';
import $ from 'miaoxing';
import curUrl from '@mxjs/cur-url';
import {Typography} from 'antd';
import {withTable, TableContext} from './TableProvider';

const {Text} = Typography;

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

const columnEmptyText = <Text type="secondary">-</Text>;

export default withTable(({url, table, tableApi, tableRef, columns = [], ...restProps}) => {
  const tableContext = useContext(TableContext);

  let querySorter = {};

  const ref = useRef();
  url || (url = curUrl.apiData());

  columns.map((column) => {
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

  return (
    <ProTable
      columns={columns}
      columnEmptyText={columnEmptyText}
      actionRef={ref}
      request={({current: page, pageSize: limit, ...params}, sort) => {
        tableContext.sort = sort;
        return new Promise(resolve => {
          const fullUrl = appendUrl(url, {page, limit, ...getSortPrams(querySorter), ...params, ...table.search});
          $.get(fullUrl).then(({ret}) => {
            if (ret.isErr()) {
              $.ret(ret);
              return;
            }

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
      {...restProps}
    />
  );
});
