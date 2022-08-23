import React from 'react';
import HeartRate from './assets/Profile/Heart-1.svg';
import { Browser } from '@syncfusion/ej2-base';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Crosshair, SplineSeries, DateTime, Legend, Tooltip, SplineAreaSeries } from '@syncfusion/ej2-react-charts';
import { ColumnDirective, ColumnsDirective, GridComponent, onResize } from '@syncfusion/ej2-react-grids';

const Profile = React.lazy(() =>
    import('Profile/Profile')
)

function Activities(props) {
    var theme = 'Tailwind';
    let chartArea = {
        border: {
            width: 0,
        },
    };
    let primaryXAxis = {
        valueType: 'DateTime',
        labelFormat: 'MMM dd',
        intervalType: 'Days',
        interval: 1,
        edgeLabelPlacement: 'Shift',
        labelIntersectAction: 'Hide',
        labelStyle: {
            size: '16px',
            color: '#56648A',
            fontFamily: 'Inter',
            fontWeight: '500',
        },
        majorGridLines: {
            width: 0,
        },
    };
    let primaryYAxis = {
        labelFormat: '{value}%',
        maximum: 100,
        interval: 50,
        labelStyle: {
            size: '16px',
            color: '#56648A',
            fontFamily: 'Inter',
            fontWeight: '500',
        },
        majorGridLines: {
            dashArray: '10,5',
        },
    };
    let activityChartHeight = '70%';
    let legendSettings = { position: 'Top' };
    let tooltip = {
        enable: true,
        shared: true,
        format: '${series.name} : ${point.y}',
        textStyle: { fontFamily: 'Inter' },
    };
    let crosshair = { enable: true, lineType: 'Vertical', dashArray: "10,5", line: { color: '#EE4769' } };
    let marker = { visible: true, height: 10, width: 10 };
    
    let gridInstance;
    let dropDownInstance;
    let chartInstance;


    return (
        <div>
        {props.isSmallDevice && 
        <div  className="e-tab-header-mobile-icon-container">
        <div className="e-tab-header-icon-div">
          <span className="e-tab-header-icon icon-Logo"></span>
        </div>
        <div className="e-tab-title">GO<span>FIT</span></div>
        </div>}
        {props.isSmallDevice && <div className="separator-div"></div>}
        <div className="e-dashboardlayout-container  e-activity-dashboardlayout-container">
            <div className="col-md-9 e-dashboard-content">
                <div className="col-md-12 col-sm-12">
                    <div id="activity-panel-id" className="e-panel e-my-activities-panel" data-row="0" data-col="0">
                        <div className="e-panel-container">
                            <div className="e-panel-header col-md-12 col-sm-12 col-xs-12 col-lg-12">
                                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-3 e-my-activities-header">My Activities</div>
                                <div className="col-md-3 col-sm-6 col-xs-6 col-lg-3 e-my-activities-date">
                                    <DatePickerComponent id="datepicker" value = {props.datePickerDate} max={props.maxDate} width={props.datePickerWidth} change={props.onDateChange} />
                                </div>
                            </div>
                            <div className="e-panel-content e-activity-card-container">
                                <div tabIndex={0} className="e-card e-heart-rate-card">
                                    <div className="e-card-header" style={{ width: "100%" }}>
                                        <div className="e-card-header-image icon-Heart e-card-corner"></div>
                                        <div className="e-card-header-caption" style={{ width: "100%" }}>
                                            <div>
                                                <div className="e-card-header-title e-activity-card-title"> Heart Rate</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="e-card-content">
                                        <div className="e-bpm-value">{props.heartRate}<span> bpm</span></div>
                                        <div className="e-progress-annotation"> <img src={HeartRate} alt="HeartRate" /></div>
                                    </div>
                                </div>
                                <div tabIndex={0} className="e-card e-steps-card">
                                    <div className="e-card-header" style={{ width: "100%" }}>
                                        <div className="e-card-header-image icon-Steps e-card-corner"></div>
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-steps-card-title"> Steps</div>
                                        </div>
                                    </div>
                                    <div className="e-card-content" >
                                        <div className="e-activity-actual">{props.steps}</div>
                                        <div className="e-activity-goal">6000</div>
                                    </div>
                                </div>
                                <div tabIndex={0} className="e-card e-calories-card">
                                    <div className="e-card-header" style={{ width: "100%" }}>
                                        <div className="e-card-header-image icon-Calories e-card-corner"></div>
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-calories-card-title"> Calories</div>
                                        </div>
                                    </div>
                                    <div className="e-card-content">
                                        <div className="e-activity-actual">{props.consumedCalories}
                                            <span className="e-activity-actual-unit"> kcal</span>
                                        </div>
                                        <div className="e-activity-goal">{props.expectedCalories} kcal</div>
                                    </div>
                                </div>
                                <div tabIndex={0} className="e-card e-sleep-card">
                                    <div className="e-card-header" style={{ width: "100%" }}>
                                        <div className="e-card-header-image icon-Sleep e-card-corner"></div>
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-sleep-card-title"> Sleep</div>
                                        </div>
                                    </div>
                                    <div className="e-card-content">
                                        <div className="e-activity-actual">{props.sleepInHours}</div>
                                        <div className="e-activity-goal">8h</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-sm-12">
                    <div id="activity-chart-panel-id" className="e-panel e-activity-panel" >
                        <div className="e-panel-container">
                            <div className="e-panel-header col-md-12 col-sm-12 col-xs-12 col-lg-12">
                                <div className="col-md-5 col-sm-6 col-xs-8 col-lg-4 e-activity-chart-header-text">Activity Statistics</div>
                                <div className="e-chart-dropdown col-md-3 col-sm-4 col-xs-4 col-lg-3">
                                    <DropDownListComponent id='chartdropdown' dataSource={props.dropDownData} index='0' change={props.onDropDownChange} ref={(dropdownlist) => { dropDownInstance = dropdownlist }} />
                                </div>
                            </div>
                            <div className="e-chart-panel-content">
                                <ChartComponent
                                    className="e-activity-chart"
                                    chartArea={chartArea}
                                    width={'100%'}
                                    primaryXAxis={primaryXAxis}
                                    primaryYAxis={primaryYAxis}
                                    height={activityChartHeight}
                                    legendSettings={legendSettings}
                                    theme={theme}
                                    tooltip={tooltip}
                                    crosshair={crosshair}
                                    legendClick={props.legendClick}
                                    sharedTooltipRender={props.chartTooltipRender}
                                    ref={(chartIns) => { chartInstance = chartIns }}>
                                    <Inject services={[SplineSeries, DateTime, Legend, Tooltip, Crosshair, SplineAreaSeries]} />
                                    <SeriesCollectionDirective>
                                        <SeriesDirective
                                            dataSource={props.chartDietData}
                                            legendShape='Circle'
                                            type='Spline'
                                            fill="#2084FE"
                                            xName="x"
                                            yName="y"
                                            name='Diet'
                                            marker={marker}
                                            width={'4'} >
                                        </SeriesDirective>
                                        <SeriesDirective
                                            dataSource={props.chartData}
                                            legendShape='Circle'
                                            type='Spline'
                                            fill="#F547A8"
                                            xName="x"
                                            yName="y"
                                            name='Workout'
                                            marker={marker}
                                            width={'4'} >
                                        </SeriesDirective>
                                        <SeriesDirective
                                            dataSource={props.chartDietData}
                                            type='SplineArea'
                                            fill='url(#gradient-diet-chart)'
                                            xName="x"
                                            yName="y" >
                                        </SeriesDirective>
                                        <SeriesDirective
                                            dataSource={props.chartData}
                                            type='SplineArea'
                                            fill='url(#gradient-activity-chart)'
                                            xName="x"
                                            yName="y" >
                                        </SeriesDirective>
                                    </SeriesCollectionDirective>
                                </ChartComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-sm-12">
                    <div id="workout-panel-id" className="e-panel e-workout-panel" data-row="2" data-col="0">
                        <div className="e-panel-container">
                            <div className="e-panel-header">
                                <div>Recent Workout</div>
                            </div>
                            <div>
                                <GridComponent dataSource={props.gridData} gridLines='None' rowHeight={60} queryCellInfo={props.customiseCell} width={'100%'} height={'100%'} ref={(gridIns) => { gridInstance = gridIns }}>
                                    <ColumnsDirective>
                                        <ColumnDirective field='Workout' headerText='Workout' textAlign='Left' width="200" />
                                        <ColumnDirective field='Distance' headerText='Distance (kms)' textAlign='Left' width="200" format="###.# km" />
                                        <ColumnDirective field='Duration' headerText='Duration (minutes)' textAlign='Left' width="200" format='### mins' />
                                        <ColumnDirective field='Date' headerText='Date & Time' textAlign='Left' width="200" format="MMM dd,yyyy hh:mm a" />
                                        <ColumnDirective field='Completion' headerText='Completion' textAlign='Left' width="200" format="###'%'" />
                                    </ColumnsDirective>
                                </GridComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!props.isSmallDevice &&
                  <div className="col-md-3">
                  <React.Suspense fallback="Loading">
                      <Profile currentDate={props.datePickerDate} maxDate={props.maxDate} activities = {props.todayActivities} profileStats = {props.profileStats} onProfileDateChange={props.onProfileDateChange}></Profile>
                  </React.Suspense>
              </div>
            }
        </div>
        </div>
    )

}

export default Activities;