import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: ""
        };
    }

    render() {
        return <Timer />;
    }
}

class Timer extends React.Component {
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
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        return currentDate.toISOString().split('T')[0];
    }

    getCountdown = countdown => {
        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;

        let d = Math.floor(countdown / day);
        let h = Math.floor(countdown % day / hour);
        let m = Math.floor(countdown % hour / minute);
        let s = Math.floor(countdown % minute);

        const addZeros = time => time.map(n => String(n).length == 1 ? '0' + n : n);

        return addZeros([d, h, m, s]);
    }

    render() {
        const [d, h, m, s] = this.getCountdown(this.state.countdown);

        const timeLeft = `${d}:${h}:${m}:${s}`;

        return (
            <div className="anydate">
                <input
                    type="date"
                    onInput={e => this.handleInput(e)}
                    min={this.getMinDate(this.state.time)}
                />
                <p className='countdown'>{timeLeft}</p>
            </div>
        );
    }
}

// TODO
// style timer
// Add zero to the end of time - done

ReactDOM.render(<App />, document.getElementById('root')); 