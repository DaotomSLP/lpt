import React, { Component } from "react";
import Top_nav from "./nav/top";
import Left_nav from "./nav/left";
import Body from "./body/index";

export class App extends Component {
  constructor(props) {
    super(props);
    this.handle_show_leftnav = this.handle_show_leftnav.bind(this);
    this.state = { left_nav_visible: true };
  }
  handle_show_leftnav = () => {
    this.setState({ left_nav_visible: !this.state.left_nav_visible });
  };

  render() {
    var left_nav_visible = this.state.left_nav_visible;
    return (
      <div>
        <Top_nav props={this.handle_show_leftnav} />
        <div className="columns">
          {left_nav_visible ? (
            <div className="column is-2">
              <Left_nav />
            </div>
          ) : (
            <div></div>
          )}
          <div className="column is-10">
            <Body />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
