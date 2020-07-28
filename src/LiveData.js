import React, { useState, useEffect, useRef } from "react";
import { createChart, CrosshairMode, isBusinessDay } from "lightweight-charts";
import { Button, Segment } from 'semantic-ui-react';
import Chart from "./Chart";
import LiveNews from "./LiveNews";
import axios from 'axios';

function LiveData (props) {
    const [intraButtonValue, setIntraButtonValue] = useState('1D');
    const [otherButtonsValue, setOtherButtonsValue] = useState('');
    const [intraValueChange, setIntraValueChange] = useState(false);
    const [otherValueChange, setOtherValueChange] = useState(false);
    const [intraDayPressed, setIntraDayPressed] = useState(true);
    const [chartData, setChartData] = useState({
        candleData: [],
        volumeData: [],
        totalWorthData: [],
      });

    const candleSeries = useRef(null);
    const volumeSeries = useRef(null);
    const totalWorthSeries = useRef(null);
    const chart = useRef(null);
    const chart2 = useRef(null);
    const toolTip = useRef(null);
    const toolTip2 = useRef(null);
    
    const chartRef = React.createRef();
    const chartRef2 = React.createRef();

    const handleClick = (e) => {
        e.preventDefault();
        setIntraValueChange(!intraValueChange);
        setIntraButtonValue(e.target.innerHTML);
        setIntraDayPressed(true);
    }

    const handleOtherClick = (e) => {
        e.preventDefault();
        setOtherValueChange(!otherValueChange);
        setOtherButtonsValue(e.target.innerHTML);
        setIntraDayPressed(false);
    }

    const setCrosshair = () => {
      toolTip.current.innerHTML =
        '<div style="font-size: 13px; color: #FFFFFF;">' +
        '<p style="margin:0;"><span>O -</span>' +
        "&ensp;<span>H -</span>" +
        "&ensp;<span>L -</span>" +
        "&ensp;<span>C -</span>" +
        "&ensp;<span>VOLUME -</span> " +
        "</p>" +
        "</div>";

      toolTip2.current.innerHTML =
        '<div style="font-size: 13px; color: #FFFFFF;">' +
        '<p style="margin:0;"><span>TOTAL WORTH -</span>' +
        "</p>" +
        "</div>";
      chart.current.subscribeCrosshairMove(function (param) {
        var price = param.seriesPrices.get(candleSeries.current);
        var volume = param.seriesPrices.get(volumeSeries.current);
        var dateObj = new Date(param.time * 1000);
        var time = dateObj.toUTCString().slice(0, 25);

        if (typeof price !== "undefined" && typeof volume !== "undefined") {
          toolTip.current.innerHTML =
            '<div style="font-size: 13px;">' +
            '<p style="margin:0;"><span>O</span> ' +
            price.open +
            "&ensp;<span>H</span> " +
            price.high +
            "&ensp;<span>L</span> " +
            price.low +
            "&ensp;<span>C</span> " +
            price.close +
            "&ensp;<span>VOLUME</span> " +
            volume +
            "&ensp;" +
            "<span>" +
            time +
            "</span>" +
            "</p>" +
            "</div>";

          if (price.open <= price.close) {
            toolTip.current.getElementsByTagName("P")[0].style.color =
              "#34f7e5";
          } else {
            toolTip.current.getElementsByTagName("P")[0].style.color =
              "#ef5350";
          }
        }
      });

      chart2.current.subscribeCrosshairMove(function (param) {
        var value = param.seriesPrices.get(totalWorthSeries.current);
        // var time = {hours: 0, mins: 0, secs: 0}
        var dateObj = new Date(param.time * 1000);
        var time = dateObj.toUTCString().slice(0, 25);
        // var dateObj =  dateToChartTimeMinute(new Date(param.time*1000));
        // var time = new Date(dateObj*1000);

        if (typeof value !== "undefined") {
          toolTip2.current.innerHTML =
            '<div style="font-size: 13px;">' +
            '<p style="margin:0;"><span>TOTAL WORTH </span>' +
            value +
            "&ensp;" +
            "<span>" +
            time +
            "</span>" +
            "</p>" +
            "</div>";
        }
      });
    };

    useEffect(() => {
        var str = window.getComputedStyle(document.getElementById('sampled-data'), null).getPropertyValue('padding');
        chart.current = createChart(chartRef.current, {
            width: document.getElementById("sampled-data").offsetWidth-(parseInt(str.slice(-str.length, -2), 10)*2),
            height: (document.getElementById("sampled-data").offsetHeight*0.45),
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            layout: {
              backgroundColor: '#2B2B43',
              lineColor: '#2B2B43',
              textColor: '#D9D9D9',
            },
            grid: {
              vertLines: {
                color: '#2B2B43',
              },
              horzLines: {
                color: '#363C4E',
              },
            },
        });

        chart2.current = createChart(chartRef2.current, {
            width: document.getElementById("sampled-data").offsetWidth-(parseInt(str.slice(-str.length, -2), 10)*2),
            height: (document.getElementById("sampled-data").offsetHeight*0.12),
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            layout: {
              backgroundColor: '#2B2B43',
              lineColor: '#2B2B43',
              textColor: '#D9D9D9',
            },
            grid: {
              vertLines: {
                color: '#2B2B43',
              },
              horzLines: {
                color: '#363C4E',
              },
            },
        });
        
        document.body.onresize = function () {
          if (document.getElementById("sampled-data")) {
            var str = window
              .getComputedStyle(document.getElementById("sampled-data"), null)
              .getPropertyValue("padding");
            chart.current.resize(
              document.getElementById("sampled-data").offsetWidth -
                parseInt(str.slice(-str.length, -2), 10) * 2,
              document.getElementById("sampled-data").offsetHeight * 0.45
            );
            chart2.current.resize(
              document.getElementById("sampled-data").offsetWidth -
                parseInt(str.slice(-str.length, -2), 10) * 2,
              document.getElementById("sampled-data").offsetHeight * 0.12
            );
          }
        };

        chart.current.applyOptions({
          timeScale: {
            lockVisibleTimeRangeOnResize: true,
            rightBarStaysOnScroll: true,
            visible: true,
            timeVisible: true,
            secondsVisible: false,
            tickMarkFormatter: (time, tickMarkType, locale) => {
              console.log(time, tickMarkType, locale);
              const year = isBusinessDay(time)
                ? time.year
                : new Date(time * 1000).getUTCFullYear();
              return String(year);
            },
          },
        });

        chart2.current.applyOptions({
            timeScale: {
                lockVisibleTimeRangeOnResize: true,
                rightBarStaysOnScroll: true,
                visible: true,
                timeVisible: true,
                secondsVisible: false,
            },
        });


        candleSeries.current = chart.current.addCandlestickSeries();
        volumeSeries.current = chart.current.addHistogramSeries({
            color: '#26a69a',
            lineWidth: 2,
            priceFormat: {
                type: 'volume',
            },
            overlay: true,
            scaleMargins: {
                top: 0.8,
                bottom: 0, 
            },
        });

        totalWorthSeries.current = chart2.current.addHistogramSeries({
            color: '#26a69a',
            lineWidth: 2,
            priceFormat: {
                type: 'volume',
            },
            overlay: true,
            scaleMargins: {
                top: 0.8,
                bottom: 0, 
            },
        });
        candleSeries.current.setData([]);
        volumeSeries.current.setData([]);
        totalWorthSeries.current.setData([]);

        toolTip.current = document.createElement("div");
        toolTip.current.className = "three-line-legend";
        chartRef.current.appendChild(toolTip.current);
        toolTip.current.style.top = 5 + "px";

        toolTip2.current = document.createElement("div");
        toolTip2.current.className = "three-line-legend";
        chartRef2.current.appendChild(toolTip2.current);
        toolTip2.current.style.top = 5 + "px";

    }, []);

    useEffect(() => {
      setCrosshair();
    }, [intraValueChange]);

    useEffect(() => {
      setCrosshair();
    }, [otherValueChange]);

    useEffect(() => {
      candleSeries.current.setData([]);
      volumeSeries.current.setData([]);
      totalWorthSeries.current.setData([]);
    }, [intraButtonValue, intraValueChange]);

    const fetchDailyData= async (sample) => {
      axios
      .get('http://localhost:4000/stock-data/all', {
        params: {
          n: sample
        }})
      .then(response => {
        var data_length = response.data.length;
        var fetchedCandleData = [];
        var fetchedVolumeData = [];
        var fetchedTotalWorthData = [];
        var time, open, high, low, close, value, color;
        candleSeries.current.setData([]);
        volumeSeries.current.setData([]);

        while (data_length > 1) {
          ({ time, open, high, low, close, value } = response.data[data_length - 1]);
          var time_split = time.split("/");
          time = Date.UTC(time_split[2], time_split[0], time_split[1]) / 1000;

          if (response.data[data_length - 1].open <= response.data[data_length - 1].close) {
            color = "#26a69a";
          } else {
            color = "#ef5350";
          }
          fetchedCandleData.push({ time, open, high, low, close });
          fetchedVolumeData.push({ time, value, color });
          value = close * value;
          fetchedTotalWorthData.push({ time, value });
          data_length = data_length - 1;
        }

        setChartData({
          candleData: fetchedCandleData,
          volumeData: fetchedVolumeData,
          totalWorthData: fetchedTotalWorthData,
        });
      })
      .catch(error => console.error(`There was an error retrieving the book list: ${error}`))
    }

    useEffect(() => {
      var sample;
      if (otherButtonsValue !== "") {
        switch (otherButtonsValue) {
          case "1M":
            sample = 20;
            break;
          case "3M":
            sample = 62;
            break;
          case "6M":
            sample = 125;
            break;
          case "YTD":
            sample = -1;
            break;
          case "1Y":
            sample = 251;
            break;
          case "2Y":
            sample = 503;
            break;
          case "5Y":
            sample = 1259;
            break;
          case "Max":
            sample = -2;
            break;
          default:
            sample = 20;
        }

        fetchDailyData(sample);
      }
    }, [otherButtonsValue, otherValueChange]);

    return (
      // <div>
          <Segment inverted id="sampled-data">
            <div style={{marginBottom: '10px'}}>
              <div style={{paddingBottom: 10}}>
                <Button inverted compact basic onClick={handleClick}>1D</Button>
                <Button inverted compact basic onClick={handleClick}>5D</Button>
                <Button inverted compact basic onClick={handleOtherClick}>1M</Button>
                <Button inverted compact basic onClick={handleOtherClick}>3M</Button>
                <Button inverted compact basic onClick={handleOtherClick}>6M</Button>
                <Button inverted compact basic onClick={handleOtherClick}>YTD</Button>
                <Button inverted compact basic onClick={handleOtherClick}>1Y</Button>
                <Button inverted compact basic onClick={handleOtherClick}>2Y</Button>
                <Button inverted compact basic onClick={handleOtherClick}>5Y</Button>
                <Button inverted compact basic onClick={handleOtherClick}>Max</Button>
              </div>
              {intraDayPressed? 
                <Chart 
                  chartRef={chartRef}
                  chartRef2 = {chartRef2}
                  candleSeries={candleSeries}
                  volumeSeries={volumeSeries}
                  totalWorthSeries={totalWorthSeries}
                  candleData={props.candleData}
                  volumeData={props.volumeData}
                  totalWorthData={props.totalWorthData}
                /> :
                <Chart 
                  chartRef={chartRef}
                  chartRef2 = {chartRef2}
                  candleSeries={candleSeries}
                  volumeSeries={volumeSeries}
                  totalWorthSeries ={totalWorthSeries}
                  candleData={chartData.candleData}
                  volumeData={chartData.volumeData}
                  totalWorthData={chartData.totalWorthData}
                />
              }
            </div>
            <LiveNews />
          </Segment>
        // </div>
    );
}

export default LiveData;