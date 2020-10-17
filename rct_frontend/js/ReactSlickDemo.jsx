import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import "./../css/App2.css";

class ReactSlickDemo extends React.Component {
  render() {
    var settings = {
      dots: true
    };
    return (
      <div className="container">
        <Slider {...settings}>
        <div>
            <img src="./dist/images/twoD.PNG" width='314px' height='281px'/>
          </div>
          <div>
            <img src="./dist/images/tictac.PNG" width='314px' height='181px'/>
          </div>
          <div>
            <img src="./dist/images/snake.PNG" width='314px' height='281px'/>
          </div>
        </Slider>
      </div>
    );
  }
}

//Export components
export default  ReactSlickDemo