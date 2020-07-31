import React, { useState, useEffect, useRef } from "react";
import PersistentLiveData from "./PersistentLiveData";
import LiveData from "./LiveData";
import UnderConstruction from "./UnderConstruction";
import { Button, Icon } from 'semantic-ui-react';
import NavBar from "./NavBar.js";
import axios from 'axios';

function StockData() {
    const [intraDayData, setIntraDayData] = useState({
        candleData: [],
        volumeData: [],
        totalWorthData: [],
      });
    // const [buttonValue, setButtonValue] = useState('LIVE DATA');
    const [activeItem, setActiveItem] = useState('LIVE DATA'); 
    const [isLoading, setIsLoading] = useState ('true');
    const [mounted, setMounted] = useState(false);

    const row = useRef(-1);
   
    const handleClick = (e, name) => {
        if(name !== activeItem) {
            // setButtonValue(name);
            setActiveItem(name);
        }
    }

    const dateToChartTimeMinute = (date) => {
      return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0) / 1000;
    };

    const fetchLiveData = async (id) => {
      // Send GET request to endpoint
      axios.all([
        axios.get('https://digdeepapi.herokuapp.com/stock-data/retrieve-candle', {
          params: {
            id: id 
          }}),
        axios.get('https://digdeepapi.herokuapp.com/stock-data/retrieve-volume', {
          params: {
            id: id 
          }})
      ])
        .then(axios.spread((candle, volume) => {
          setIsLoading(false);
          var newCandleData = candle.data[0];
          var newVolumeData = volume.data[0];
          delete newCandleData.id;
          delete newVolumeData.id;
          var newTotalWorthData = {value: newCandleData.close*newVolumeData.value, time: newCandleData.time};
          if ((newCandleData && newVolumeData) != null) {
            if (newCandleData.open <= newCandleData.close) {
              newVolumeData.color = "#26a69a";
              newTotalWorthData.color = "#26a69a";
            } else {
              newVolumeData.color = "#ef5350";
              newTotalWorthData.color = "#ef5350";
            }
          }
          newCandleData.time = dateToChartTimeMinute(new Date(newCandleData.time*1000));
          newVolumeData.time = dateToChartTimeMinute(new Date(newVolumeData.time*1000));
          newTotalWorthData.time = dateToChartTimeMinute(new Date(newTotalWorthData.time*1000));
          const incomingCandleData = [...intraDayData.candleData, newCandleData];
          const incomingVolumeData = [...intraDayData.volumeData, newVolumeData];
          const incomingTotalWorthData = [...intraDayData.totalWorthData, newTotalWorthData];
          setIntraDayData({
            candleData: incomingCandleData,
            volumeData: incomingVolumeData,
            totalWorthData: incomingTotalWorthData,
          });

        }))
        .catch(error => console.error(`There was an error retrieving the book list: ${error}`))
    }

    useEffect (() => {
      if(document.getElementById("live-price") !== null){
        var live_price = document.getElementById("live-price");
        var sticky = live_price.offsetTop;
        var newItem = document.createElement("P");    
        var textnode = document.createTextNode("AJANTPHARM"); 
        newItem.appendChild(textnode);  
        
        const myFunction = () => {
          if (window.pageYOffset > sticky && !document.getElementById("modal-hist-segment")) {
            console.log(window.pageYOffset);
            console.log(sticky);
            live_price.firstChild.style.display = 'inline';
            live_price.childNodes[1].style.display = 'inline';
            live_price.childNodes[1].style.marginLeft = '20px';
            live_price.style.margin = '';
            live_price.style.padding = '';
            live_price.classList.add("sticky");
          } else {
            live_price.firstChild.style.display = 'none';
            live_price.childNodes[1].style.display = '';
            live_price.childNodes[1].style.marginLeft = '';
            // live_price.firstChild.className = "show";
            live_price.classList.remove("sticky");
          }
        }
        // window.onscroll = function() {myFunction()};
        window.onscroll = myFunction;
      }
    }, [])
    
    useEffect(() => {
      if(row.current < 340) {
        const interval = setInterval(() => {
          fetchLiveData(++row.current);
        }, 2000);
        return () => clearInterval(interval);
      }
    },[intraDayData.candleData, intraDayData.volumeData]);

    
    useEffect(() => {
      setMounted(true);
    }, [])
    
    return (
      <div>
        <NavBar />
        <div className="all-stock-data">
          <div id="stock-data-header">
            <div style={{ marginRight: 20 }}>
              <h2 style={{ margin: 0 }}>Ajanta Pharma Ltd</h2>
              <p>NSE: AJANTPHARM</p>
            </div>
            <div id="live-price">
              <h4 style={{ display: "none" }}>NSE: AJANTPHARM</h4>
              <h2
                style={{
                  paddingBottom: 10,
                  paddingTop: 10,
                  margin: 0,
                  color:
                    intraDayData.candleData.length > 1
                      ? intraDayData.candleData[
                          intraDayData.candleData.length - 1
                        ].close >=
                        intraDayData.candleData[
                          intraDayData.candleData.length - 2
                        ].close
                        ? "#34f7e5"
                        : "#ef5350"
                      : "#34f7e5",
                }}
              >
                {intraDayData.candleData.length !== 0
                  ? intraDayData.candleData[
                      intraDayData.candleData.length - 1
                    ].close.toFixed(2)
                  : ""}{" "}
                {intraDayData.candleData.length > 1 ? (
                  intraDayData.candleData[intraDayData.candleData.length - 1]
                    .close >=
                  intraDayData.candleData[intraDayData.candleData.length - 2]
                    .close ? (
                    <Icon size="small" name="caret up" />
                  ) : (
                    <Icon size="small" name="caret down" />
                  )
                ) : (
                  ""
                )}
                <h3
                  style={{
                    display: "inline",
                    paddingLeft: 5,
                  }}
                >
                  {intraDayData.candleData.length > 1
                    ? (
                        intraDayData.candleData[
                          intraDayData.candleData.length - 1
                        ].close -
                        intraDayData.candleData[
                          intraDayData.candleData.length - 2
                        ].close
                      ).toFixed(2)
                    : ""}
                </h3>
                <h3
                  style={{
                    display: "inline",
                    paddingLeft: 5,
                  }}
                >
                  {intraDayData.candleData.length > 1
                    ? "  (" +
                      (
                        ((intraDayData.candleData[
                          intraDayData.candleData.length - 1
                        ].close -
                          intraDayData.candleData[
                            intraDayData.candleData.length - 2
                          ].close) /
                          intraDayData.candleData[
                            intraDayData.candleData.length - 1
                          ].close) *
                        100
                      ).toFixed(2) +
                      "%)"
                    : ""}
                </h3>
              </h2>
            </div>
            {isLoading? <h3 className="is-loading">Loading Data ...</h3>: <div></div>}
          </div>
          <Button.Group widths="5" size="tiny">
            <Button
              active={activeItem === "LIVE DATA"}
              name="LIVE DATA"
              onClick={(e, { name }) => handleClick(e, name)}
            >
              LIVE DATA
            </Button>
            <Button
              active={activeItem === "TECHNICAL"}
              name="TECHNICAL"
              onClick={(e, { name }) => handleClick(e, name)}
            >
              TECHNICAL
            </Button>
            <Button
              active={activeItem === "NEWS"}
              name="NEWS"
              onClick={(e, { name }) => handleClick(e, name)}
            >
              NEWS
            </Button>
            <Button
              active={activeItem === "SOCIAL MEDIA"}
              name="SOCIAL MEDIA"
              onClick={(e, { name }) => handleClick(e, name)}
            >
              SOCIAL MEDIA
            </Button>
            <Button
              active={activeItem === "COMPARE"}
              name="COMPARE"
              onClick={(e, { name }) => handleClick(e, name)}
            >
              COMPARE
            </Button>
          </Button.Group>
          <div id="stock-data">
            {activeItem === "LIVE DATA" ? (
              <LiveData
                candleData={intraDayData.candleData}
                volumeData={intraDayData.volumeData}
                totalWorthData={intraDayData.totalWorthData}
                mounted={mounted}
              />
            ) : (
              <UnderConstruction />
            )}
            <PersistentLiveData candleData={intraDayData.candleData} />
          </div>
        </div>
      </div>
    );
}

export default StockData;