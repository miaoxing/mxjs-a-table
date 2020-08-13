import React from "react";
import PropTypes from 'prop-types';

const TableContext = React.createContext({});

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
      reload: this.reload,
    };
  }

  handleSearch = (search) => {
    this.setState({search: search}, this.state.reload);
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
    return <TableContext.Provider value={this.state}>{this.getContent()}</TableContext.Provider>
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

export {withTable};
