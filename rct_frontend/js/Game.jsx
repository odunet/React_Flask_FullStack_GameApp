//OFFICIAL REACT TUTORIAL

//React Class
import React from "react";
//Import CSS
import './../css/App.css';

// //Square class, this is used in this module
// class Square extends React.Component {
//   // constructor(props){
//   //   super(props);
//   //   this.state = {
//   //     value: null,
//   //   };
//   // }
//     render() {
//       return (
//         <button  className="square" onClick={()=> this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }

//Square function, this is used in this module
function Square (props) {
      return (
        <button  className="square" onClick={()=> props.onClick()} >
          {props.value}
        </button>
      );
}

//Check winnner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//Board class this is used in this module
class Board extends React.Component {
    renderSquare(i) {
      return <Square value={this.props.squares[i]}
                    onClick = {()=>this.props.onClick(i)}/>;
    }
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }

//Main game class. This will be exported
export default class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history:[
          {squares: Array(9).fill(null)}],
          stepNumber: 0,
          isNext: true
      };
    }
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.isNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        isNext: !this.state.isNext,
      });
    }
    jumpTo(step){
      this.setState({
        stepNumber: step,
        isNext: (step % 2) === 0,
      })
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.isNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-info">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
          </div>
          <div className="game-status">
          <div>{status}</div>
            <ol>{moves}</ol>
            <p>Give <span><a href="https://tosintiwa.herokuapp.com/" target="_blank">Feedback</a></span></p>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  