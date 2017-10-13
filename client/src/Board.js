import React, { Component } from 'react'
import axios from 'axios'
import { Button, Colors } from 'react-foundation'
import Cell from './Cell'
import './Board.css'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: this.props.grid,
      generation: 0,
      running: false
    }
    this.nextGen = this.nextGen.bind(this)
    this.toggleCell = this.toggleCell.bind(this)
    this.playPause = this.playPause.bind(this)
    this.reset = this.reset.bind(this)
    this.clear = this.clear.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.grid !== this.state.grid) {
      this.setState({grid: nextProps.grid})
    }
  }

  nextGen() {
    axios.post('http://localhost:8000/nextgen', {
      grid: this.state.grid
    })
    .then(res => {
      this.setState({
        grid: res.data,
        generation: this.state.generation + 1
      })
      if (this.state.running) this.nextGen()
    }) 
  }

  playPause() {
    if (!this.state.running) this.nextGen()
    this.setState({
      running: !this.state.running
    })
  }

  reset() {
    this.props.reset()
  }

  clear() {
    this.props.clear()
  }

  toggleCell(col, row) {
    let len = this.state.grid.length, copy = new Array(len);
    for (let i=0; i<len; ++i) {
      copy[i] = this.state.grid[i].slice(0);
    }
    copy[col][row] = !!copy[col][row] ? 0 : 1;
    this.setState({
      grid: copy
    })
  }

  render() {
    var a = [];
    if (this.props.grid) {
      for (var row=0; row<this.state.grid.length; row++) {
        for (var col=0; col<this.state.grid[0].length; col++) {
          let cell = 
            <Cell
              dim={this.props.cellLength} col={col} row={row}
              key={row + ',' + col}
              fill={this.state.grid[row][col] ? 'white': '#2d2d2d'}
              toggleCell={this.toggleCell}
              />
          a.push(cell);
        }
      }
    }
    
    return (
      <div className="game-container">
        <svg width={this.props.height} height={this.props.height} className="game-board">
          {a}
        </svg>
        <div className="side-bar" style={{width: this.props.height/3}}>
          <p>Generation: {this.state.generation}</p>
          <Button onClick={this.clear} isExpanded color={Colors.PRIMARY}>
            Clear
          </Button>
          <Button onClick={this.reset} isExpanded color={Colors.PRIMARY}>
            Reset
          </Button>
          <Button onClick={this.playPause} isExpanded color={Colors.PRIMARY}>
            {this.state.running ? 'Pause' : 'Play'}
          </Button>
        </div>
      </div>
    )
  }
}

export default Board