import React, { useEffect } from "react";

import { NavLink } from "react-router-dom";

const activeSidebarStyle = {
  backgroundColor: "whitesmoke",
  color: "#363636"
};

const navBurgerClick = e => {
  window.$("#wrapper-sidebar").toggle();
};

export default props => {
  useEffect(() => {
    window.addEventListener(
      "load",
      () => {
        // for dropdown handle click outside dropdown
        // window.$(document).on("click", (e) => {
        //     if( window.$(".dropdown-trigger") !== e.target && !window.$(".dropdown-trigger").has(e.target).length){
        //         window.$(".dropdown-menu").hide()
        //     }
        // })
        // // when press escape key also close modal
        // window.$(document).on('keydown', function(event) {
        //     if (event.key === "Escape") {
        //         window.$(".modal").removeClass("is-active");
        //     }
        // });
      },
      false
    );

    window.addEventListener("resize", e => {
      // console.log('w: ', window.innerWidth)
    });
  });

  return (
    <div
      id="wrapper-container"
      className="container is-fluid"
      style={{ marginLeft: 0, marginRight: 0 }}
    >
      <nav
        className="navbar is-light"
        role="navigation"
        aria-label="main navigation"
        style={{ paddingLeft: "15px", paddingRight: "15px" }}
      >
        <div className="navbar-brand" style={{ width: "100%" }}>
          <a
            className="navbar-item"
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            &nbsp; &nbsp;
            <span style={{ fontSize: "1.2rem" }}>Archiineer&nbsp;Group</span>
          </a>

          <a
            id="navBurger"
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="wrapper-sidebar"
            onClick={e => navBurgerClick(e)}
            style={{ display: "block", marginLeft: "auto" }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      </nav>

      <div id="wrapper-row" className="columns">
        <div id="wrapper-sidebar" className="column">
          <div
            className="columns is-mobile"
            style={{ color: "white", marginBottom: 0, marginTop: 0 }}
          >
            <NavLink
              to="/allproperty"
              className="sidebar-navlink column button is-dark is-inverted is-outlined"
              activeStyle={activeSidebarStyle}
            >
              <br />
              <span>All Property</span>
            </NavLink>
          </div>

          <div
            className="columns is-mobile"
            style={{ color: "white", marginBottom: 0, marginTop: 0 }}
          >
            <NavLink
              to="/detail"
              className="sidebar-navlink column button is-dark is-inverted is-outlined"
              activeStyle={activeSidebarStyle}
            >
              <br />
              <span>Detail</span>
            </NavLink>
          </div>

          <div
            className="columns is-mobile"
            style={{ color: "white", marginBottom: 0, marginTop: 0 }}
          >
            <NavLink
              to="/detail"
              className="sidebar-navlink column button is-dark is-inverted is-outlined"
              activeStyle={activeSidebarStyle}
            >
              <br />
              <span>Detail</span>
            </NavLink>
          </div>
        </div>

        <div id="wrapper-content" className="column">
          {props.children}
        </div>
      </div>
    </div>
  );
};
