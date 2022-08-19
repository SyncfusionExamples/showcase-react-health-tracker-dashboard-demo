import React from "react";
import { Browser } from '@syncfusion/ej2-base';
import { LinearGaugeComponent, Inject, Annotations } from '@syncfusion/ej2-react-lineargauge';

function LinearGauge(props) {
    let theme = 'Tailwind';
    let orientation = 'Vertical';
    let heightGaugeContainer = {
        width: 80,
        height: 390,
        type: 'RoundedRectangle',
        backgroundColor: '#E1E9ED',
        border: {
          width: 2,
          color: '#E1E9ED',
        },
      };
    return (
        <LinearGaugeComponent id='heightgauge'
        style={{ display: 'block' }}
        orientation={orientation}
        container={heightGaugeContainer}
        axes={props.heightGaugeAxes}
        width="100px"
        height="400px"
        theme={theme}>
        <Inject services={[Annotations]} />
        </LinearGaugeComponent>
    )
}

export default LinearGauge;