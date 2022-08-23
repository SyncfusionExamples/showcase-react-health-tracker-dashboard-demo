import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, Legend, SplineAreaSeries, SplineSeries, Tooltip } from '@syncfusion/ej2-react-charts';

function ChartData(props) {
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
  let weightChartMarker = { visible: true, height: 10, width: 10 };

  return (
    <ChartComponent
      className="e-fasting-chart"
      id='charts'
      chartArea={chartArea}
      loaded={props.chartCreated}
      width={chartWidth}
      primaryXAxis={weightChartPrimaryXAxis}
      primaryYAxis={weightChartPrimaryYAxis}
      height={activityChartHeight}
      theme={theme}
      tooltip={weightChartTooltip} >
      <Inject services={[SplineAreaSeries, SplineSeries, DateTime, Legend, Tooltip]} />
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