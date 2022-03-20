import React from 'react';

export class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: 0,
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(() => {
            if (this.state.countdown === 4) {
                let countdown = new Audio('countdown.wav');
                countdown.play();
            }
            if (this.state.countdown > 0)
                this.setState(prevState => ({ countdown: prevState.countdown - 1 }));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    handleInput(e) {
        if (isNaN(e.target.valueAsNumber))
            return;
        let date = new Date();
        let countdown = (e.target.valueAsNumber - date.getTime() + date.getTimezoneOffset() * 60 * 1000) / 1000;
        this.setState({ countdown: countdown });
    };

    getMinDate() {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        let tomorrow = this.addZero([currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()]).join('-');
        return tomorrow;
    };

    getCountdown(countdown) {
        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;

        let d = Math.floor(countdown / day);
        let h = Math.floor(countdown % day / hour);
        let m = Math.floor(countdown % hour / minute);
        let s = Math.floor(countdown % minute);


        return this.addZero([d, h, m, s]);
    };

    addZero = time => time.map(n => String(n).length === 1 ? '0' + n : n);

    render() {
        let [d, h, m, s] = this.getCountdown(this.state.countdown);
        let timeLeft = `${d}:${h}:${m}:${s}`;

        return (
            <>
                <div className="countdown">{timeLeft}</div>
                <label className="pick-day">Select date:
                    <input
                        type="date"
                        onInput={e => this.handleInput(e)}
                        min={this.getMinDate()}
                    />
                </label>
            </>
        );
    }
}