import React, {Component} from "react";
import StockData from "./StockData";
import HomePage from "./HomePage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <main>
          {/* <StockData /> */}
        <Router>
          <div className="App-intro">
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/stock/AJANTPHARM" component={StockData} />
            </Switch>
          </div>
        </Router>
      </main>
    );
  }
}

export default App

