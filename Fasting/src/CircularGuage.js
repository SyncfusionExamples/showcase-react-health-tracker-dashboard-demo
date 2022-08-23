import React from "react";
import { Browser } from '@syncfusion/ej2-base';
import { CircularGaugeComponent, AxesDirective, Gradient, AxisDirective, Inject, Annotations } from '@syncfusion/ej2-react-circulargauge';

function CircularGuage(props) {
    let isDevice = Browser.isDevice;
    let theme = 'Tailwind';
    let circularGaugeRadius = isDevice ? '100%' : '100%';
    let majorTicks = {
        height: 0,
    };
    let minorTicks = {
        height: 0,
    };
    let gaugeLabelStyle = {
        position: 'Inside', useRangeColor: true,
        font: { size: '0px', color: 'white', fontFamily: 'Roboto', fontStyle: 'Regular' }
    };
    let lineStyle = {
        width: 0
    };
    return (
        <div>
            <CircularGaugeComponent
                id="range-container"
                theme={theme}
                style={{ display: 'block' }}
                width='100%'
                height='300px'
                centerX='50%'
                centerY='50%'
                loaded={props.fastingGaugeLoaded}
            >
                <Inject services={[Annotations, Gradient]} />
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
                        pointers={[]}
                        ranges={props.circularGuage[0].ranges}
                        annotations={props.circularGuage[0].annotations}></AxisDirective>
                </AxesDirective>
            </CircularGaugeComponent>
        </div>
    )
}

export default CircularGuage;