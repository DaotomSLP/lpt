import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Layout from "./nav/left";
import Body from "./body/index";

export class App extends Component {
  constructor(props) {
    super(props);
  }
  Home = () => {
    return <Redirect to="/allproperty" />;
  };

  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={this.Home} />
          <Route exact path="/allproperty" component={Body} />
        </Layout>
      </Router>
    );
  }
}

export default App;
