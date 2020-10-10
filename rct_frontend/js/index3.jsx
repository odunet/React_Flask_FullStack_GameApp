//Component for snake page
import React from "react";
import ReactDOM from "react-dom";
import AppSnake from "./AppSnake"; //Importing local files
import Test from "./Test"; //Importing local files

ReactDOM.render(
    <AppSnake />, 
    document.getElementById("root_snake")
    );

ReactDOM.render(
    <Test />,
    document.getElementById('root4_snake')
    );

