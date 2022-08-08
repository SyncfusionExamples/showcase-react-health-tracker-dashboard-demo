import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Tab from "./tab";


const App = () => (
  <React.Suspense fallback="Loading">
  {/* <ButtonComponent>Button</ButtonComponent> */}
  <Tab></Tab>
  </React.Suspense>
);
ReactDOM.render(<App />, document.getElementById("app"));







// import React from "react";
// import ReactDOM from "react-dom";
// import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';

// import "./index.css";

// const App = () => (
  
//   <div className="container">
//     <TabComponent heightAdjustMode='Auto'>
//     <TabItemsDirective>
//       <TabItemDirective header={this.headerText[0]} content={this.content0}/>
//       <TabItemDirective header={this.headerText[1]} content={this.content1}/>
//       <TabItemDirective header={this.headerText[2]} content={this.content2}/>
//     </TabItemsDirective>
//   </TabComponent>
//   </div>
// );
// ReactDOM.render(<App />, document.getElementById("app"));
