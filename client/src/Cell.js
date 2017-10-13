import React, { Component } from 'react'

class Cell extends Component {
  constructor(props) {
    super(props)
    this.handleCellClicked = this.handleCellClicked.bind(this)
  } 

  handleCellClicked = () => {
    this.props.toggleCell(this.props.row, this.props.col)
  }

  render() {
    let dim = this.props.dim
    return (
      <rect
        stroke='#000' strokeWidth='1' 
        width={dim} height={dim} fill={this.props.fill}
        x={dim*this.props.col} y={dim*this.props.row}
        onClick={this.handleCellClicked}
        >
      </rect>
    )
  }
}

export default Cell