import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rowStyle = {
  'display': 'inline-flex',
  'flexWrap': 'wrap',
  'width':'265px',
  //'backgroundColor': '#eee',
  'alignItems': 'center',
  'justifyContent': 'center',
  'textAlign': 'center',
  'lineHeight': '80px'
  // 'display': 'flex',
  // 'flexDirection': 'column',
  //'border': '3px #eee solid'
}

const squareStyle = {
  'width':'80px',
  'height':'80px',
  'backgroundColor': '#ddd',
  'border':'1px solid black',
 // 'margin': '4px',
  // 'display': 'flex',
  'display':'inline-block',
  // 'justifyContent': 'center',
  // 'alignItems': 'center',
   'fontSize': '50px',
  'color': 'white',
  'textAlign': 'center',
  'lineHeight': '80px'
  
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': 'Auto',
  'alignItems': 'center',
  'justifyContent': 'center',
  // 'display': 'flex',
  // 'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

const player1="X"
const player2="O"

const winpossibilities=[
  ["0","1","2"],
  ["3","4","5"],
  ["6","7","8"],
  ["0","3","6"],
  ["1","4","7"],
  ["2","5","8"],
  ["0","4","8"],
  ["2","4","6"],
]

class Square extends React.Component {
  render() {
    const index=this.props.boxIndex;
    return (
      <div className="square" style={squareStyle} onClick={()=>this.props.controlFunc(index)}>
      </div>
    );
  }
}

class Board extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        board:Array(9).fill(null),
        player:"X",
        count:0,
        winner:null
    }
  this.reset=this.reset.bind(this)
  this.checkWinner=this.checkWinner.bind(this)
}

reset(){

let clearboard=Array(9).fill(null)

this.setState({
  board:clearboard,
  player:player1,
  count:0,
  winner:null
})

}

checkWinner(){
console.log("chslksmd")

let player=this.state.player

for(let i=0;i<winpossibilities.length;i++)
{
  //array destruturing
  const[x,y,z]=winpossibilities[i];
  if(this.state.board[x]!=null && this.state.board[x]===this.state.board[y] && this.state.board[x]===this.state.board[z]){
    this.setState({
      winner:player,
      player:null
    })
  }
}
}

handleClick(index){

  let newboard=this.state.board
  let count=this.state.count
  let winner=this.state.winner

  console.log(count)
  if(newboard[index]==null && count<9 && winner==null)
  {
   
  let player=this.state.player

  if(player==player1)
  {
    newboard[index]=player1
    player=player2 
    
  }
  else{
    newboard[index]=player2
    player=player1
  }

  
  this.setState({
    board:newboard,
    player:player,
    count:count+1
})

this.checkWinner();
}
}

  render() {

    let nextPlayer=null
    if(this.state.count<9 && this.state.winner==null){
      nextPlayer=this.state.player
    }
    const Box=this.state.board.map((b,index)=>
    <div className="square" style={squareStyle} key={index} 
    onClick={()=>this.handleClick(index)}>{b}</div>)

    return (
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}>Next player: {nextPlayer}</div>
        <div className="winner" style={instructionsStyle}>Winner: {this.state.winner}</div>
        <button style={buttonStyle} onClick={this.reset}>Reset</button>

        
        
        <div style={rowStyle}>

            {Box}

        </div>
        
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
