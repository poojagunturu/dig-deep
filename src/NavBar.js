import React, { useState } from "react";
import { Menu, Search, Icon, Sidebar, Segment } from 'semantic-ui-react';
import { useHistory } from "react-router";
import _ from 'lodash';

function NavBar() {
    const [activeNavItem, setActiveNavItem] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [visible, setVisible] = React.useState(false)

    const history = useHistory();

    const source = [
      {
        title: "Ajantha Pharma Ltd",
        description: "AJANTPHARM",
      },
    ];

    const handleLogoClick = (e) => 
      history.push("/");

    const handleResultSelect = (e, { result }) =>
      history.push("/stock/" + result.description);

    const handleSearchChange = (e, { value }) => {
      setSearchValue(value);
      if (searchValue.length < 1) {
        setResults([]);
      }

      setTimeout(() => {
        const re = new RegExp(_.escapeRegExp(value), "i");
        const isMatch = (result) => re.test(result.title);
        console.log(isMatch);
        setIsLoading(false);
        console.log(_.filter(source, isMatch));
        setResults(_.filter(source, isMatch));
      }, 300);
    };

    const handleNavClick = (e, name) => {
      if (name !== activeNavItem) {
        // setButtonValue(name);
        setActiveNavItem(name);
      }
    };

    function openNav(e) {
      document.getElementById("mySidenav").style.width = "250px";
    }
    
    function closeNav(e) {
      document.getElementById("mySidenav").style.width = "0";
    }

  return (
    <div id="navbar">
      <Menu inverted text size="large">
        <Menu.Item icon onClick={(e) => handleLogoClick(e)}>
          <img
            src={"./img/logo.png"}
            style={{ paddingRight: 10, width: "3em" }}
            alt="Dig Deep logo"
          />
          <h3 style={{ margin: 0 }}>DIG DEEP</h3>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item size="large" style={{ width: "60%" }}>
            <Search
              fluid
              input={{ icon: "search", iconPosition: "left" }}
              size="small"
              placeholder="Search Stocks, Ex. Ajanta Pharma"
              style={{ width: "100%" }}
              loading={isLoading}
              onResultSelect={handleResultSelect}
              onSearchChange={_.debounce(handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={searchValue}
            />
          </Menu.Item>
          <Menu.Item
            name="ABOUT US"
            active={activeNavItem === "ABOUT US"}
            onClick={(e, { name }) => handleNavClick(e, name)}
          />
          <Menu.Item
            name="SIGN-IN"
            active={activeNavItem === "SIGN-IN"}
            onClick={(e, { name }) => handleNavClick(e, name)}
          />
          <Menu.Item onClick={(e) => openNav(e)} id="nav-sidebar">
            <Icon name="sidebar" />
          </Menu.Item>
        </Menu.Menu>
        <div id="mySidenav" className="sidenav"> 
            <Menu.Item onClick={(e) => closeNav(e)} id="closebtn">
              <Icon name="close" size="tiny"/>
            </Menu.Item>
            <Menu.Item
              name="ABOUT US"
              active={activeNavItem === "ABOUT US"}
              onClick={(e, { name }) => handleNavClick(e, name)}
            />
            <Menu.Item
              name="SIGN-IN"
              active={activeNavItem === "SIGN-IN"}
              onClick={(e, { name }) => handleNavClick(e, name)}
            />
            <Menu.Item size="small" style={{ padding: "10px" }}>
            <Search
              fluid
              input={{ icon: "search", iconPosition: "left" }}
              size="small"
              placeholder="Search Stocks, Ex. Ajanta Pharma"
              style={{ width: "100%" }}
              loading={isLoading}
              onResultSelect={handleResultSelect}
              onSearchChange={_.debounce(handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={searchValue}
            />
          </Menu.Item>
          </div>
      </Menu>
    </div>
  );
}

export default NavBar;
