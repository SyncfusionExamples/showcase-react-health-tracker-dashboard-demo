import React from "react";
import { Browser } from '@syncfusion/ej2-base';
import { LinearGaugeComponent, Inject, Annotations } from '@syncfusion/ej2-react-lineargauge';


function LinearGuage(props) {
    let isDevice = Browser.isDevice;
    let theme = 'Tailwind';
    let waterGaugeContainer = {
        width: 50,
        roundedCornerRadius: 35,
        type: 'RoundedRectangle',
        backgroundColor: '#3993F5',
    };
    let gaugeOrientation = isDevice ? 'Vertical' : 'Horizontal';
    let gaugeHeight = isDevice ? '100%' : '250px';
    let gaugeWidth = '100%';
    return (
        <LinearGaugeComponent id='gauge'
            style={{ display: 'block' }}
            container={waterGaugeContainer}
            axes={props.waterGaugeAxes}
            width={gaugeWidth}
            height={gaugeHeight}
            orientation={gaugeOrientation}
            annotations={props.waterGaugeAnnotation}
            centerX='10%'
            centerY='50%'
            theme={theme}>
            <Inject services={[Annotations]} />
        </LinearGaugeComponent>
    )
}

export default LinearGuage;