import React, { useEffect } from "react";

function Chart (props) {

    useEffect(() => {
        if(props.candleSeries.current != null && props.volumeSeries.current != null && props.totalWorthSeries.current != null){
            props.candleSeries.current.setData(props.candleData);
            props.volumeSeries.current.setData(props.volumeData);
            props.totalWorthSeries.current.setData(props.totalWorthData);
        }
    }, [props.candleData, props.volumeData]);

    return (
        <div>
            <div ref={props.chartRef} className="top-half"></div>
            <div>
                <p style={{paddingLeft: 10, margin: 0, color: 'rgb(129, 129, 129)'}}>TOTAL WORTH</p>
                <div ref={props.chartRef2} className="bottom-half"></div> 
            </div>
        </div>
    )
}

export default Chart;


