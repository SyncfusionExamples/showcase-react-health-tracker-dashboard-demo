import React, { useState } from "react";
import { Browser } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

function FastingDialog(props) {
    var diff = 16;
    var [difference, setDifference] = useState({
        diff: diff
    })
    let dialogInstance;
    let dateStartInstance;
    let dateEndInstance;
    let isDevice = Browser.isDevice;
    let fastingDialogeader = 'Fasting';
    let animationSettings = { effect: 'Zoom' };
    let showCloseIcon = true;
    let target = 'body';
    let fastingDialogwidth = isDevice ? '100%' : '400px';
    let fastingDlgButtons = [{ click: props.fastingCancelBtnClick.bind(dialogInstance), buttonModel: { content: 'CANCEL', cssClass: 'e-fasting-cancel' } }, { click: props.fastingDlgBtnClick.bind(this), buttonModel: { content: 'START FASTING', cssClass: 'e-start-fast' } }];
    let dlgPosition = { X: 'center', Y: 'center' }

    function onfastChange() {
        diff = Math.floor(((dateEndInstance.value) - (dateStartInstance.value)) / (1000 * 60 * 60));
        setDifference(() => {
            return {
                diff: diff
            }
        })
    }

    function fastingOverlayClick() {
        if (dialogInstance) {
            dialogInstance.hide();
        }
    }
    return (
        <DialogComponent
            className="e-add-fasting-dialog"
            header={fastingDialogeader}
            visible={props.hidden}
            animationSettings={animationSettings}
            showCloseIcon={showCloseIcon}
            target={target}
            ref={dialog => dialogInstance = dialog}
            width={fastingDialogwidth}
            buttons={fastingDlgButtons}
            position={dlgPosition}
            isModal="true"
            overlayClick={fastingOverlayClick}>
            <div className="e-fast-start-label">Start Time</div>
            <div className="e-fast-start-date">
                <DateTimePickerComponent value={props.countStartDate} min={props.minimumDate} max={props.maximumDate} change={props.onFastStartDateChange} ref={datetime => dateStartInstance = datetime} onChange={onfastChange}></DateTimePickerComponent>
            </div>
            <div className="e-fast-end-label">End Time</div>
            <div className="e-fast-end-date">
                <DateTimePickerComponent value={props.countDownDate} min={props.minimumDate} max={props.maximumDate} change={props.onFastEndDateChange} ref={datetime => dateEndInstance = datetime} onChange={onfastChange}></DateTimePickerComponent>
            </div>
            <div className="e-fast-total-label">Total Hours</div>
            <div className="e-fast-total-value">{difference.diff} h</div>
        </DialogComponent>
    )
}

export default FastingDialog;