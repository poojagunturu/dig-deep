export const barchart_data = [
  {
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
  },

  {
    data: [
      {
        x: ["giraffes"],
        y: [20],
        type: "bar",
        hoverinfo: "x+y",
      },
      {
        x: ["orangutans"],
        y: [12],
        type: "bar",
        hoverinfo: "x+y",
      },
      {
        x: ["monkeys"],
        y: [18],
        type: "bar",
        hoverinfo: "x+y",
      },
      {
        x: ["rabbits"],
        y: [29],
        type: "bar",
        hoverinfo: "x+y",
      },

      {
        x: ["pandas"],
        y: [10],
        type: "bar",
        hoverinfo: "x+y",
      },
    ],
    layout: {
      yaxis: { title: "Total Volume" },
      xaxis: { title: "Sector Stocks", tickangle: 10 },
    },
  },

  {
    data: [
      {
        x: ["giraffes"],
        y: [20],
        type: "bar",
        hoverinfo: "x+y",
      },
      {
        x: ["orangutans"],
        y: [12],
        type: "bar",
        hoverinfo: "x+y",
      },
      {
        x: ["monkeys"],
        y: [18],
        type: "bar",
        hoverinfo: "x+y",
      },
    ],
    layout: {
      yaxis: { title: "Total Worth" },
      xaxis: { title: "Sector Stocks", tickangle: 10 },
    },
  },

  {
    data: [
      {
        x: ["giraffes"],
        y: [20],
        type: "bar",
        hoverinfo: "x+y",
      },
      {
        x: ["orangutans"],
        y: [12],
        type: "bar",
        hoverinfo: "x+y",
      },
      {
        x: ["monkeys"],
        y: [18],
        type: "bar",
        hoverinfo: "x+y",
      },
    ],
    layout: {
      yaxis: { title: "Indices" },
      xaxis: { title: "Sector Stocks", tickangle: 10 },
    },
  },
];
