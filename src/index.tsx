import * as React from "react";
import * as ReactDOM from "react-dom";
import { Title } from "./components/Title";
import { ParcentageView } from "./components/ParcentageView";

let mainContent = document.getElementById("main");

let mainContentStyle: React.CSSProperties = {
    margin: "auto",
    maxWidth: 600,
    textAlign: "center"
};

ReactDOM.render(
    <div style={mainContentStyle}>
        <Title />
        <ParcentageView />
    </div>,
    mainContent
);
