import React from 'react';

export class ThemeChanger extends React.Component {
    handleChange(e) {
        document.body.className = e.target.value;
    }

    componentDidMount(e) {
        document.body.className = "date";
    }

    render() {
        return (
            <>
                <label className="theme">Select theme:
                    <select onChange={e => this.handleChange(e)}>
                        <option value="date">Date</option>
                        <option value="birthday">Birthday</option>
                        <option value="newyear">New Year</option>
                    </select>
                </label>
            </>
        );
    }
}
