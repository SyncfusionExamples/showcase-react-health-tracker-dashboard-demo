import React from "react";
import CircularGuage from "./CircularGuage";
import LinearGuage from "./LinearGuage";
import ChartData from "./ChartData";

const Profile = React.lazy(() =>
    import('Profile/Profile')
)

function Fasting(props) {
    let changeTimeBtnText = "CHANGE TIME";
    // let isDevice = Browser.isDevice;
    // let theme = 'Tailwind';
    // let style = {
    //     display: 'block',
    // }
    // let circularGaugeRadius = isDevice ? '100%' : '100%';
    // let majorTicks = {
    //     interval: 20,
    //     height: 5,
    //     color: '#FFFFFF',
    // };
    // let minorTicks = {
    //     height: 0,
    //     interval: 20,
    //     color: '#FFFFFF',
    // };
    // let gaugeLabelStyle = {
    //     position: 'Inside', useRangeColor: true,
    //     font: { size: '0px', color: 'white', fontFamily: 'Roboto', fontStyle: 'Regular' }
    // };
    // let lineStyle = {
    //     width: 0
    // };

    // let pointerRadialGradient = {
    //     startValue: '0%',
    //     endValue: '100%',
    //     colorStop: [
    //         { color: '#FB5F64', offset: '0%', opacity: 0.9 },
    //         { color: '#FC9662', offset: '70%', opacity: 0.9 }]
    // };

    // let ranges = [
    //     {
    //         start: 0,
    //         end: 100,
    //         radius: '100%',
    //         startWidth: 30,
    //         endWidth: 30,
    //         color: '#E1E9ED',
    //         roundedCornerRadius: 15,
    //     },
    //     {
    //         start: 0,
    //         end: 100,
    //         radius: '100%',
    //         startWidth: 30,
    //         endWidth: 30,
    //         color: '#CDD9E0',
    //         roundedCornerRadius: 15,
    //         linearGradient: pointerRadialGradient,
    //     },
    //     {
    //         start: 2,
    //         end: 98,
    //         radius: '91%',
    //         startWidth: 5,
    //         endWidth: 5,
    //         roundedCornerRadius: 2,
    //         color: '#FFFFFF',
    //         opacity: 0.35
    //     },
    // ];
    // let pointers = [
    //     {
    //         value: 80,
    //         height: 12,
    //         width: 12,
    //         placement: 'Near',
    //         offset: -20,
    //         markerType: 'Triangle',
    //         color: '#FFFFFF',
    //     },
    // ];

    // let annotaions = isDevice ? [{
    //     angle: 0,
    //     zIndex: '1',
    //     radius: '0%'
    // },
    // {
    //     zIndex: '1',
    //     radius: '91%',
    //     angle: 350,
    //     content: '<div class="e-gauge-percent-img icon-Calories"></div>'
    // },
    // {
    //     zIndex: '1',
    //     radius: '91%',
    //     angle: 60,
    //     content: '<div class="e-gauge-status-img icon-Diet"></div>'
    // },
    // {
    //     zIndex: '1',
    //     radius: '91%',
    //     angle: 280,
    //     content: '<div class="e-gauge-status-img icon-Thunder"></div>'
    // }] : [{
    //     angle: 0,
    //     zIndex: '1',
    //     radius: '0%'
    // },
    // {
    //     zIndex: '1',
    //     radius: '90%',
    //     angle: 350,
    //     content: '<div class="e-gauge-percent-img icon-Calories"></div>'
    // },
    // {
    //     zIndex: '1',
    //     radius: '89%',
    //     angle: 60,
    //     content: '<div class="e-gauge-status-img icon-Diet"></div>'
    // },
    // {
    //     zIndex: '1',
    //     radius: '89%',
    //     angle: 280,
    //     content: '<div class="e-gauge-status-img icon-Thunder"></div>'
    // }];


    // let consumedWaterAmount = 600;
    // let expectedWaterAmount = 2400;
    // let waterGaugeContainer = {
    //     width: 50,
    //     roundedCornerRadius: 35,
    //     type: 'RoundedRectangle',
    //     backgroundColor: '#3993F5',
    // };

    // let waterGaugeAxes = [
    //     {
    //         minimum: 0,
    //         maximum: 100,
    //         line: {
    //             width: 0,
    //         },
    //         labelStyle: {
    //             font: {
    //                 opacity: 0,
    //             },
    //         },
    //         majorTicks: {
    //             interval: 10,
    //             color: '#3993F5',
    //             offset: 5,
    //         },
    //         minorTicks: {
    //             interval: 2,
    //             color: '#3993F5',
    //             offset: 5,
    //         },
    //         opposedPosition: true,
    //         pointers: [
    //             {
    //                 value: Math.round((consumedWaterAmount / expectedWaterAmount) * 100),
    //                 height: 50,
    //                 width: 50,
    //                 roundedCornerRadius: 35,
    //                 type: 'Bar',
    //                 color: '#61a9f7',
    //             },
    //             {
    //                 value: 8,
    //                 width: 5,
    //                 height: 5,
    //                 offset: -60,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 8 ? 1 : 0
    //             },
    //             {
    //                 value: 15,
    //                 width: 4,
    //                 height: 4,
    //                 offset: -80,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 15 ? 1 : 0
    //             },
    //             {
    //                 value: 21,
    //                 width: 7,
    //                 height: 7,
    //                 offset: -75,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 21 ? 1 : 0
    //             },
    //             {
    //                 value: 27,
    //                 width: 8,
    //                 height: 8,
    //                 offset: -65,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 27 ? 1 : 0
    //             },
    //             {
    //                 value: 37,
    //                 width: 4,
    //                 height: 4,
    //                 offset: isDevice ? -85 : -55,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 37 ? 1 : 0
    //             },
    //             {
    //                 value: 42,
    //                 width: 6,
    //                 height: 6,
    //                 offset: -75,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 42 ? 1 : 0
    //             },
    //             {
    //                 value: 48,
    //                 width: 8,
    //                 height: 8,
    //                 offset: isDevice ? -80 : -58,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 48 ? 1 : 0
    //             },
    //             {
    //                 value: 56,
    //                 width: 5,
    //                 height: 5,
    //                 offset: -72,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 56 ? 1 : 0
    //             },
    //             {
    //                 value: 64,
    //                 width: 6,
    //                 height: 6,
    //                 offset: -79,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 64 ? 1 : 0
    //             },
    //             {
    //                 value: 72,
    //                 width: 8,
    //                 height: 8,
    //                 offset: isDevice ? -85 : -55,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 72 ? 1 : 0
    //             },
    //             {
    //                 value: 80,
    //                 width: 5,
    //                 height: 5,
    //                 offset: -70,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 80 ? 1 : 0
    //             },
    //             {
    //                 value: 86,
    //                 width: 6,
    //                 height: 6,
    //                 offset: -77,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 86 ? 1 : 0
    //             },
    //             {
    //                 value: 94,
    //                 width: 8,
    //                 height: 8,
    //                 offset: isDevice ? -80 : -54,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 94 ? 1 : 0
    //             },
    //         ],
    //     },
    // ];
    // let gaugeOrientation = isDevice ? 'Vertical' : 'Horizontal';
    // let gaugeHeight = isDevice ? '100%' : '250px';
    // let gaugeWidth = '100%';
    // let waterGaugeAnnotation = isDevice ? [
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Poor</div>',
    //         axisIndex: 0,
    //         axisValue: 5,
    //         x: 60,
    //         zIndex: '1',
    //     },
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Good</div>',
    //         axisIndex: 0,
    //         axisValue: 40,
    //         x: 60,
    //         zIndex: '1',
    //     },
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Almost</div>',
    //         axisIndex: 0,
    //         axisValue: 70,
    //         x: 60,
    //         zIndex: '1',
    //     },
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Perfect!</div>',
    //         axisIndex: 0,
    //         axisValue: 95,
    //         x: 60,
    //         zIndex: '1',
    //     },
    // ] : [
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Poor</div>',
    //         axisIndex: 0,
    //         axisValue: 5,
    //         y: 50,
    //         zIndex: '1',
    //     },
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Good</div>',
    //         axisIndex: 0,
    //         axisValue: 40,
    //         y: 50,
    //         zIndex: '1',
    //     },
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Almost</div>',
    //         axisIndex: 0,
    //         axisValue: 70,
    //         y: 50,
    //         zIndex: '1',
    //     },
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Perfect!</div>',
    //         axisIndex: 0,
    //         axisValue: 95,
    //         y: 50,
    //         zIndex: '1',
    //     },
    // ];

    return (
        <div className="e-dashboardlayout-container e-fasting-dashboardlayout-container">
            <div className="col-md-9 e-fasting-gauge-container  e-dashboard-content">
                <div className="e-fasting-header">Fasting</div>
                <div className="col-md-12 col-sm-12">
                    <div className="col-md-5 e-fasting-panel-container">
                        <div id="fasting-panel-id" className="e-panel e-fasting-panel">
                            <div className="e-panel-container">
                                <div className="e-panel-header">
                                    <div className="e-fasting-panel-header-text">Fasting</div>
                                </div>
                                <div className="e-panel-content">
                                    <CircularGuage></CircularGuage>
                                    {/* <CircularGaugeComponent
                                        id="range-container"
                                        theme={theme}
                                        style={style}
                                        width='100%'
                                        height='300px'
                                        centerX='50%'
                                        centerY='50%'
                                    >
                                        <Inject services={[Annotations]} />
                                        <AxesDirective>
                                            <AxisDirective
                                                minimum='0'
                                                radius={circularGaugeRadius}
                                                maximum='100'
                                                startAngle='5'
                                                endAngle='355'
                                                majorTicks={majorTicks}
                                                labelStyle={gaugeLabelStyle}
                                                lineStyle={lineStyle}
                                                minorTicks={minorTicks}
                                                ranges={ranges}
                                                pointers={pointers}
                                                annotations={annotaions}></AxisDirective>
                                        </AxesDirective>
                                    </CircularGaugeComponent> */}
                                    <div className="e-fasting-label-container">
                                        <div>Started Fasting</div>
                                        <div>End Fasting</div>
                                    </div>
                                    <div className="e-fasting-value-container">
                                        <div> fastStartTime </div>
                                        <div> fastEndTime </div>
                                    </div>
                                    <div className="e-fasting-button-container">
                                        <button className="e-fast-time-btn" width="100%">{changeTimeBtnText}</button>
                                        <button className="e-fast-end-btn" width="100%">END FASTING</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 e-water-panel-container">
                        <div id="water-panel-id" className="e-panel e-water-panel">
                            <div className="e-panel-container">
                                <div className="e-panel-header">
                                    <div className="e-water-panel-header-text">Water</div>
                                </div>
                                <div className="e-panel-content">
                                    <LinearGuage ></LinearGuage>
                                    {/* <LinearGaugeComponent id='gauge'
                                        style={style}
                                        container={waterGaugeContainer}
                                        axes={waterGaugeAxes}
                                        width={gaugeWidth}
                                        height={gaugeHeight}
                                        orientation={gaugeOrientation}
                                        annotations={waterGaugeAnnotation}
                                        centerX='10%'
                                        centerY='50%'
                                        theme={theme}>
                                        <Inject services={[Annotations]} />
                                    </LinearGaugeComponent> */}
                                    <div className="e-water-label-container">
                                        <div className="e-water-minus icon-minus"></div>
                                        <div className="e-water-image icon-Water"></div>
                                        <div className="e-water-count">X  {props.consumedWaterCount} </div>
                                        <div className="e-water-plus icon-plus" ></div>
                                    </div>
                                    <div className="e-water-value-container">
                                        <div className="e-water-consumed-text">CONSUMED WATER</div>
                                        <div className="e-water-consumed-value"> {props.consumedWaterAmount} <span
                                            className="e-water-consumed-expect">
                                            ml /  {props.expectedWaterAmount}  ml</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div id="fasting-chart-panel-id" className="e-panel e-fasting-chart-panel">
                        <div className="e-panel-container">
                            <div className="e-panel-header">
                                <div className="e-weight-chart-header-text">Weight Journey</div>
                            </div>
                            <div className="e-panel-content">
                                <ChartData weightChartData = {props.weightChartData}></ChartData>
                                {/* <ejs-chart #weightchart className="e-weight-chart" [chartArea]='chartArea' [width]='chartWidth'
                    [primaryXAxis]='weightChartPrimaryXAxis' [primaryYAxis]='weightChartPrimaryYAxis'
                    [height]="activityChartHeight" [theme]="theme" [tooltip]='weightChartTooltip'>
                    <e-series-collection>
                      <e-series [dataSource]='weightChartData' type='SplineArea' fill='url(#gradient-chart)' xName='x'
                        yName='y'></e-series>
                      <e-series [dataSource]='weightChartData' type='Spline' fill="#8983F1" xName='x' yName='y'
                        width="3" [marker]="weightChartMarker">
                      </e-series>
                    </e-series-collection>
                  </ejs-chart> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!props.isSmallDevice &&
                <div className="col-md-3">
                    <React.Suspense fallback="Loading">
                        <Profile currentDate={props.datePickerDate} maxDate={props.maxDate} activities={props.todayActivities} profileStats={props.profileStats} onProfileDateChange={props.onProfileDateChange}></Profile>
                    </React.Suspense>
                </div>}
        </div>
    )
}

export default Fasting;