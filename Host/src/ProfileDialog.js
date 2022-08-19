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
    // let weightGaugePointers = [{
    //     animation: { enable: false }, value: props.profileStats.weight, radius: '85%', color: '#F43F5E',
    //     pointerWidth: 12,
    //     cap: { radius: 12, color: '#F0D9BC' }
    // }];

    // let rangeLinearGradient = {
    //     startValue: '0%',
    //     endValue: '100%',
    //     colorStop: [
    //         { color: '#4075F2', offset: '0%' },
    //         { color: '#FB9906', offset: '35%' },
    //         { color: '#F9623A', offset: '70%' },
    //         { color: '#C24287', offset: '100%' },
    //     ]
    // };
    // let weightGaugeRanges = [{
    //     start: 0, end: props.profileStats.weight, startWidth: 18, endWidth: 18, color: '#F43F5E',
    //     linearGradient: rangeLinearGradient,
    //     roundedCornerRadius: 10
    // }];

    // let weightGaugeAnnotaions = [{
    //     content: '<div class="e-weight-gauge-annotation">' +
    //         props.profileStats.weight + props.profileStats.weightMes + '</div>',
    //     radius: '85%', angle: 180, zIndex: '1'
    // }];

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

    // function loaded() {
    //     if(menuDialogInstance) {
    //         menuDialogInstance.refresh();
    //     }
    // }
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
            {/* <div className="e-profile-edit-icon-container">
                <div className="e-profile-edit-icon-div">
                    <span className="e-profile-edit-icon icon-Logo"></span>
                </div>
                <div className="e-profile-edit-title">GO<span>FIT</span></div>
            </div> */}
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
                                {/* <ejs-textbox width="80%" [value]="profileStats.name" (input)="onNameChange($event)"
                cssclassName="e-profile-input"></ejs-textbox> */}
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
                                {/* <ejs-textbox width="80%" [value]="profileStats.weight + ' ' + profileStats.weightMes" readonly="true"
                cssclassName="e-profile-input e-weight-text">
              </ejs-textbox> */}
                                <ButtonComponent className="e-weight-change-btn" onClick={props.changeWeight}><span>CHANGE</span><span
                                    className="e-change-right icon-chevron-right"></span></ButtonComponent>
                                {/* <div ejs-button className="e-weight-change-btn" onClick={props.changeWeight}><span>CHANGE</span><span
                  className="e-change-right icon-chevron-right"></span></div> */}
                            </div>
                            <div className="e-profile-label">Set your Goal</div>
                            <div className="e-profile-value">
                                <TextBoxComponent width={'80%'} value={props.profileStats.goal + ' ' + props.profileStats.goalMes} readOnly={true} cssClass='e-profile-input e-weight-text'></TextBoxComponent>
                                {/* <ejs-textbox width="80%" [value]="profileStats.goal + ' ' + profileStats.goalMes" readonly="true"
                cssclassName="e-profile-input e-goal-text">
              </ejs-textbox> */}
                                <ButtonComponent className="e-goal-change-btn" onClick={props.changeGoal}><span>CHANGE</span><span
                                    className="e-change-right icon-chevron-right"></span></ButtonComponent>
                                {/* <div ejs-button className="e-goal-change-btn" (click)="changeGoal()"><span>CHANGE</span><span
                  className="e-change-right icon-chevron-right"></span> */}
                            </div>
                        </div>
                        <div className="e-profile-label">Height</div>
                        <div className="e-profile-value">
                            <TextBoxComponent width={'80%'} value={props.profileStats.height + ' ' + props.profileStats.heightMes} readOnly={true} cssClass='e-profile-input e-height-text'></TextBoxComponent>
                            <ButtonComponent className="e-height-change-btn" onClick={props.changeHeight}><span>CHANGE</span><span
                                className="e-change-right icon-chevron-right"></span></ButtonComponent>
                            {/* <ejs-textbox width="80%" [value]="profileStats.height + ' ' + profileStats.heightMes" readonly="true"
                cssclassName="e-profile-input e-height-text">
              </ejs-textbox>
              <div ejs-button className="e-height-change-btn" (click)="changeHeight()"><span>CHANGE</span><span
                  className="e-change-right icon-chevron-right"></span></div> */}
                        </div>
                        <div className="e-profile-label">Location</div>
                        <div className="e-profile-value">
                            <TextBoxComponent width={'100%'} value={props.profileStats.location} input={props.onLocationChange} cssClass='e-profile-input'></TextBoxComponent>
                            {/* <ejs-textbox width="100%" [value]="profileStats.location" (input)="onLocationChange($event)"
                cssclassName="e-profile-input">
              </ejs-textbox> */}
                        </div>
                        <div className="e-profile-label">Email</div>
                        <div className="e-profile-value">
                            <TextBoxComponent width={'100%'} value={props.profileStats.email} type="email" input={props.onEmailChange} cssClass='e-profile-input'></TextBoxComponent>
                            {/* <ejs-textbox width="100%" [value]="profileStats.email" type="email" (input)="onEmailChange($event)"
                cssclassName="e-profile-input">
              </ejs-textbox> */}
                        </div>
                        <div className="e-profile-label">Theme</div>
                        <div className="e-profile-value e-radio-container">
                            <RadioButtonComponent cssClass="e-light-radio" label="Light" name="dashboard-theme" value="Light" checked={true} change={props.changeHandler}></RadioButtonComponent>
                            <RadioButtonComponent cssClass="e-dark-radio" label="Dark" name="dashboard-theme" value="Dark" change={props.changeHandler}></RadioButtonComponent>
                            {/* <ejs-radiobutton #radiolight className="e-light-radio" label="Light" name="dashboard-theme" value="Light"
                checked="true" (change)="changeHandler($event)"></ejs-radiobutton>
              <ejs-radiobutton #radiodark cssclassName="e-dark-radio" label="Dark" name="dashboard-theme" value="Dark"
                (change)="changeHandler($event)"></ejs-radiobutton> */}
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
                        {/* <ejs-slider id="weightrange" #weightrange [value]="profileStats.weight" [type]="mintype" width="50%"
              (change)="sliderChange($event)" [min]="weightSliderMin" [max]="weightSliderMax"
              cssclassName="weight-slider-container" [limits]="weightSliderLimit"></ejs-slider> */}
                    </div>
                    <div className="e-add-weight">
                        <ButtonComponent cssClass="e-primary" onClick={props.updateWeight}>UPDATE WEIGHT</ButtonComponent>
                        {/* <button ejs-button cssclassName='e-primary' (click)="updateWeight()">UPDATE WEIGHT</button> */}
                    </div>
                    <div className="e-cancel-weight">
                        <ButtonComponent cssClass="e-outline" onClick={props.cancelWeight}>CANCEL</ButtonComponent>
                        {/* <button ejs-button cssclassName='e-outline' (click)="cancelWeight()">CANCEL</button> */}
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
                        {/* <ejs-lineargauge id="heightgauge" #heightgauge style="display:block;" orientation="Vertical"
              [container]="heightGaugeContainer" [axes]="heightGaugeAxes" width="100px" height="400px" [theme]="theme">
            </ejs-lineargauge> */}
                        <div className="slider-container" >
                            {/* <ejs-slider id="heightrange" #heightrange [value]="profileStats.height" [type]="mintype" width="100px"
                height="300px" (change)="sliderHeightChange($event)" [min]="heightSliderMin" [max]="heightSliderMax"
                [orientation]="orientation" cssclassName="height-slider-container" [limits]="heightSliderLimit">
              </ejs-slider> */}
                        </div>
                    </div>
                    <div className="e-add-height">
                        <ButtonComponent cssClass="e-primary" onClick={props.updateHeight}>UPDATE HEIGHT</ButtonComponent>
                        {/* <button ejs-button cssclassName='e-primary' (click)="updateHeight()">UPDATE HEIGHT</button> */}
                    </div>
                    <div className="e-cancel-height">
                        <ButtonComponent cssClass="e-primary" onClick={props.cancelHeight}>UPDATE HEIGHT</ButtonComponent>
                        {/* <button ejs-button cssclassName='e-outline' (click)="cancelHeight()">CANCEL</button> */}
                    </div>
                </div>
            </div>
        </DialogComponent>
    )
}

export default ProfileDialog;