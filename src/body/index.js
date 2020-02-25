import React, { Component } from "react";
import Page_control from "./page_control";
import queryString from "query-string";

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.handle_get_items = this.handle_get_items.bind(this);
    this.state = {
      items: [],
      page: 1,
      page_now: 1,
      page_array: [],
      search: queryString.parse(this.props.location.search),
      page_font_rear: ""
    };
  }

  fetchData = body => {
    return fetch("/allproperty?count=" + body.count + "&page=" + body.page, {
      method: "GET"
    }).then(res => res.json());
  };

  handle_get_items = (count, page) => {
    console.log(this.state.search);

    if (count === undefined) {
      count = this.state.search.count;
    }
    this.fetchData({ count: count, page: page }).then(res => {
      this.setState({ items: res.data.data });
      this.setState({
        page: Math.ceil(res.data.count / count)
      });

      this.handle_get_page_no();
      var get_page_array = [];
      for (var i = 0; i < this.state.page; i++) {
        get_page_array.push(i + 1);
      }
      this.setState({ page_array: get_page_array });
    });
  };

  handle_select_page = (count, val) => {
    if (count === undefined) {
      count = this.state.search.count;
    }
    this.props.history.push({
      pathname: "/allproperty",
      search: "?count=" + count + "&page=" + val
    });
    this.setState({ search: { count: count, page: val } });
    this.handle_get_items(count, val);
  };

  handle_get_page_no = () => {
    if (
      window.location.search === "" ||
      window.location.search === "?count=" + this.state.search.count + "&page=1"
    ) {
      this.setState({ page_font_rear: "f" });
    } else if (
      window.location.search ===
      "?count=" + this.state.search.count + "&page=" + this.state.page
    ) {
      this.setState({ page_font_rear: "r" });
    } else {
      this.setState({ page_font_rear: "m" });
    }
  };

  handle_change_count = event => {
    this.setState({ count: event.target.value });
    this.props.history.push({
      pathname: "/allproperty",
      search: "?count=" + event.target.value + "&page=" + 1
    });
    this.setState({
      search: { count: event.target.value, page: 1 }
    });
    this.handle_get_items(event.target.value, 1);
  };

  componentDidMount() {
    if (this.state.search.page === undefined) {
      this.setState({ search: { count: 20, page: 1 } });
      this.handle_get_items(20, 1);
    } else {
      this.handle_get_items(this.state.search.count, this.state.search.page);
    }
  }

  select() {
    console.log(this.state.search.count);

    if (this.state.search.count === "50") {
      return (
        <select onChange={this.handle_change_count}>
          <option value={20}>20</option>
          <option value={50} selected>
            50
          </option>
        </select>
      );
    } else {
      return (
        <select onChange={this.handle_change_count}>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      );
    }
  }
  render() {
    return (
      <div>
        <div className="field">
          <div className="control">
            <div className="select">{this.select()} </div>
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
            <Page_control
              page_font_rear={this.state.page_font_rear}
              count={this.state.search.count}
              page={this.state.search.page}
              handle_select_page={this.handle_select_page}
            />
            <ul className="pagination-list">
              <li>
                {this.state.page_array.map((val, key) => {
                  return (
                    <a
                      className="pagination-link"
                      key={key}
                      onClick={() =>
                        this.handle_select_page(this.state.count, val)
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
