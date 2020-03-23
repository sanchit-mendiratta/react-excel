import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rows: 4,
      cols: 4,
      data: []
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addColumn = this.addColumn.bind(this);
  }
  componentDidMount() {
    let data = [];
    for (let i = 0; i < this.state.rows; i++) {
      data[i] = new Array(this.state.cols).fill();
    }
    this.setState({ data });
  }
  onValueChange(val, row, col) {
    let data = this.state.data;
    data[row][col] = val;
    this.setState({ data });
  }
  addRow() {
    this.state.data.push(new Array(this.state.cols).fill());
    this.setState({
      rows: ++this.state.rows
    });
  }
  getHeader() {
    let header = [];
    for (let i = 0; i < this.state.cols; i++) {
      header.push(<th>{String.fromCharCode(65 + i)}<button>X</button></th>);
    }
    return header;
  }

  addColumn() {
    this.state.data.forEach(row => {
      row.push(undefined);
    });
    this.setState({
      cols: ++this.state.cols
    });
  }

  render() {
    console.log(this.state.data);
    return (
      <div id="container">
        <div>
          <button onClick={this.addRow}>Add Row</button>
          <button onClick={this.addColumn}>Add Column</button>
        </div>
        <table>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>
            {this.state.data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input
                      value={cell}
                      onChange={e =>
                        this.onValueChange(e.target.value, rowIndex, colIndex)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
