import React from "react";
import { Browser } from '@syncfusion/ej2-base';
import { LinearGaugeComponent, Inject, Annotations } from '@syncfusion/ej2-react-lineargauge';


function LinearGuage (props) {
    let isDevice = Browser.isDevice;
    let theme = 'Tailwind';
    let style = {
        display: 'block',
    }
    let consumedWaterAmount = 600;
    let expectedWaterAmount = 2400;
    let waterGaugeContainer = {
        width: 50,
        roundedCornerRadius: 35,
        type: 'RoundedRectangle',
        backgroundColor: '#3993F5',
    };

    // let waterGaugeAxes = [
    //     {
    //         minimum: 0,
    //         maximum: 100,
    //         line: {
    //             width: 0,
    //         },
    //         labelStyle: {
    //             font: {
    //                 opacity: 0,
    //             },
    //         },
    //         majorTicks: {
    //             interval: 10,
    //             color: '#3993F5',
    //             offset: 5,
    //         },
    //         minorTicks: {
    //             interval: 2,
    //             color: '#3993F5',
    //             offset: 5,
    //         },
    //         opposedPosition: true,
    //         pointers: [
    //             {
    //                 value: Math.round((consumedWaterAmount / expectedWaterAmount) * 100),
    //                 height: 50,
    //                 width: 50,
    //                 roundedCornerRadius: 35,
    //                 type: 'Bar',
    //                 color: '#61a9f7',
    //             },
    //             {
    //                 value: 8,
    //                 width: 5,
    //                 height: 5,
    //                 offset: -60,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 8 ? 1 : 0
    //             },
    //             {
    //                 value: 15,
    //                 width: 4,
    //                 height: 4,
    //                 offset: -80,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 15 ? 1 : 0
    //             },
    //             {
    //                 value: 21,
    //                 width: 7,
    //                 height: 7,
    //                 offset: -75,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 21 ? 1 : 0
    //             },
    //             {
    //                 value: 27,
    //                 width: 8,
    //                 height: 8,
    //                 offset: -65,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 27 ? 1 : 0
    //             },
    //             {
    //                 value: 37,
    //                 width: 4,
    //                 height: 4,
    //                 offset: isDevice ? -85 : -55,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 37 ? 1 : 0
    //             },
    //             {
    //                 value: 42,
    //                 width: 6,
    //                 height: 6,
    //                 offset: -75,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 42 ? 1 : 0
    //             },
    //             {
    //                 value: 48,
    //                 width: 8,
    //                 height: 8,
    //                 offset: isDevice ? -80 : -58,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 48 ? 1 : 0
    //             },
    //             {
    //                 value: 56,
    //                 width: 5,
    //                 height: 5,
    //                 offset: -72,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 56 ? 1 : 0
    //             },
    //             {
    //                 value: 64,
    //                 width: 6,
    //                 height: 6,
    //                 offset: -79,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 64 ? 1 : 0
    //             },
    //             {
    //                 value: 72,
    //                 width: 8,
    //                 height: 8,
    //                 offset: isDevice ? -85 : -55,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 72 ? 1 : 0
    //             },
    //             {
    //                 value: 80,
    //                 width: 5,
    //                 height: 5,
    //                 offset: -70,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 80 ? 1 : 0
    //             },
    //             {
    //                 value: 86,
    //                 width: 6,
    //                 height: 6,
    //                 offset: -77,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 86 ? 1 : 0
    //             },
    //             {
    //                 value: 94,
    //                 width: 8,
    //                 height: 8,
    //                 offset: isDevice ? -80 : -54,
    //                 markerType: 'Circle',
    //                 color: '#87CEFA',
    //                 opacity: Math.round((consumedWaterAmount / expectedWaterAmount) * 100) > 94 ? 1 : 0
    //             },
    //         ],
    //     },
    // ];
    let gaugeOrientation = isDevice ? 'Vertical' : 'Horizontal';
    let gaugeHeight = isDevice ? '100%' : '250px';
    let gaugeWidth = '100%';
    // let waterGaugeAnnotation = isDevice ? [
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Poor</div>',
    //         axisIndex: 0,
    //         axisValue: 5,
    //         x: 60,
    //         zIndex: '1',
    //     },
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Good</div>',
    //         axisIndex: 0,
    //         axisValue: 40,
    //         x: 60,
    //         zIndex: '1',
    //     },
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Almost</div>',
    //         axisIndex: 0,
    //         axisValue: 70,
    //         x: 60,
    //         zIndex: '1',
    //     },
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Perfect!</div>',
    //         axisIndex: 0,
    //         axisValue: 95,
    //         x: 60,
    //         zIndex: '1',
    //     },
    // ] : [
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Poor</div>',
    //         axisIndex: 0,
    //         axisValue: 5,
    //         y: 50,
    //         zIndex: '1',
    //     },
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Good</div>',
    //         axisIndex: 0,
    //         axisValue: 40,
    //         y: 50,
    //         zIndex: '1',
    //     },
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Almost</div>',
    //         axisIndex: 0,
    //         axisValue: 70,
    //         y: 50,
    //         zIndex: '1',
    //     },
    //     {
    //         content:
    //             '<div class="e-water-annotation-text">Perfect!</div>',
    //         axisIndex: 0,
    //         axisValue: 95,
    //         y: 50,
    //         zIndex: '1',
    //     },
    // ];
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