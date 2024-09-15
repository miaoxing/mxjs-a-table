import { useState } from 'react';

const getIds = (data) => {
  let ids = [];
  data.forEach(item => {
    if (item.children) {
      ids.push(item.id);
      ids = ids.concat(getIds(item.children));
    }
  });
  return ids;
};

const useExpand = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const onExpand = (expanded, record) => {
    if (expanded) {
      setExpandedRowKeys(expandedRowKeys.concat(record.id));
    } else {
      setExpandedRowKeys(expandedRowKeys.filter(id => id !== record.id));
    }
  };

  const onExpandAll = () => {
    setExpanded(!expanded);
    setExpandedRowKeys(expanded ? [] : getIds(data));
  };

  return {
    expanded,
    onExpand,
    expandedRowKeys,
    setData,
    onExpandAll,
  };
};

export default useExpand;