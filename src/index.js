import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "Any Date"
        };
    }

    changePage = (page) => {
        this.setState({ page: page });
    }

    render() {
        let page;

        switch (this.state.page) {
            case "Any Date":
                page = <AnyDate />
                break;
            case "Birthday":
                page = <Birthday />
                break;
            case "New Year":
                page = <NewYear />
        };

        return (
            <div>
                <div className="tabs">
                    <Tab name="Any Date" onClick={this.changePage} />
                    <Tab name="Birthday" onClick={this.changePage} />
                    <Tab name="New Year" onClick={this.changePage} />
                </div>
                {page}
            </div>
        );
    }
}

class Tab extends React.Component {
    render() {
        return (
            <button
                className="btn tab"
                id={this.props.name.replace(' ', '').toLowerCase()}
                onClick={() => this.props.onClick(this.props.name)}
            >
                {this.props.name}
            </button>
        );
    }
}

class AnyDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        }
    }

    handleInput = (e) => {
        console.log(e.target.valueAsNumber - this.state.time.getTime()); // UNIX Time
    }

    render() {
        console.log(this.state.time.getDay())
        return (
            <div>
                <input type="date" onInput={e => this.handleInput(e)} />
            </div>
        );
    }
}
class Birthday extends React.Component {
    render() {
        return (
            <p>Birthday</p>
        );
    }
}
class NewYear extends React.Component {
    render() {
        return (
            <p>NewYear</p>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root')); 