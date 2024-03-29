import * as React from 'react';
import PropTypes from 'prop-types';
import deepMerge from 'deepmerge';

export const TableContext = React.createContext({});
const useTable = () => React.useContext(TableContext);

export default class TableProvider extends React.Component {
  static propTypes = {
    render: PropTypes.func,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {
      search: {},
      handleSearch: this.handleSearch,
      /**
       * @experimental
       */
      addSearch: this.addSearch,
      reload: this.reload,
      sort: {},
    };
  }

  handleSearch = (search) => {
    this.setState({search: search}, this.state.reload);
  };

  addSearch = (search) => {
    this.setState({search: deepMerge(this.state.search, search)});
  };

  reload = () => {
  };

  getContent() {
    const {children, render} = this.props;
    if (render) {
      return render(this.state);
    }
    if (typeof children === 'function') {
      return children(this.state);
    }
    return children;
  }

  render() {
    return <TableContext.Provider value={this.state}>{this.getContent()}</TableContext.Provider>;
  }
}

function withTable(Component) {
  return function TableComponent(props) {
    return (
      <TableContext.Consumer>
        {(table) => <Component table={table} {...props} />}
      </TableContext.Consumer>
    );
  };
}

export { withTable, useTable };
