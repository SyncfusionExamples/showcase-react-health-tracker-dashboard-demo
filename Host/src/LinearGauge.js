import React from "react";
import { LinearGaugeComponent, Inject, Gradient } from '@syncfusion/ej2-react-lineargauge';

function LinearGauge(props) {
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
      theme={props.theme}>
      <Inject services={[Gradient]} />
    </LinearGaugeComponent>
  )
}

export default LinearGauge;