import React, { Component } from "react";

class Page_control extends Component {
  constructor(props) {
    super(props);
    this.state = { page_font_rear: "" };
  }
  componentWillReceiveProps() {
    this.setState({ page_font_rear: this.props.page_font_rear });
  }

  render() {
    if (this.state.page_font_rear === "r") {
      return (
        <>
          <a className="pagination-previous">Previous</a>
          <a className="pagination-next" disabled>
            Next page
          </a>
        </>
      );
    } else if (this.state.page_font_rear === "f") {
      return (
        <>
          <a className="pagination-previous" disabled>
            Previous
          </a>
          <a className="pagination-next">Next page</a>
        </>
      );
    } else {
      return (
        <>
          <a className="pagination-previous">Previous</a>
          <a className="pagination-next">Next page</a>
        </>
      );
    }
  }
}

export default Page_control;
