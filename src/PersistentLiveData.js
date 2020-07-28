import React, { useState, useEffect, useRef } from "react";
import HistogramChart from "./HistogramChart";
import { Grid } from "semantic-ui-react";

function PersistentLiveData(props) {
  const [chartData, setChartData] = useState([]);
  const titles = useRef(null);
  var cummUniqueVals = [];
  var newCandleData;
  titles.current = [
    {
      slider: false,
      legend: false,
      title: "AJANTPHARM PRICES",
      plain: true,
    },
    {
      slider: false,
      legend: false,
      title: "SECTOR VOLUMES",
      plain: true,
    },
    {
      slider: false,
      legend: false,
      title: "SECTOR TRADING WORTH",
      plain: true,
    },
    {
      slider: false,
      legend: false,
      title: "ALL SECTOR INDICES",
      plain: true,
    },
  ];

  useEffect(() => {
    if (props.candleData && props.candleData.length !== 0) {
      newCandleData = props.candleData[props.candleData.length - 1];
      var val = ["open", "high", "low", "close"];
      var unique_vals = [];
      var flag = 0;
      unique_vals.push(newCandleData[val[0]]);
      for (var j = 1; j < 4; j++) {
        for (var i = 0; i < unique_vals.length; i++) {
          if (newCandleData[val[j]] === unique_vals[i]) {
            flag = 1;
          }
        }
        if (!flag) {
          unique_vals.push(newCandleData[val[j]]);
        }
        flag = 0;
      }
      cummUniqueVals.push(...unique_vals);
      setChartData([...chartData, ...cummUniqueVals]);
    }
  }, [props.candleData]);

  const histComponents = titles.current.map((chart, index) => (
    <HistogramChart
      key={index}
      index={index}
      data={chartData}
      slider={chart.slider}
      legend={chart.legend}
      title={chart.title}
      plain={chart.plain}
    />
  ));

  return (
    <div id="histogram-charts">
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>{histComponents[0]}</Grid.Column>
          <Grid.Column width={8}>{histComponents[1]}</Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>{histComponents[2]}</Grid.Column>
          <Grid.Column width={8}>{histComponents[3]}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default PersistentLiveData;
