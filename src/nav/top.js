import React, { Component } from "react";

export default class Top_nav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var handle_show_leftnav = this.props.handle_show_leftnav;
    return (
      <div>
        <nav
          className="navbar is-dark"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item">
              <h1>Archiineer</h1>
            </a>
            <a
              className="navbar-item"
              role="button"
              onClick={() => handle_show_leftnav()}
            >
              <i className="fas fa-align-justify"></i>
            </a>
          </div>
        </nav>
      </div>
    );
  }
}
