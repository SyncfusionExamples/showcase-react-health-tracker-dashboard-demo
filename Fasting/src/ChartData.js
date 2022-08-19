import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, Legend, SplineAreaSeries, SplineSeries, Tooltip } from '@syncfusion/ej2-react-charts';

function ChartData(props) {
    let today = new Date();
let currentDate = today;
let chartArea = {
    border: {
      width: 0
    }
};
let chartWidth = '100%';
let weightChartPrimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'MMM',
    edgeLabelPlacement: 'Shift',
    labelStyle: {
      size: '16px', color: '#56648A',
      fontFamily: 'Inter', fontWeight: '500'
    },
    majorGridLines: {
      width: 0
    },
  };
  let weightChartPrimaryYAxis = {
    labelFormat: '{value} KG',
    maximum: 120,
    interval: 20,
    minimum: 0,
    labelStyle: {
      size: '16px', color: '#56648A',
      fontFamily: 'Inter', fontWeight: '500'
    },
    majorGridLines: {
      dashArray: "10,5"
    }
  };
  let activityChartHeight = '70%';
  let theme = 'Tailwind';
  let weightChartTooltip = { enable: true };
  //let weightChartData = getWeightChartData();
  let weightChartMarker = { visible: true, height: 10, width: 10 };
//   function   getWeightChartData() {
//     let count = 12;
//     let sampleData = [];
//     for (let i = count - 1; i >= 0; i--) {
//       let date = (currentDate) ? new Date(currentDate) : new Date();
//       let data = {
//         x: new Date(date.setMonth(date.getMonth() - i)),
//         y: Math.round(70 + (i * (Math.random() * (3.5 - 2) + 2)))
//       };
//       sampleData.push(data);
//     }
//     return sampleData;
// }

    return (
        <ChartComponent 
                    className="e-fasting-chart"
                    id='charts' 
                    chartArea={chartArea} 
                    width={chartWidth} 
                    primaryXAxis={weightChartPrimaryXAxis} 
                    primaryYAxis={weightChartPrimaryYAxis}
                    height={activityChartHeight} 
                    theme={theme} 
                    tooltip={weightChartTooltip} >
                        <Inject services={[SplineAreaSeries, SplineSeries, DateTime, Legend, Tooltip]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective  
                            dataSource={props.weightChartData} 
                            type='SplineArea'  
                            fill='url(#gradient-chart)'
                            xName='x'
                            yName='y'>
                            </SeriesDirective>
                            <SeriesDirective 
                            dataSource={props.weightChartData} 
                            type='Spline' 
                            fill="#8983F1" 
                            xName='x' 
                            yName='y'
                            width="3" 
                            marker={weightChartMarker}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
    )
}

export default ChartData;