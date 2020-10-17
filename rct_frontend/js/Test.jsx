//React Class
import React from "react";
import App2 from "./../css/App2.css";


class Test extends React.Component {
    render() {
      return (
        <div className="Test">
          <h1 style={{"textAlign": "center"}} >List of Games Available in Home Page</h1>
          <div className = "li_footer" style={{"textAlign": "center"}}>
            <li>Snake Game Powered by P5js <span style={{"color": "red", "fontSize": "0.7em"}}>(Click Image To Play)</span>&nbsp; &nbsp; &nbsp; <span><a href="/snake"><img src="./dist/images/p5.png" width='150px' height='100px'/></a></span></li>

            <li>Tic Tac Toe Powered by ReactJS <span style={{"color": "red", "fontSize": "0.7em"}}>(Click Image To Play)</span><span><a href="/tictac"><img src="./dist/images/reac.png" width='150px' height='100px'/></a></span></li>
            <li>2D Game Powered by P5js <span style={{"color": "red", "fontSize": "0.7em"}}>(Click Image To Play)</span>&nbsp; &nbsp; &nbsp; <span><a href="/twoDGame"><img src="./dist/images/p5_2D.PNG" width='150px' height='100px'/></a></span></li>
          </div>
          <div className="footer">
          <p style={{"textAlign": "center"}}>Games Served by FLASK Backend &nbsp; &nbsp; <span><img src="./dist/images/flask.png" width='150px' height='100px'/></span></p>
          <p style={{"textAlign": "center"}}>Game Feedback Powered by Express and Node Backend &nbsp; &nbsp;<span><img src="./dist/images/node_express.PNG" width='150px' height='100px'/></span></p>
          <p style={{"textAlign": "center"}}>Feedback data stored using relational DB powered by PostgreSQL &nbsp; &nbsp;<span><img src="./dist/images/postgres.PNG" width='150px' height='100px'/></span></p>
          <p style={{"textAlign": "center", "paddingTop":"4em", "fontSize": "0.8em"}}>Odutayo 2020, All Rights Reserved 	&#169; </p>
          </div>
        </div>
      );
    }
  }

  //Export components
export default  Test