import React from "react";
import { Browser } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';

function FastingDialog() {
    return(
        <DialogComponent header={fastingDialogeader}
            visible={props.hidden}
            animationSettings={animationSettings}
            showCloseIcon={showCloseIcon}
            target={target}
            ref={dialogIns => dialogInstance = dialogIns}
            width={fastingDialogwidth}
            buttons={fastingDlgButtons}
            position={dlgPosition}
            isModal="true"
            open={dialogOpen}
            overlayClick={fastingOverlayClick}>
            <div className="e-fast-start-label">Start Time</div>
            <div className="e-fast-start-date">
                <DateTimePickerComponent value={difference.countStartDate} min={props.minimumDate} max={props.maximumDate} change={onFastStartDateChange} ref={datetime => dateStartInstance = datetime}></DateTimePickerComponent>
            </div>
            <div className="e-fast-end-label">End Time</div>
            <div className="e-fast-end-date">
                <DateTimePickerComponent value={difference.countDownDate} min={props.minimumDate} max={props.maximumDate} change={onFastStartDateChange} ref={datetime => dateEndInstance = datetime}></DateTimePickerComponent>
            </div>
            <div className="e-fast-total-label">Total Hours</div>
            <div className="e-fast-total-value">{difference.diff} h</div>
        </DialogComponent>
    )
}

export default FastingDialog;