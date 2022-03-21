import React from "react";

export class ThemeChanger extends React.Component {
    handleChange(e) {
        document.body.className = e.target.value;
        localStorage.setItem("theme", e.target.value);
    }

    componentDidMount() {
        document.body.className = localStorage.getItem("theme") || "default";
    }

    render() {
        return (
            <>
                <label className="theme">
                    Select theme:
                    <select onChange={(e) => this.handleChange(e)}>
                        <option value="default">Default</option>
                        <option value="birthday">Birthday</option>
                        <option value="newyear">New Year</option>
                    </select>
                </label>
            </>
        );
    }
}
