import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; //Importing local files
import Apphome from "./Apphome"; //Importing local files
import Game from "./Game"; //Importing local files
import Test from "./Test"; //Importing local files

ReactDOM.render(
    <React.StrictMode>
    <App />
    </React.StrictMode>, 
    document.getElementById("root")
    );

ReactDOM.render(
    <React.StrictMode>
   <Game /> 
    </React.StrictMode>,
    document.getElementById('root3')
    );

ReactDOM.render(
    <React.StrictMode>
    <Test />
     </React.StrictMode>,
     document.getElementById('root4')
    );

//Display windoes popup
// alert("Hello World Ayo")