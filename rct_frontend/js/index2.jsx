import React from "react";
import ReactDOM from "react-dom";
import Apphome from "./Apphome"; //Importing local files
import Test from "./Test"; //Importing local files
import ReactSlickDemo from "./ReactSlickDemo"; //Importing local files

ReactDOM.render(
    <Apphome />, 
    document.getElementById("root_home")
    );

ReactDOM.render(
    <ReactSlickDemo />, 
    document.getElementById("container"));

ReactDOM.render(
    <Test />,
    document.getElementById('root4_home')
    );

