import React from "react";
import ReactDOM from "react-dom";
import { Timer } from "./Timer";
import { ThemeChanger } from "./ThemeChanger";
import "./index.css";

class App extends React.Component {
    render() {
        return (
            <div className="timer">
                <Timer />
                <ThemeChanger />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
