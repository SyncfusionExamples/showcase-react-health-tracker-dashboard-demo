import React from 'react';
import { Browser } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel } from '@syncfusion/ej2-react-charts';

const Profile = React.lazy(() =>
    import('Profile/Profile')
)

function Diet(props) {
    let innerStyle = false;
    if (props.innerWidth < 450) {
        innerStyle = true;
    }
    let isDevice = Browser.isDevice;
    let pieLegendSettings = {
        visible: false,
        position: 'Right',
        width: '60%', height: '20%',
        shapeHeight: 20, shapeWidth: 20
    };
    let pieTooltip = { enable: true };
    let pieChartWidth = '100%';
    let pieChartHeight = isDevice ? '80%' : '80%';
    let center = isDevice ? { x: '50%', y: '50%' } : { x: '50%', y: '50%' };
    let startAngle = 325;
    let endAngle = 325;
    let pieChartRadius = isDevice ? '90%' : '80%';
    let pieExplode = true;
    let dataLabel = {
        visible: true,
        name: 'text',
        font: {
            color: '#303343'
        }
    };

    function onTextRender(args) {
        if (args.point.y > 0) {
            let value = args.point.y / args.series.sumOfPoints * 100;
            args.text = Math.ceil(value) + '%';
        }
    }

    return (
        <div className="e-dashboardlayout-container e-diet-dashboardlayout-container">
            <div className="col-md-9 e-dashboard-content">
                <div className="col-md-12 col-sm-12">
                    <div id="meals-panel-id" className="e-panel e-meals-panel">
                        <div className="e-panel-container">
                            <div className="e-panel-header">
                                <div style={{ float: "left" }} >5 Course Meals</div>
                            </div>
                            <div className="e-meals-card-container e-panel-content">
                                <div className="e-card e-meals-card">
                                    <div className="e-card-header">
                                        <div className="e-card-header-img-container e-breakfast-card-container">
                                            <div className="e-card-header-image icon-Breakfast"></div>
                                        </div>
                                        <div className="e-meals-edit">
                                            {(props.isBreakFastMenuAdded && props.isToday) && 
                                                <div className="e-breakfast-edit icon-edit-2" onClick={props.editMenu}></div>
                                            }
                                        </div>
                                    </div>
                                    <div className="e-card-content">
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-meals-card-title"> Breakfast</div>
                                        </div>
                                        {props.isBreakFastMenuAdded &&
                                            <div>
                                                <div className="e-had-meals">
                                                    <div className="e-meals-value" title="currentBreakFastMenuText">{props.currentBreakFastMenuText}</div>
                                                </div>
                                                <div className="e-calories-gain">{props.currentBreakFastCalories}  <span className="e-card-cal-unit e-add-cal-unit">kcal</span></div>
                                            </div>
                                        }
                                        {!props.isBreakFastMenuAdded &&
                                            <div>
                                                <div className="e-recom-meals-text">Recommended</div>
                                                <div className="e-recom-meals-value">{props.breakFastRecom}<span
                                                    className="e-card-cal-unit">kcal</span>
                                                </div>
                                                <ButtonComponent class="e-add-menu-btn e-breakfast-add-btn" onClick={props.addBtnClick}>ADD MENU</ButtonComponent>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="e-card e-meals-card">
                                    <div className="e-card-header">
                                        <div className="e-card-header-img-container e-snack1-card-container">
                                            <div className="e-card-header-image icon-Snack-1"></div>
                                        </div>

                                        <div className="e-meals-edit">
                                            {(props.isSnack1MenuAdded  && props.isToday) &&
                                                <div className="e-snack1-edit icon-edit-2" onClick={props.editMenu}></div>
                                            }
                                        </div>

                                    </div>
                                    <div className="e-card-content">
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-meals-card-title"> Snack</div>
                                        </div>
                                        {props.isSnack1MenuAdded &&
                                            <div >
                                                <div className="e-had-meals">
                                                    <div className="e-meals-value" title="currentSnack1MenuText"> {props.currentSnack1MenuText} </div>
                                                </div>
                                                <div className="e-calories-gain"> {props.currentSnack1Calories} <span
                                                    className="e-card-cal-unit e-add-cal-unit">kcal</span></div>
                                            </div>
                                        }
                                        {!props.isSnack1MenuAdded &&
                                            <div>
                                                <div className="e-recom-meals-text">Recommended</div>
                                                <div className="e-recom-meals-value"> {props.snack1Recom} <span className="e-card-cal-unit">kcal</span>
                                                </div>
                                                <ButtonComponent className="e-add-menu-btn e-snack1-add-btn" onClick={props.addBtnClick}>ADD MENU</ButtonComponent>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="e-card e-meals-card">
                                    <div className="e-card-header">
                                        <div className="e-card-header-img-container e-lunch-card-container">
                                            <div className="e-card-header-image icon-Lunch"></div>
                                        </div>

                                        <div className="e-meals-edit">
                                            {(props.isLunchMenuAdded && props.isToday) &&
                                                <div className="e-lunch-edit icon-edit-2" onClick={props.editMenu}></div>
                                            }
                                        </div>

                                    </div>
                                    <div className="e-card-content">
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-meals-card-title"> Lunch</div>
                                        </div>
                                        {props.isLunchMenuAdded &&
                                            <div>
                                                <div className="e-had-meals">
                                                    <div className="e-meals-value" title="currentLunchMenuText">{props.currentLunchMenuText}</div>
                                                </div>
                                                <div className="e-calories-gain"> {props.currentLunchCalories} <span className="e-card-cal-unit e-add-cal-unit">kcal</span></div>
                                            </div>
                                        }
                                        {!props.isLunchMenuAdded &&
                                            <div>
                                                <div className="e-recom-meals-text">Recommended</div>
                                                <div className="e-recom-meals-value"> {props.lunchRecom} <span className="e-card-cal-unit">kcal</span>
                                                </div>
                                                <ButtonComponent className="e-add-menu-btn e-lunch-add-btn" onClick={props.addBtnClick}>ADD MENU</ButtonComponent>
                                            </div>}
                                    </div>
                                </div>
                                <div className="e-card e-meals-card">
                                    <div className="e-card-header">
                                        <div className="e-card-header-img-container e-snack2-card-container">
                                            <div className="e-card-header-image icon-Snack-2"></div>
                                        </div>
                                        <div className="e-meals-edit">
                                            {(props.isSnack2MenuAdded && props.isToday) &&
                                                <div className="e-snack2-edit icon-edit-2" onClick={props.editMenu}></div>
                                            }
                                        </div>
                                    </div>
                                    <div className="e-card-content">
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-meals-card-title"> Snack</div>
                                        </div>
                                        {props.isSnack2MenuAdded &&
                                            <div>
                                                <div className="e-had-meals">
                                                    <div className="e-meals-value" title="currentSnack2MenuText"> {props.currentSnack2MenuText} </div>
                                                </div>
                                                <div className="e-calories-gain">{props.currentSnack2Calories} <span
                                                    className="e-card-cal-unit e-add-cal-unit">kcal</span></div>
                                            </div>}
                                        {!props.isSnack2MenuAdded &&
                                            <div>
                                                <div className="e-recom-meals-text">Recommended</div>
                                                <div className="e-recom-meals-value"> {props.snack2Recom} <span className="e-card-cal-unit">kcal</span>
                                                </div>
                                                <ButtonComponent className="e-add-menu-btn e-snack2-add-btn" onClick={props.addBtnClick}>ADD MENU</ButtonComponent>
                                            </div>}
                                    </div>
                                </div>
                                <div className="e-card e-meals-card e-dinner-card">
                                    <div className="e-card-header">
                                        <div className="e-card-header-img-container e-dinner-card-container">
                                            <div className="e-card-header-image icon-Dinner"></div>
                                        </div>

                                        <div className="e-meals-edit">
                                            {(props.isDinnerMenuAdded && props.isToday) &&
                                                <div className="e-dinner-edit icon-edit-2" onClick={props.editMenu}></div>
                                            }
                                        </div>
                                    </div>
                                    <div className="e-card-content">
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-meals-card-title"> Dinner</div>
                                        </div>
                                        {props.isDinnerMenuAdded &&
                                            <div>
                                                <div className="e-had-meals">
                                                    <div className="e-meals-value" title={props.currentDinnerMenuText}> {props.currentDinnerMenuText} </div>
                                                </div>
                                                <div className="e-calories-gain"> {props.currentDinnerCalories}  <span
                                                    className="e-card-cal-unit e-add-cal-unit">kcal</span></div>
                                            </div>}
                                        {!props.isDinnerMenuAdded &&
                                            <div >
                                                <div className="e-recom-meals-text">Recommended</div>
                                                <div className="e-recom-meals-value"> {props.dinnerRecom}  <span className="e-card-cal-unit">kcal</span>
                                                </div>
                                                <ButtonComponent className="e-add-menu-btn e-dinner-add-btn" onClick={props.addBtnClick}>ADD MENU</ButtonComponent>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-sm-12">
                    <div id="diet-chart-panel-id" className="e-panel e-diet-chart-panel" >
                        <div className="e-panel-container">
                            <div className="e-panel-header">
                                <div className="col-lg-5 col-md-3 col-sm-3 col-xs-12 e-diet-panel-header-text">Calorie Diet</div>
                                <div className="col-lg-4 col-md-5 col-sm-5 col-xs-12 e-consumed">
                                    <div className="e-consumed-wrapper-text col-lg-3 col-md-4 col-sm-4 col-xs-4">Consumed Calories</div>
                                    <div className="e-consumed-wrapper-value col-lg-9 col-md-8 col-sm-8 col-xs-6">
                                        <span className="e-consumed-value"> {props.consumedCalories} </span><span
                                            className="e-card-cal-unit e-add-cal-unit"> kcal</span>
                                        <span className="e-card-cal-unit e-add-cal-unit"> /  {props.expectedCalories} kcal</span></div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 e-burned">
                                    <div className="e-consumed-wrapper-text col-lg-4 col-md-4 col-sm-4 col-xs-4">Burned Calories</div>
                                    <div className="e-consumed-wrapper-value col-lg-8 col-md-8 col-sm-8 col-xs-6"> {props.burnedCalories}
                                        <span className="e-card-cal-unit e-add-cal-unit"> kcal</span>
                                    </div>
                                </div>
                            </div>
                            <div className="e-diet-chart-panel-container e-panel-content">
                                <div className="e-chart-parent-div">
                                    <div className="e-pie-chart-container">
                                        <AccumulationChartComponent id='piecontainer' legendSettings={pieLegendSettings} tooltip={pieTooltip} theme={props.theme}
                                            height={pieChartHeight} width={pieChartWidth} center={center} textRender={onTextRender}
                                            enableSmartLabels="true">
                                            <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
                                            <AccumulationSeriesCollectionDirective>
                                                <AccumulationSeriesDirective dataSource={props.pieData} pointColorMapping='fill' xName='x' yName='y' startAngle={startAngle} endAngle={endAngle} innerRadius={'50%'}
                                                    radius={pieChartRadius} dataLabel={dataLabel} explode={pieExplode} explodeOffset='10%'>
                                                </AccumulationSeriesDirective>
                                            </AccumulationSeriesCollectionDirective>
                                        </AccumulationChartComponent>
                                    </div>
                                    <div className="e-nutrition-container">
                                        {innerStyle &&
                                            <table className="e-nutrition-table">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="e-nutrition-text">
                                                                <div className="e-nutrition-img e-nutrition-protein-img"></div>
                                                                <div>PROTEINS</div>
                                                            </div>
                                                            <div className="e-nutrition-value"> {props.currentTotalProteins}  gm</div>
                                                        </td>
                                                        <td>
                                                            <div className="e-nutrition-text">
                                                                <div className="e-nutrition-img e-nutrition-fat-img"></div>
                                                                <div>FAT</div>
                                                            </div>
                                                            <div className="e-nutrition-value"> {props.currentTotalFat}  gm</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="e-nutrition-text">
                                                                <div className="e-nutrition-img e-nutrition-carbo-img"></div>
                                                                <div>CARBOHYDRATES</div>
                                                            </div>
                                                            <div className="e-nutrition-value"> {props.currentTotalCarbs}  gm</div>
                                                        </td>
                                                        <td>
                                                            <div className="e-nutrition-text">
                                                                <div className="e-nutrition-img e-nutrition-calcium-img"></div>
                                                                <div>CALCIUM</div>
                                                            </div>
                                                            <div className="e-nutrition-value">
                                                                {props.currentTotalCalcium < 1 ? (props.currentTotalCalcium * 1000) + ' mg' : props.currentTotalCalcium + ' gm'}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="e-nutrition-text">
                                                                <div className="e-nutrition-img e-nutrition-sodium-img"></div>
                                                                <div>SODIUM</div>
                                                            </div>
                                                            <div className="e-nutrition-value">
                                                                {props.currentTotalSodium < 1 ? (props.currentTotalSodium * 1000) + ' mg' : props.currentTotalSodium + ' gm'}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="e-nutrition-text">
                                                                <div className="e-nutrition-img e-nutrition-iron-img"></div>
                                                                <div>IRON</div>
                                                            </div>
                                                            <div className="e-nutrition-value">
                                                                {props.currentTotalIron < 1 ? (props.currentTotalIron * 1000) + ' mg' : props.currentTotalIron + ' gm'}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>}
                                        {!innerStyle &&
                                            <table className="e-nutrition-table">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="e-nutrition-text">
                                                                <div className="e-nutrition-img e-nutrition-protein-img"></div>
                                                                <div>PROTEINS</div>
                                                            </div>
                                                            <div className="e-nutrition-value"> {props.currentTotalProteins}  gm</div>
                                                        </td>
                                                        <td>
                                                            <div className="e-nutrition-text">
                                                                <div className="e-nutrition-img e-nutrition-fat-img"></div>
                                                                <div>FAT</div>
                                                            </div>
                                                            <div className="e-nutrition-value"> {props.currentTotalFat}  gm</div>
                                                        </td>
                                                        <td>
                                                            <div className="e-nutrition-text">
                                                                <div className="e-nutrition-img e-nutrition-carbo-img"></div>
                                                                <div>CARBOHYDRATES</div>
                                                            </div>
                                                            <div className="e-nutrition-value"> {props.currentTotalCarbs}  gm</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="e-nutrition-text">
                                                                <div className="e-nutrition-img e-nutrition-calcium-img"></div>
                                                                <div>CALCIUM</div>
                                                            </div>
                                                            <div className="e-nutrition-value">
                                                                {props.currentTotalCalcium < 1 ? (props.currentTotalCalcium * 1000) + ' mg' : props.currentTotalCalcium + ' gm'}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="e-nutrition-text">
                                                                <div className="e-nutrition-img e-nutrition-sodium-img"></div>
                                                                <div>SODIUM</div>
                                                            </div>
                                                            <div className="e-nutrition-value">
                                                                {props.currentTotalSodium < 1 ? (props.currentTotalSodium * 1000) + ' mg' : props.currentTotalSodium + ' gm'}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="e-nutrition-text">
                                                                <div className="e-nutrition-img e-nutrition-iron-img"></div>
                                                                <div>IRON</div>
                                                            </div>
                                                            <div className="e-nutrition-value">
                                                                {props.currentTotalIron < 1 ? (props.currentTotalIron * 1000) + ' mg' : props.currentTotalIron + ' gm'}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        }
                                    </div>
                                </div>
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

export default Diet;