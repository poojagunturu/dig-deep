import React, { useState, useEffect, useRef } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import { Label, Segment, Icon, Modal } from "semantic-ui-react";
import _ from 'lodash';

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

// function debounce(fn, ms) {
//   let timer;
//   return (_) => {
//     clearTimeout(timer);
//     timer = setTimeout((_) => {
//       timer = null;
//       fn.apply(this, arguments);
//     }, ms);
//   };
// }

function HistogramChart(props) {
  const [active, setActive] = useState(0);
  // const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const xbins_val = useRef([0, 3.0, 1.5]);

  const median = (arr) => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

  const mean = () => {
    return (
      props.data.reduce(function (a, b) {
        return a + b;
      }, 0) / props.data.length
    );
  };

  function resetLayout() {
    var str = window
      .getComputedStyle(document.getElementById("every-hist-segment"), null)
      .getPropertyValue("padding-block-end");
    // console.log(window.getComputedStyle(document.getElementById("every-hist-segment"), null));
    var vw = document.body.offsetWidth;
    figure.data = chart_data[props.index].data;
    figure.layout.yaxis.title = chart_data[props.index].layout.yaxis.title;
    figure.layout.xaxis.title = chart_data[props.index].layout.xaxis.title;
    if (
      chart_data[props.index].layout.xaxis.tickangle &&
      Math.ceil(0.01 * (vw * 0.7)) >= 8
    ) {
      // if (vw <= 1280) {
        figure.layout.xaxis.tickangle =
          chart_data[props.index].layout.xaxis.tickangle;
        figure.layout.xaxis.tickfont = { size: Math.ceil(0.01 * (vw * 0.7)) };
      // }
    }

    if (props.slider) {
      figure.layout.sliders = [
        {
          pad: { t: 40 },
          active: active,
          currentvalue: {
            xanchor: "right",
            prefix: "bin size: ",
            font: {
              color: "#888",
              size: 15,
            },
          },
          steps: [
            {
              label: "auto",
              method: "restyle",
              args: ["xbins.size", xbins_val.current[0]],
            },
            {
              label: "3.0",
              method: "restyle",
              args: ["xbins.size", xbins_val.current[1]],
            },
            {
              label: "1.5",
              method: "restyle",
              args: ["xbins.size", xbins_val.current[2]],
            },
          ],
        },
      ];
      figure.layout.width =
        document.getElementById("histogram-charts").offsetWidth * 0.5 -
        parseInt(str.slice(-str.length, -2), 10) * 4;
      figure.layout.height =
        document.getElementById("histogram-charts").offsetHeight * 0.47 + 80;
    } else {
      // delete figure.layout.sliders;
      if (vw <= 767) {
        figure.layout.width =
        document.getElementById("histogram-charts").offsetWidth -
        parseInt(str.slice(-str.length, -2), 10) * 8;
        figure.layout.height =
          document.getElementById("histogram-charts").offsetHeight * 0.5 - 60;
        figure.layout.margin.b = 50;
      }
      else{
        figure.layout.width =
          document.getElementById("histogram-charts").offsetWidth * 0.5 -
          parseInt(str.slice(-str.length, -2), 10) * 4;
        figure.layout.height =
          document.getElementById("histogram-charts").offsetHeight * 0.5 - 60;
        figure.layout.margin.b = 50;
      }
    }
    if (props.legend) {
      // delete figure.layout.legend;
      figure.layout.showlegend = true;
    }
    if (props.plain) {
      if (props.index === 0) {
        figure.data.splice(1, 3);
      }
      delete figure.layout.shapes;
    }
  }

  function resetModalLayout() {
    if(document.getElementById("modal-hist-segment")) {
      var str = window
        .getComputedStyle(document.getElementById("modal-hist-segment"), null)
        .getPropertyValue("width");
      var pad_str = window
        .getComputedStyle(document.getElementById("modal-hist-segment"), null)
        .getPropertyValue("padding-block-end");
      figure.data = chart_data[props.index].data;
      figure.layout.yaxis.title = chart_data[props.index].layout.yaxis.title;
      figure.layout.xaxis.title = chart_data[props.index].layout.xaxis.title;

      figure.layout.width = parseInt(str.slice(-str.length, -2), 10) - (parseInt(pad_str.slice(-str.length, -2), 10)*2);
      figure.layout.height = document.body.offsetHeight * 0.8;

      figure.layout.showlegend = true;
      figure.layout.margin = {autoexpand: true};
      if(props.index !== 0) {
        delete figure.layout.shapes;
      }
      delete figure.config.modeBarButtonsToRemove;
    }
  }

  function handleResize() {
    if (modalOpen) {
      resetModalLayout();
    } else {
      resetLayout();
    }
    setChartState(figure);
  }

  function handleExpand() {
    setModalOpen(true);
  }

  function handleCollapse() {
    if (document.getElementById("live-price") !== null) {
      var live_price = document.getElementById("live-price");
      var sticky = live_price.offsetTop;
      if (window.pageYOffset > sticky) {
        live_price.firstChild.style.display = 'inline';
        live_price.childNodes[1].style.display = 'inline';
        live_price.childNodes[1].style.marginLeft = '20px';
        live_price.style.margin = '';
        live_price.style.padding = '';
        live_price.classList.add("sticky");
      }
    }
    setModalOpen(false);
  }

  var data_prices_histogram = {
    data: [
      {
        type: "histogram",
        hoverinfo: "x+y",
        name: "Histogram",
        x: props.data,
        xbins: {
          size: xbins_val.current[active],
        },
      },
      {
        type: "violin",
        name: "KDE Line",
        hoveron: "points",
        hoverinfo: "name",
        scalemode: "count",
        side: "positive",
        line: {
          color: "#bebada",
        },
        marker: {
          color: "rgba(0, 0, 0, 0)",
        },
        fillcolor: "rgba(0,0,0,0)",
        yaxis: "y2",
        y0: "-",
        x: props.data,
        orientation: "h",
      },
      {
        x: [mean()],
        y: [5],
        yaxis: "y3",
        hoverinfo: "name+x",
        mode: "lines",
        type: "scatter",
        name: "Mean",
        marker: {
          color: "rgb(200, 0, 255)",
        },
        line: {
          dash: "dot",
          width: 4,
        },
      },
      {
        x: [median(props.data)],
        y: [5],
        yaxis: "y3",
        hoverinfo: "name+x",
        mode: "lines",
        name: "Median",
        marker: {
          color: "rgb(200, 150, 255)",
        },
        line: {
          dash: "dot",
          width: 4,
        },
      },
    ],
    layout: {
      yaxis: { title: "Frequency" },
      xaxis: { title: "Stock Price" },
    },
  };

  var data_sector_volumes = {
    data: [
      {
        x: ["AJANTPHARM"],
        y: [20],
        type: "bar",
        hoverinfo: "x+y",
        name: "AJANTPHARM",
      },
      {
        x: ["SUNPHARMA"],
        y: [12],
        type: "bar",
        hoverinfo: "x+y",
        name: "SUNPHARMA",
      },
      {
        x: ["AUROPHARMA"],
        y: [18],
        type: "bar",
        hoverinfo: "x+y",
        name: "AUROPHARMA",
      },
      {
        x: ["BIOCON"],
        y: [29],
        type: "bar",
        hoverinfo: "x+y",
        name: "BIOCON",
      },

      {
        x: ["CIPLA"],
        y: [14],
        type: "bar",
        hoverinfo: "x+y",
        name: "CIPLA",
      },
    ],
    layout: {
      yaxis: { title: "Total Volume" },
      xaxis: { title: "Sector Stocks", tickangle: 10 },
    },
  };

  var data_sector_totalworth = {
    data: [
      {
        x: ["AJANTPHARM"],
        y: [20],
        type: "bar",
        hoverinfo: "x+y",
        name: "AJANTPHARM",
      },
      {
        x: ["SUNPHARMA"],
        y: [12],
        type: "bar",
        hoverinfo: "x+y",
        name: "SUNPHARMA",
      },
      {
        x: ["AUROPHARMA"],
        y: [18],
        type: "bar",
        hoverinfo: "x+y",
        name: "AUROPHARMA",
      },
      {
        x: ["BIOCON"],
        y: [29],
        type: "bar",
        hoverinfo: "x+y",
        name: "BIOCON",
      },

      {
        x: ["CIPLA"],
        y: [14],
        type: "bar",
        hoverinfo: "x+y",
        name: "CIPLA",
      },
    ],
    layout: {
      yaxis: { title: "Total Worth" },
      xaxis: { title: "Sector Stocks", tickangle: 10 },
    },
  };

  var data_sector_indices = {
    data: [
      {
        x: ["AJANTPHARM"],
        y: [20],
        type: "bar",
        hoverinfo: "x+y",
        name: "AJANTPHARM",
      },
      {
        x: ["SUNPHARMA"],
        y: [12],
        type: "bar",
        hoverinfo: "x+y",
        name: "SUNPHARMA",
      },
      {
        x: ["AUROPHARMA"],
        y: [18],
        type: "bar",
        hoverinfo: "x+y",
        name: "AUROPHARMA",
      },
      {
        x: ["BIOCON"],
        y: [29],
        type: "bar",
        hoverinfo: "x+y",
        name: "BIOCON",
      },

      {
        x: ["CIPLA"],
        y: [14],
        type: "bar",
        hoverinfo: "x+y",
        name: "CIPLA",
      },
    ],
    layout: {
      yaxis: { title: "Indices" },
      xaxis: { title: "Sector Stocks", tickangle: 10 },
    },
  };

  var figure = {
    data: [],
    layout: {
      width: document.body.offsetWidth * 0.1,
      height: document.body.offsetHeight * 0.5,
      // margin: {
      //   autoexpand: true
      // },
      plot_bgcolor: "#2B2B43",
      paper_bgcolor: "#2B2B43",
      bargap: 0.05,
      uirevision: true,
      font: {
        color: "#a6a6a6",
      },
      showlegend: false,
      legend: {
        x: 0,
        y: 1.5,
        // itemclick: "toggleothers" | "false"
      },
      yaxis: { title: "" },
      yaxis2: {
        overlaying: "y",
        side: "right",
      },
      yaxis3: {
        overlaying: "y",
        side: "right",
        visible: false,
      },
      xaxis: { title: "" },
      margin: {
        l: 60,
        r: 30,
        b: 20,
        t: 10,
        autoexpand: true,
      },
      // colorway: ['#178bdd', '#bb4603', '#9925a8', '#002b88', '#51009c', '#612d23', '#ff60cf', '#c6f3dd', '#ad950a', '#17becf'],
      colorway: ['#0083bf', '#fc9003', '#f0fc03', '#94ffed', '#d14900', '#792bff', '#cc7ddb', '#456aff', '#c20091', '#ffdbfc'],
      shapes: [
        {
          type: "line",
          yref: "paper",
          x0:
            props.data.reduce(function (a, b) {
              return a + b;
            }, 0) / props.data.length,
          y0: 0,
          x1:
            props.data.reduce(function (a, b) {
              return a + b;
            }, 0) / props.data.length,
          y1: 1,
          line: {
            color: "rgb(200, 0, 255)",
            width: 4,
            dash: "dot",
          },
        },
        {
          type: "line",
          yref: "paper",
          x0: median(props.data),
          y0: 0,
          x1: median(props.data),
          y1: 1,
          line: {
            color: "rgb(200, 150, 255)",
            width: 4,
            dash: "dot",
          },
        },
      ],
    },
    frames: [],
    config: { scrollZoom: true, responsive: true, modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'zoom3d', 'pan3d', 'orbitRotation', 'tableRotation', 'handleDrag3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'toImage', 'sendDataToCloud', 'toggleSpikelines'], },
  };

  var chart_data = [
    data_prices_histogram,
    data_sector_volumes,
    data_sector_totalworth,
    data_sector_indices,
  ];
  const [chartState, setChartState] = useState(figure);

  useEffect(() => {
    const debouncedHandleResize = _.debounce(handleResize, 1000, {
      leading: true,
    })    
    // debounce(handleResize, 1000);
    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  useEffect(() => {
    if (modalOpen) {
      resetModalLayout();
    } else {
      resetLayout();
    }
    // console.log(props.open);
    setChartState(figure);
  }, [props.data, modalOpen]);

  return (
    <Segment inverted id="every-hist-segment">
      <div className="every-hist">
        <Label inverted color="black" attached="top">
          {props.title}
          <div style={{ display: "inline", float: "right" }}>
            <Modal
              inverted
              trigger={
                <Icon
                  link
                  color="grey"
                  name="expand arrows alternate"
                  onClick={handleExpand}
                />
              }
              open={modalOpen}
              onClose={handleCollapse}
            >
              <Segment inverted id="modal-hist-segment">
                <Plot
                  data={chartState.data}
                  layout={chartState.layout}
                  frames={chartState.frames}
                  config={chartState.config}
                  onInitialized={(figure) => {
                    setChartState(figure);
                  }}
                  onSliderChange={(e) => {
                    setActive(e.slider.active);
                  }}
                />
              </Segment>
            </Modal>
          </div>
        </Label>
        <Plot
          data={chartState.data}
          layout={chartState.layout}
          frames={chartState.frames}
          config={chartState.config}
          onInitialized={(figure) => {
            setChartState(figure);
          }}
          onSliderChange={(e) => {
            setActive(e.slider.active);
          }}
        />
      </div>
    </Segment>
  );
}

export default HistogramChart;
