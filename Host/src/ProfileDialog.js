import React from "react";
import { Browser } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { ButtonComponent, RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TextBoxComponent, SliderComponent } from '@syncfusion/ej2-react-inputs';
import { CircularGaugeComponent, AxesDirective, Gradient, AxisDirective, Inject, Annotations } from '@syncfusion/ej2-react-circulargauge';
import LinearGauge from "./LinearGauge";
function ProfileDialog(props) {
    let animationSettings = { effect: 'Zoom' };
    let theme = 'Tailwind';
    let target = 'body';
    let isDevice = Browser.isDevice;
    let editDialogWidth = isDevice ? '100%' : '1000px';
    let height = isDevice ? '100%' : '100%';
    let editDlgPosition = isDevice ? { X: 'center', Y: 'top' } : { X: 'center', Y: 'center' };
    let showCloseIcon = true;
    let weightGaugeCenterX = isDevice ? '50%' : '50%';
    let weightGaugeCenterY = isDevice ? '50%' : '50%';
    let weightGaugeMinorTicks = {
        width: 0
    };
    let weightGaugeMajorTicks = {
        interval: 10, height: 5, offset: 20, position: 'Inside'
    };
    let ticks = {
        width: 0
    };
    let weightGaugeLineStyle = {
        width: 0
    };
    let weightGaugeBackground = '#FFF7EC';
    let weightGaugeStartAngle = 210;
    let weightGaugeEndangle = 150;
    let weightGaugeMinimum = 0;
    let weightGaugeMaximum = 120;
    let weightGaugeRadius = '85%';
    let weightGaugeLabelStyle = {
        font: {
            fontFamily: 'Roboto',
            size: '0px',
            fontWeight: 'Regular'
        },
        offset: 10
    };

    let mintype = 'MinRange';
    let weightSliderMin = 0;
    let weightSliderMax = 120;
    let currentWtUnit = 'KG';
    let currentHtUnit = 'CM';
    let weightSliderLimit = { enabled: true, minStart: currentWtUnit === 'KG' ? 10 : 20 };
    let heightSliderLimit = { enabled: true, minStart: currentHtUnit === 'CM' ? 30 : 1 };
    let heightSliderMin = 0;
    let heightSliderMax = 200;

    function closeEditDialog() {

    }

    return (
        <DialogComponent className="e-profile-edit-dialog"
            visible={props.hidden}
            animationSettings={animationSettings}
            target={target}
            width={editDialogWidth}
            height={height}
            position={editDlgPosition}
            isModal="true"
            showCloseIcon={showCloseIcon}>
            <div className="e-edit-dialog-container col-md-12 col-sm-12">
                <div className="e-profile-container col-md-6 col-sm-6">
                    <div className="col-md-12 col-sm-12">
                        <div className="e-profile-back" onClick={closeEditDialog}><span className="icon-arrow-left"></span><span
                            className="e-profile-back-text">Back to Dashboard</span></div>
                        <div className="e-profile-title">Profile</div>
                    </div>
                    <div className="e-profile-details col-md-12 col-sm-12">
                        <div className="col-md-3">
                            <div className="e-profile-pic-container e-avatar e-avatar-circle">
                                {/* <img src={imageSecond} alt="JW" /> */}
                            </div>
                        </div>
                        <div className="e-profile-container col-md-9">
                            <div className="e-profile-label">Name</div>
                            <div className="e-profile-value">
                                <TextBoxComponent width={'80%'} value={props.name} input={props.onNameChange} cssClass='e-profile-input'></TextBoxComponent>
                            </div>
                            <div className="e-profile-label">Age</div>
                            <div className="e-age-edit e-profile-value">
                                <div className="e-age-minus icon-minus" onClick={props.ageMinusClick}></div>
                                <div className="e-age-count">{props.profileStats.age}</div>
                                <div className="e-age-plus icon-plus" onClick={props.agePlusClick}></div>
                            </div>
                            <div className="e-profile-label">Weight</div>
                            <div className="e-profile-value">
                                <TextBoxComponent width={'80%'} value={props.profileStats.weight + ' ' + props.profileStats.weightMes} readOnly={true} cssClass='e-profile-input e-weight-text'></TextBoxComponent>
                               
                                <ButtonComponent className="e-weight-change-btn" onClick={props.changeWeight}><span>CHANGE</span><span
                                    className="e-change-right icon-chevron-right"></span></ButtonComponent>
                               
                            </div>
                            <div className="e-profile-label">Set your Goal</div>
                            <div className="e-profile-value">
                                <TextBoxComponent width={'80%'} value={props.profileStats.goal + ' ' + props.profileStats.goalMes} readOnly={true} cssClass='e-profile-input e-weight-text'></TextBoxComponent>
                               
                                <ButtonComponent className="e-goal-change-btn" onClick={props.changeGoal}><span>CHANGE</span><span
                                    className="e-change-right icon-chevron-right"></span></ButtonComponent>
                            </div>
                        </div>
                        <div className="e-profile-label">Height</div>
                        <div className="e-profile-value">
                            <TextBoxComponent width={'80%'} value={props.profileStats.height + ' ' + props.profileStats.heightMes} readOnly={true} cssClass='e-profile-input e-height-text'></TextBoxComponent>
                            <ButtonComponent className="e-height-change-btn" onClick={props.changeHeight}><span>CHANGE</span><span
                                className="e-change-right icon-chevron-right"></span></ButtonComponent>
                        </div>
                        <div className="e-profile-label">Location</div>
                        <div className="e-profile-value">
                            <TextBoxComponent width={'100%'} value={props.profileStats.location} input={props.onLocationChange} cssClass='e-profile-input'></TextBoxComponent>
                          
                        </div>
                        <div className="e-profile-label">Email</div>
                        <div className="e-profile-value">
                            <TextBoxComponent width={'100%'} value={props.profileStats.email} type="email" input={props.onEmailChange} cssClass='e-profile-input'></TextBoxComponent>
                            
                        </div>
                        <div className="e-profile-label">Theme</div>
                        <div className="e-profile-value e-radio-container">
                            <RadioButtonComponent cssClass="e-light-radio" label="Light" name="dashboard-theme" value="Light" checked={true} change={props.changeHandler}></RadioButtonComponent>
                            <RadioButtonComponent cssClass="e-dark-radio" label="Dark" name="dashboard-theme" value="Dark" change={props.changeHandler}></RadioButtonComponent>
                           
                        </div>
                    </div>
                </div>
            </div>
            <div className="e-modify-container col-md-6 col-sm-6">
                <div className="e-modify-title">modifyHeaderTitle</div>
                <div className='e-weight-modify-btn-group e-btn-group e-outline'>
                    <input type="radio" id="KG" name="modifyunit" value="KG" checked={true} onChange={props.handleChange} />
                    <label className="e-btn" >KG</label>
                    <input type="radio" id="LB" name="modifyunit" value="LB" onChange={props.handleChange} />
                    <label className="e-btn" >LB</label>
                </div>
                <div className='e-height-modify-btn-group e-btn-group e-outline e-hidden'>
                    <input type="radio" id="CM" name="modifyunit" value="CM" checked={true} onChange={props.handleChange} />
                    <label className="e-btn">CM</label>
                    <input type="radio" id="FT" name="modifyunit" value="FT" onChange={props.handleChange} />
                    <label className="e-btn">FT</label>
                </div>
                <div className="e-weight-gauge-container">
                    <CircularGaugeComponent
                        id='weightgauge'
                        style={{ display: 'block' }}
                        theme={theme}
                        width='100%'
                        height='300px'
                        centerX={weightGaugeCenterX}
                        centerY={weightGaugeCenterY}
                    >
                        <Inject services={[Annotations, Gradient]} />
                        <AxesDirective>
                            <AxisDirective
                                lineStyle={weightGaugeLineStyle}
                                majorTicks={weightGaugeMajorTicks}
                                minorTicks={weightGaugeMinorTicks}
                                radius={weightGaugeRadius}
                                labelStyle={weightGaugeLabelStyle}
                                minimum={weightGaugeMinimum}
                                maximum={weightGaugeMaximum}
                                startAngle={weightGaugeStartAngle}
                                endAngle={weightGaugeEndangle}
                                ranges={props.weightGaugeRanges}
                                pointers={props.weightGaugePointers}
                                annotations={props.weightGaugeAnnotaions}
                                background={weightGaugeBackground}></AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                    <div className="slider-container">
                        <SliderComponent value={props.profileStats.weight}
                            type={mintype}
                            width="50%"
                            min={weightSliderMin}
                            max={weightSliderMax}
                            change={props.sliderChange}
                            cssClass="weight-slider-container"
                            limits={weightSliderLimit}>
                        </SliderComponent>
                        
                    </div>
                    <div className="e-add-weight">
                        <ButtonComponent cssClass="e-primary" onClick={props.updateWeight}>UPDATE WEIGHT</ButtonComponent>
                    </div>
                    <div className="e-cancel-weight">
                        <ButtonComponent cssClass="e-outline" onClick={props.cancelWeight}>CANCEL</ButtonComponent>
                    </div>
                </div>
                <div className="e-height-gauge-container e-hidden">
                    <div className="e-base-container">
                        <div className="e-height-img-container">
                            <div className="e-age-edit e-profile-height-label">{props.profileStats.height}
                                <span>{props.profileStats.heightMes}</span></div>
                            {/* <img id="height-svg"
                                    src={humanImg} alt="Height" /> */}
                        </div>
                        <LinearGauge  heightGaugeAxes={props.heightGaugeAxes}
                    heightGaugeAnnotation={props.heightGaugeAnnotation}></LinearGauge>
                        <div className="slider-container" >
                            {/* <ejs-slider id="heightrange" #heightrange [value]="profileStats.height" [type]="mintype" width="100px"
                height="300px" (change)="sliderHeightChange($event)" [min]="heightSliderMin" [max]="heightSliderMax"
                [orientation]="orientation" cssclassName="height-slider-container" [limits]="heightSliderLimit">
              </ejs-slider> */}
                        </div>
                    </div>
                    <div className="e-add-height">
                        <ButtonComponent cssClass="e-primary" onClick={props.updateHeight}>UPDATE HEIGHT</ButtonComponent>
                    </div>
                    <div className="e-cancel-height">
                        <ButtonComponent cssClass="e-primary" onClick={props.cancelHeight}>UPDATE HEIGHT</ButtonComponent>
                    </div>
                </div>
            </div>
        </DialogComponent>
    )
}

export default ProfileDialog;