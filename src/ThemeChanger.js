import React from "react";

export class ThemeChanger extends React.Component {
    handleChange(value) {
        document.body.className = value;
        localStorage.setItem("theme", value);
    }

    componentDidMount() {
        const theme = localStorage.getItem("theme") || "default";

        document.body.className = theme;
        document.querySelector("select").value = theme;
    }

    render() {
        return (
            <>
                <label className="theme">
                    Select theme:
                    <select onChange={(e) => this.handleChange(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="birthday">Birthday</option>
                        <option value="newyear">New Year</option>
                    </select>
                </label>
            </>
        );
    }
}
