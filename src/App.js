import React, { Component } from "react";
import "./App.css";
import Grid from "./components/grid";

class App extends Component {
  bounds = { width: 800, height: 600 };

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      toggleButtonText: "Start the Game of Life!",
    };
  }

  render() {
    return (
      <div className="App">
        <h1 className="info">
          Set the initial state by clicking the individual cells
        </h1>
        <div className="center-container">
          <button className="ToggleGame" onClick={this.toggleGame}>
            {this.state.toggleButtonText}
          </button>
        </div>
        <div className="center-container">
          <Grid
            className="Grid"
            ref={(gridRef) => {
              this.gridRef = gridRef;
            }}
            width={this.bounds.width ?? 0}
            height={this.bounds.height ?? 0}
            isPlaying={this.state.isPlaying}
            period={1000}
          />
        </div>
      </div>
    );
  }

  toggleGame = () => {
    const nextToggleButtonText = this.state.isPlaying
      ? "Start the Game of Life!"
      : "Stop the Game of Life!";
    this.setState({
      isPlaying: !this.state.isPlaying,
      toggleButtonText: nextToggleButtonText,
    });
  };
}

export default App;
