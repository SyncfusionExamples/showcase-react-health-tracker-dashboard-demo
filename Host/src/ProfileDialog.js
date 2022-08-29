import React from "react";
import { Browser } from '@syncfusion/ej2-base';
import LightHuman from './assets/Profile/LightHuman.svg';
import DarkHuman from './assets/Profile/DarkHuman.svg';
import ProfilePicture from './assets/Profile/02.png';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { ButtonComponent, RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TextBoxComponent, SliderComponent } from '@syncfusion/ej2-react-inputs';
import { CircularGaugeComponent, AxesDirective, Gradient, AxisDirective, Inject, Annotations } from '@syncfusion/ej2-react-circulargauge';
import LinearGauge from "./LinearGauge";
function ProfileDialog(props) {
    let weightGaugeBackground =  props.theme == 'Tailwind' ? '#FFF7EC' : '#414255';
    let humanImage = props.theme == 'Tailwind' ? LightHuman : DarkHuman;
    let animationSettings = { effect: 'Zoom' };
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

    let heightGaugeAnnotation = [{
        content: '<div className="e-height-gauge-annotation">' + props.profileStats.height + props.profileStats.heightMes + '</div>',
        axisIndex: 0,
        axisValue: props.profileStats.height,
        x: -50,
        y: 0, zIndex: '1'
    }
    ];

    let weightGaugeAnnotaions = [{
        content: '<div className="e-weight-gauge-annotation">' + props.profileStats.weight + props.profileStats.weightMes + '</div>',
        radius: '85%', angle: 180, zIndex: '1'
    }];

    let rangeLinearGradient = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#4075F2', offset: '0%' },
            { color: '#FB9906', offset: '35%' },
            { color: '#F9623A', offset: '70%' },
            { color: '#C24287', offset: '100%' },
        ]
    };
    let weightGaugeRanges = [{
        start: 0, end: props.profileStats.weight, startWidth: 18, endWidth: 18, color: '#F43F5E',
        linearGradient: rangeLinearGradient,
        roundedCornerRadius: 10
    }];
    let weightGaugePointers = [{
        animation: { enable: false }, value: props.profileStats.weight, radius: '85%', color: '#F43F5E',
        pointerWidth: 12,
        cap: { radius: 12, color: '#F0D9BC' }
    }];
    let heightGaugePointerLinearGradient = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#B2CFE0', offset: '0%', opacity: 0.5 },
        ],
    };

    let heightGaugeAxes = [
        {
            minimum: 0,
            maximum: 230,
            line: {
                offset: -60,
                color: '#7D96A6'
            },
            opposedPosition: true,
            majorTicks: {
                interval: 20,
                color: '#7D96A6'
            },
            minorTicks: {
                interval: 5,
                color: '#7D96A6'
            },
            pointers: [
                {
                    type: 'Bar',
                    value: props.profileStats.height,
                    width: 80,
                    linearGradient: heightGaugePointerLinearGradient,
                },
                {
                    type: 'Bar',
                    height: 390,
                    width: 5,
                    value: 230,
                    color: '#7D96A6',
                    offset: -25,
                    roundedCornerRadius: 0
                }
            ],
        },
    ];

    let mintype = 'MinRange';
    let weightSliderMin = 0;
    let weightSliderMax = 120;
    // let currentWtUnit = 'KG';
    // let currentHtUnit = 'CM';
    // let weightSliderLimit = { enabled: true, minStart: currentWtUnit === 'KG' ? 10 : 20 };
    // let heightSliderLimit = { enabled: true, minStart: currentHtUnit === 'CM' ? 30 : 1 };
    let heightSliderMin = 0;
    let heightSliderMax = 200;
    let orientation = 'Vertical';

    function handleChange() {
        console.log("HAndle changed");
    }

    function profileHeader() {
        return (
            <div className="e-profile-edit-icon-container">
            <div className="e-profile-edit-icon-div">
              <span className="e-profile-edit-icon icon-Logo"></span>
            </div>
            <div className="e-profile-edit-title">GO<span>FIT</span></div>
          </div>
        )
    }

    return (
        <DialogComponent className="e-profile-edit-dialog"
            visible={props.hidden}
            animationSettings={animationSettings}
            target={target}
            width={editDialogWidth}
            height={height}
            header={profileHeader}
            position={editDlgPosition}
            buttons={props.profiledlgButtons}
            style={{ maxHeight: "100%" }}
            isModal="true"
            open={props.profileDialogOpen}
            beforeOpen={props.profileDialogBeforeOpen}
            close={props.profileDialogClose}
            overlayClick= {props.profileOverLayCLick}
            showCloseIcon={false}>
            <div>
                <div className="e-edit-dialog-container col-md-12 col-sm-12">
                    <div className="e-profile-container col-md-6 col-sm-6">
                        <div className="col-md-12 col-sm-12">
                            <div className="e-profile-back"><span className="icon-arrow-left"></span><span className="e-profile-back-text">Back to Dashboard</span></div>
                            <div className="e-profile-title">Profile</div>
                        </div>
                        <div className="e-profile-details col-md-12 col-sm-12">
                            <div className="col-md-3">
                                <div className="e-profile-pic-container e-avatar e-avatar-circle">
                                    <img src={ProfilePicture} alt="JW" />
                                </div>
                            </div>
                            <div className="e-profile-container col-md-9">
                                <div className="e-profile-label">Name</div>
                                <div className="e-profile-value">
                                    <TextBoxComponent value={props.name} input={props.onNameChange} cssClass={'e-profile-input'}></TextBoxComponent>
                                </div>
                                <div className="e-profile-label">Age</div>
                                <div className="e-age-edit e-profile-value">
                                    <div className="e-age-minus icon-minus"></div>
                                    <div className="e-age-count">{props.profileStats.age}</div>
                                    <div className="e-age-plus icon-plus"></div>
                                </div>
                                <div className="e-profile-label">Weight</div>
                                <div className="e-profile-value">
                                    <TextBoxComponent value={props.profileStats.weight + ' ' + props.profileStats.weightMes} readOnly={true} cssClass='e-profile-input e-weight-text'></TextBoxComponent>
                                    <ButtonComponent className="e-weight-change-btn"><span>CHANGE</span><span className="e-change-right icon-chevron-right"></span></ButtonComponent>
                                </div>
                                <div className="e-profile-label">Set your Goal</div>
                                <div className="e-profile-value">
                                    <TextBoxComponent value={props.profileStats.goal + ' ' + props.profileStats.goalMes} readOnly={true} cssClass='e-profile-input e-goal-text'></TextBoxComponent>
                                    <ButtonComponent className="e-goal-change-btn"><span>CHANGE</span><span className="e-change-right icon-chevron-right"></span></ButtonComponent>
                                </div>
                                <div className="e-profile-label">Height</div>
                                <div className="e-profile-value">
                                    <TextBoxComponent value={props.profileStats.height + ' ' + props.profileStats.heightMes} readOnly={true} cssClass='e-profile-input e-height-text'></TextBoxComponent>
                                    <ButtonComponent className="e-height-change-btn"><span>CHANGE</span><span className="e-change-right icon-chevron-right"></span></ButtonComponent>
                                </div>
                                <div className="e-profile-label">Location</div>
                                <div className="e-profile-value">
                                    <TextBoxComponent value={props.profileStats.location} input={props.onLocationChange} cssClass='e-profile-input'></TextBoxComponent>
                                </div>
                                <div className="e-profile-label">Email</div>
                                <div className="e-profile-value">
                                    <TextBoxComponent value={props.profileStats.email} type="email" input={props.onEmailChange} cssClass='e-profile-input'></TextBoxComponent>
                                </div>
                                <div className="e-profile-label">Theme</div>
                                <div className="e-profile-value e-radio-container">
                                    <RadioButtonComponent id="light-theme" cssClass="e-light-radio" label="Light" name="dashboard-theme" value="Light" checked={true} change={props.changeHandler}></RadioButtonComponent>
                                    <RadioButtonComponent id="dark-theme" cssClass="e-dark-radio" label="Dark" name="dashboard-theme" value="Dark" change={props.changeHandler}></RadioButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="e-modify-container col-md-6 col-sm-6">
                        <div className="e-modify-title">{props.modifyHeaderTitle}</div>
                        <div className='e-weight-modify-btn-group e-btn-group e-outline'>
                        <ButtonComponent cssClass="e-custom" className="e-input-kg-btn">KG</ButtonComponent>
                        <ButtonComponent className="e-input-lb-btn">LB</ButtonComponent>
                            {/* <input className="input-kg" type="radio" id="KG" name="modifyunit" value="KG" checked={true} onChange={handleChange} />
                            <label className="e-btn" >KG</label>
                            <input className="input-lb" type="radio" id="LB" name="modifyunit" value="LB" onChange={handleChange} />
                            <label className="e-btn" >LB</label> */}
                        </div>
                        <div className='e-height-modify-btn-group e-btn-group e-outline e-hidden'>
                        <ButtonComponent cssClass="e-custom" className="e-input-cm-btn"><span>CM</span></ButtonComponent>
                        <ButtonComponent className="e-input-ft-btn"><span>FT</span></ButtonComponent>
                            {/* <input type="radio" id="CM" name="modifyunit" value="CM" checked={true} onChange={handleChange} />
                            <label className="e-btn">CM</label>
                            <input type="radio" id="FT" name="modifyunit" value="FT" onChange={handleChange} />
                            <label className="e-btn">FT</label> */}
                        </div>

                        <div className="e-weight-gauge-container">
                            <CircularGaugeComponent
                                id='weightgauge'
                                style={{ display: 'block' }}
                                theme={props.theme}
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
                                        ranges={weightGaugeRanges}
                                        pointers={weightGaugePointers}
                                        annotations={weightGaugeAnnotaions}
                                        background={weightGaugeBackground}></AxisDirective>
                                </AxesDirective>
                            </CircularGaugeComponent>
                            <div className="slider-container" >
                                <SliderComponent id="weightrange" 
                                    value={props.profileStats.weight}
                                    type={mintype}
                                    width="50%"
                                    min={weightSliderMin}
                                    max={weightSliderMax}
                                    change={props.sliderChange}
                                    cssClass="weight-slider-container"
                                    limits={props.weightSliderLimit}>
                                </SliderComponent>
                            </div>
                            <div className="e-add-weight">
                                <ButtonComponent className="e-update-weight" cssClass="e-primary">UPDATE WEIGHT</ButtonComponent>
                            </div>
                            <div className="e-cancel-weight">
                                <ButtonComponent className="e-update-weight-cancel" cssClass="e-outline">CANCEL</ButtonComponent>
                            </div>
                        </div>
                        <div className="e-height-gauge-container e-hidden">
                            <div className="e-base-container">
                                <div className="e-height-img-container">
                                    <div className="e-age-edit e-profile-height-label">{props.profileStats.height}
                                        <span>{props.profileStats.heightMes}</span></div>
                                    <img id="height-svg" src={humanImage} alt="Height" />
                                </div>
                                <LinearGauge heightGaugeAxes={heightGaugeAxes}
                                    heightGaugeAnnotation={heightGaugeAnnotation} theme={props.theme}></LinearGauge>
                                <div className="slider-container" style={{height: "390px", width: "50px", marginTop: "5px"}}>
                                <SliderComponent id="heightrange"
                                value={props.profileStats.height}
                                    type={mintype}
                                    width='100px'
                                    height='300px'
                                    min={heightSliderMin}
                                    max={heightSliderMax}
                                    orientation={orientation}
                                    change={props.sliderHeightChange}
                                    cssClass="height-slider-container"
                                    limits={props.heightSliderLimit}>
                                </SliderComponent>
                                </div>
                            </div>
                            <div className="e-add-height">
                                <ButtonComponent className="e-update-height" cssClass="e-primary">UPDATE HEIGHT</ButtonComponent>
                            </div>
                            <div className="e-cancel-height">
                                <ButtonComponent className="e-update-height-cancel" cssClass="e-outline">CANCEL</ButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DialogComponent>
    )
}

export default ProfileDialog;



