import React, { useState } from "react";
import NavBar from "./NavBar.js";
import { Search, Responsive } from "semantic-ui-react";
import { useHistory } from "react-router";
import _ from 'lodash';
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  
  const history = useHistory();

  const source = [
    {
      title: "Ajanta Pharma Ltd",
      description: "AJANTPHARM",
    },
  ];
  const handleResultSelect = (e, { result }) => history.push('/stock/'+result.description);

  const handleSearchChange = (e, { value }) => {
    setSearchValue(value);
    if (searchValue.length < 1) {
      setResults([]);
    };

    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = (result) => re.test(result.title);
      setIsLoading(false);
      setResults(_.filter(source, isMatch));
    }, 300);
  };

  return (
    <div>
      <NavBar />
      <div id="home-page-showcase">
        <img
          src={"./img/bull.png"}
          className="bull"
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="2000"
          data-aos-easing="ease-in-out"
          alt="Pixelated Bull"
        />
        <img
          src={"./img/bear.png"}
          className="bear"
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="2000"
          data-aos-easing="ease-in-out"
          alt="Pixelated Bear"
        />
      </div>
      <div
        className="showcase-focus"
        data-aos="fade-down"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="2000"
        data-aos-easing="ease-in-out"
      >
        <div className="showcase-branding">
          <img src={"./img/logo.png"} alt="Dig Deep Logo"/>
          <h3>DIG DEEP</h3>
        </div>
        <Responsive minWidth={769} style={{width: '35%'}}>
          <Search
            fluid
            input={{ icon: "search", iconPosition: "left" }}
            size="huge"
            placeholder="Search Stocks, Ex. Ajanta Pharma"
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={searchValue}
          />
        </Responsive>
        <Responsive maxWidth={768} style={{width: '50%'}}>
          <Search
            fluid
            input={{ icon: "search", iconPosition: "left" }}
            size="small"
            placeholder="Search Stocks, Ex. Ajanta Pharma"
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={searchValue}
          />
        </Responsive>
        <p>
          Get trading insights from algo traders, data scientists using AI and
          Machine Learning
        </p>
      </div>
    </div>
  );
}

export default HomePage;
