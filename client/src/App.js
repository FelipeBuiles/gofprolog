import React, { Component } from 'react'
import Board from './Board'
import './App.css'
class App extends Component {
  constructor(props) {
    super(props)
    let cols = 50
    let rows = 50

    let height = window.innerHeight
    let cellLength = height / rows

    this.state = {
      height,
      cellLength,
      rows,
      cols
    }

    this.clearBoard = this.clearBoard.bind(this)
    this.setNewBoard = this.setNewBoard.bind(this)
  }

  componentWillMount() {
    this.setNewBoard()
  }

  clearBoard() {
    let grid = []
    for (let i = 0; i<this.state.rows; i++) {
      grid.push(new Array(this.state.rows).fill(0))
    }
    this.setState({
      grid
    })
  }

  setNewBoard() {
    let grid = []
    for (let i = 0; i<this.state.rows; i++) {
      let row = []
      for (let j = 0; j<this.state.cols; j++) {
        row.push(Math.round(Math.random()*0.7))
      }
      grid.push(row)
    }
    this.setState({
      grid
    })
  }

  render() {
    return (
      <Board grid={this.state.grid}
            height={this.state.height}
            reset={this.setNewBoard}
            clear={this.clearBoard}
            cellLength={this.state.cellLength}></Board>
    )
  }
}

export default App
