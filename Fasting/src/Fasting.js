import React from "react";
import CircularGuage from "./CircularGuage";
import LinearGuage from "./LinearGuage";
import ChartData from "./ChartData";

const Profile = React.lazy(() =>
    import('Profile/Profile')
)

function Fasting(props) {
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
                                    <CircularGuage circularGuage={props.circularGuage} fastingGaugeLoaded={props.fastingGaugeLoaded} theme={props.theme} cirucularGuageResized={props.cirucularGuageResized}></CircularGuage>
                                    <div className="e-fasting-label-container">
                                        <div>Started Fasting</div>
                                        <div>End Fasting</div>
                                    </div>
                                    <div className="e-fasting-value-container">
                                        <div> {props.fastStartTime} </div>
                                        <div> {props.fastEndTime} </div>
                                    </div>
                                    <div className="e-fasting-button-container">
                                        <button className="e-fast-time-btn" onClick={props.modifyFasting} width="100%">{props.changeTimeBtnText}</button>
                                        <button className="e-fast-end-btn" width="100%" onClick={props.clearFasting}>END FASTING</button>
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
                                    <LinearGuage waterGaugeAnnotation={props.waterGaugeAnnotation} waterGaugeAxes={props.waterGaugeAxes} theme={props.theme}></LinearGuage>
                                    <div className="e-water-label-container">
                                        <div className="e-water-minus icon-minus" onClick={props.minusClick}></div>
                                        <div className="e-water-image icon-Water"></div>
                                        <div className="e-water-count">X  {props.consumedWaterCount} </div>
                                        <div className="e-water-plus icon-plus" onClick={props.plusClick}></div>
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
                                <ChartData weightChartData={props.weightChartData} theme={props.theme}></ChartData>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!props.isSmallDevice &&
                <div className="col-md-3">
                    <React.Suspense fallback>
                        <Profile currentDate={props.datePickerDate} maxDate={props.maxDate} activities={props.todayActivities} profileStats={props.profileStats} onProfileDateChange={props.onProfileDateChange} onProfileEdit={props.onProfileEdit}></Profile>
                    </React.Suspense>
                </div>}
        </div>
    )
}

export default Fasting;