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
            <>
                <div className="tabs">
                    <Tab name="Any Date" onClick={this.changePage} />
                    <Tab name="Birthday" onClick={this.changePage} />
                    <Tab name="New Year" onClick={this.changePage} />
                </div>
                {page}
            </>
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
            countdown: 0,
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() =>
            this.setState({
                time: new Date(),
                countdown: this.state.countdown > 0 ? this.state.countdown - 1 : 0,
            }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handleInput = e => {
        const countdown = (e.target.valueAsNumber - this.state.time.getTime() + this.state.time.getTimezoneOffset() * 60 * 1000) / 1000;
        this.setState({ countdown: countdown });
    }

    getMinDate = () => {
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        return currentDate.toISOString().split('T')[0];
    }

    render() {
        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;

        let d = Math.floor(this.state.countdown / day);
        let h = Math.floor(this.state.countdown % day / hour);
        let m = Math.floor(this.state.countdown % hour / minute);
        let s = Math.floor(this.state.countdown % minute);

        const timeLeft = `${d}:${h}:${m}:${s}`;

        return (
            <div className="anydate">
                <input
                    type="date"
                    onInput={e => this.handleInput(e)}
                    min={this.getMinDate(this.state.time)}
                />
                <p>{timeLeft}</p>
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