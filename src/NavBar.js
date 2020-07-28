import React, { useState } from "react";
import { Menu, Search } from 'semantic-ui-react';
import { useHistory } from "react-router";
import _ from 'lodash';

function NavBar() {
    const [activeNavItem, setActiveNavItem] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const history = useHistory();

    const source = [
      {
        title: "Ajantha Pharma Ltd",
        description: "AJANTPHARM",
      },
    ];
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

  return (
    <div id="navbar">
      <Menu inverted text size="large">
        <Menu.Item icon>
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
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default NavBar;
