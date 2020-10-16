//Component for snake page
import React from "react";
import ReactDOM from "react-dom";
import App2DGame from "./App2DGame"; //Importing local files
import Test from "./Test"; //Importing local files

ReactDOM.render(
    <App2DGame />, 
    document.getElementById("root_twoDGame")
    );

ReactDOM.render(
    <Test />,
    document.getElementById('root4_twoDGame')
    );

