import React, { Component } from "react";
import axios from "axios";
import Page_control from "./page_control";

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.handle_get_items = this.handle_get_items.bind(this);
    this.state = {
      items: [],
      page: 0,
      page_now: 1,
      page_array: [],
      count: 20,
      page_font_rear: ""
    };
  }

  handle_get_items = () => {
    axios
      .get(
        (window.location.pathname !== "" ? "/allproperty" : "") +
          (window.location.search !== ""
            ? window.location.search
            : "?count=20&page=1")
      )
      .then(response => {
        this.setState({ items: response.data.data.data });
        this.setState({
          page: Math.ceil(response.data.data.count / this.state.count)
        });

        this.handle_get_page_no();
        var get_page_array = [];
        for (var i = 0; i < this.state.page; i++) {
          get_page_array.push(i + 1);
        }
        this.setState({ page_array: get_page_array });
      });
  };
  handle_get_page_no = () => {
    if (
      window.location.search === "" ||
      window.location.search === "?count=20&page=1"
    ) {
      this.setState({ page_font_rear: "f" });
    } else if (window.location.search === "?count=20&page=" + this.state.page) {
      this.setState({ page_font_rear: "r" });
    } else {
      this.setState({ page_font_rear: "m" });
    }
  };
  handle_change_count = event => {
    this.setState({ page_now: event.target.value });
    window.location.assign(
      "/allproperty?count=" +
        event.target.value +
        "&page=" +
        this.state.page_now
    );
  };
  componentDidMount() {
    this.handle_get_items();
  }

  render() {
    return (
      <div>
        <div className="field">
          <div className="control">
            <div className="select">
              <select onChange={this.handle_change_count}>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>ລະຫັດ</th>
                <th>ປະເພດ</th>
                <th>ລາຄາ</th>
                <th> </th>
                <th>ບ້ານ</th>
                <th>ເມືອງ</th>
                <th>ແຂວງ</th>
                <th>exchangeType</th>
              </tr>
              {this.state.items.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.propertyCode}</td>
                    <td>{val.type2}</td>
                    <td>{val.price}</td>
                    <td>{val.currency_code}</td>
                    <td>{val.village_name}</td>
                    <td>{val.district_name}</td>
                    <td>{val.province_name}</td>
                    <td>{val.exchangeType}</td>
                  </tr>
                );
              })}
            </thead>
          </table>
        </div>
        <div>
          <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            <Page_control page_font_rear={this.state.page_font_rear} />
            <ul className="pagination-list">
              <li>
                {this.state.page_array.map((val, key) => {
                  return (
                    <a
                      className="pagination-link"
                      key={key}
                      onClick={() => this.setState({ page_now: val })}
                      href={
                        "/allproperty?count=" +
                        this.state.count +
                        "&page=" +
                        val
                      }
                    >
                      {val}
                    </a>
                  );
                })}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
