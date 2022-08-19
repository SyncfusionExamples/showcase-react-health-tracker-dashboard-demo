import React from "react";
import { Browser } from '@syncfusion/ej2-base';
import { CircularGaugeComponent, AxesDirective, Gradient, AxisDirective, Inject, Annotations } from '@syncfusion/ej2-react-circulargauge';

function CircularGuage(props) {

    //////////Added
    let isDevice = Browser.isDevice;
    let theme = 'Tailwind';
    let style = {
        display: 'block',
    }
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

    // let pointerRadialGradient = {
    //     startValue: '0%',
    //     endValue: '100%',
    //     colorStop: [
    //         { color: '#FB5F64', offset: '0%', opacity: 0.9 },
    //         { color: '#FC9662', offset: '70%', opacity: 0.9 }]
    // };

    // let ranges = [
    //     {
    //         start: 0,
    //         end: 100,
    //         radius: '100%',
    //         startWidth: 30,
    //         endWidth: 30,
    //         color: '#E1E9ED',
    //         roundedCornerRadius: 15,
    //     },
    //     {
    //         start: 0,
    //         end: 100,
    //         radius: '100%',
    //         startWidth: 30,
    //         endWidth: 30,
    //         color: '#CDD9E0',
    //         roundedCornerRadius: 15,
    //         linearGradient: pointerRadialGradient,
    //     },
    //     {
    //         start: 2,
    //         end: 98,
    //         radius: '91%',
    //         startWidth: 5,
    //         endWidth: 5,
    //         roundedCornerRadius: 2,
    //         color: '#FFFFFF',
    //         opacity: 0.35
    //     },
    // ];
    // let pointers = [
    //     {
    //         value: 80,
    //         height: 12,
    //         width: 12,
    //         placement: 'Near',
    //         offset: -20,
    //         markerType: 'Triangle',
    //         color: '#FFFFFF',
    //     },
    // ];

    // let annotaions = isDevice ? [{
    //     angle: 0,
    //     zIndex: '1',
    //     radius: '0%'
    // },
    // {
    //     zIndex: '1',
    //     radius: '91%',
    //     angle: 350,
    //     content: '<div class="e-gauge-percent-img icon-Calories"></div>'
    // },
    // {
    //     zIndex: '1',
    //     radius: '91%',
    //     angle: 60,
    //     content: '<div class="e-gauge-status-img icon-Diet"></div>'
    // },
    // {
    //     zIndex: '1',
    //     radius: '91%',
    //     angle: 280,
    //     content: '<div class="e-gauge-status-img icon-Thunder"></div>'
    // }] : [{
    //     angle: 0,
    //     zIndex: '1',
    //     radius: '0%'
    // },
    // {
    //     zIndex: '1',
    //     radius: '90%',
    //     angle: 350,
    //     content: '<div class="e-gauge-percent-img icon-Calories"></div>'
    // },
    // {
    //     zIndex: '1',
    //     radius: '89%',
    //     angle: 60,
    //     content: '<div class="e-gauge-status-img icon-Diet"></div>'
    // },
    // {
    //     zIndex: '1',
    //     radius: '89%',
    //     angle: 280,
    //     content: '<div class="e-gauge-status-img icon-Thunder"></div>'
    // }];
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