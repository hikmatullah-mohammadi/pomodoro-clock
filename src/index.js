import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./MyApp";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
