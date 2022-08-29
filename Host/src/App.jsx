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