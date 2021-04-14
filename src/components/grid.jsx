import React, { Component } from "react";
import "./grid.css";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.cellSize = 10;

    const [rows, columns] = [
      Math.trunc(props.height / this.cellSize),
      Math.trunc(props.width / this.cellSize),
    ];

    const cells = [];

    for (var row = 0; row < rows; row++) {
      cells.push([]);
      for (var column = 0; column < columns; column++) {
        cells[row].push(false);
      }
    }

    this.state = {
      isPlaying: false,
      cells: cells,
    };

    this.handleCellClick = this.handleCellClick.bind(this);
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.state.cells.map((row, rowIndex) => (
          <div key={"row-" + rowIndex} className="row">
            {row.map((cell, columnIndex) => (
              <span
                key={"cell-" + columnIndex}
                className={this.getCellClass(rowIndex, columnIndex)}
                style={{
                  minHeight: this.cellSize,
                  minWidth: this.cellSize,
                }}
                onClick={() => this.handleCellClick(rowIndex, columnIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  componentDidUpdate(prevProps, _) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      if (prevProps.isPlaying === false && this.props.isPlaying === true) {
        this.startPlaying();
      }
      if (prevProps.isPlaying === true && this.props.isPlaying === false) {
        this.stopPlaying();
      }
    }
  }

  startPlaying = () => {
    this.setState({ isPlaying: true });
    this.intervalFunction = setInterval(() => this.tick(), this.props.period);
  };

  stopPlaying = () => {
    this.setState({ isPlaying: false });
    clearInterval(this.intervalFunction);
  };

  tick = () => {
    const { cells } = this.state;
    const newCells = [];
    for (var rowIndex = 0; rowIndex < cells.length; rowIndex++) {
      newCells.push([]);
      for (
        var columnIndex = 0;
        columnIndex < cells[rowIndex].length;
        columnIndex++
      ) {
        newCells[rowIndex].push(this.newCellState(rowIndex, columnIndex));
      }
    }

    console.log(newCells);
    this.setState({ cells: newCells });
  };

  newCellState = (rowIndex, columnIndex) => {
    const isLivingNow = this.state.cells[rowIndex][columnIndex];
    const neighbors = this.getNeighbors(rowIndex, columnIndex);
    const livingNeighborsCount = this.countOccurences(neighbors, true);
    if (isLivingNow) {
      return livingNeighborsCount === 2 || livingNeighborsCount === 3;
    }
    if (!isLivingNow) {
      return livingNeighborsCount === 3;
    }
  };

  getNeighbors = (rowIndex, columnIndex) => {
    const { cells } = this.state;

    return [
      cells[rowIndex - 1]?.[columnIndex - 1] ?? false,
      cells[rowIndex]?.[columnIndex - 1] ?? false,
      cells[rowIndex + 1]?.[columnIndex - 1] ?? false,
      cells[rowIndex - 1]?.[columnIndex] ?? false,
      cells[rowIndex + 1]?.[columnIndex] ?? false,
      cells[rowIndex - 1]?.[columnIndex + 1] ?? false,
      cells[rowIndex]?.[columnIndex + 1] ?? false,
      cells[rowIndex + 1]?.[columnIndex + 1] ?? false,
    ];
  };

  countOccurences = (array, value) =>
    array.reduce((a, v) => (v === value ? a + 1 : a), 0);

  getCellClass = (rowIndex, columnIndex) => {
    const isLiving = this.state.cells[rowIndex][columnIndex];
    return isLiving ? "cell cell-live" : "cell cell-dead";
  };

  handleCellClick(rowIndex, columnIndex) {
    const { cells } = this.state;
    const isLiving = cells[rowIndex][columnIndex];
    const nextCellsState = [...cells];
    nextCellsState[rowIndex][columnIndex] = !isLiving;
    this.setState({
      cells: nextCellsState,
    });
  }
}

export default Grid;
