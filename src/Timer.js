import React from "react";

export class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: 0,
        };
    }

    componentDidMount() {
        let datePicker = document.querySelector("input[type='date']");
        datePicker.value = new Date().getFullYear() + "-03-25";
        this.handleInput(datePicker.valueAsNumber);

        this.intervalID = setInterval(() => {
            if (this.state.countdown === 4) {
                let countdown = new Audio("countdown.wav");
                countdown.play();
            }
            if (this.state.countdown > 0)
                this.setState((prevState) => ({
                    countdown: prevState.countdown - 1,
                }));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    handleInput(value) {
        if (isNaN(value)) return;

        let date = new Date();
        let countdown =
            (value - date.getTime() + date.getTimezoneOffset() * 60 * 1000) /
            1000;
        this.setState({ countdown: countdown });
    }

    getMinDate() {
        let today = new Date();
        today.setDate(today.getDate() + 1);
        let tomorrow = this.addZero([
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate(),
        ]).join("-");
        return tomorrow;
    }

    getCountdown(countdown) {
        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;

        let d = Math.floor(countdown / day);
        let h = Math.floor((countdown % day) / hour);
        let m = Math.floor((countdown % hour) / minute);
        let s = Math.floor(countdown % minute);

        return this.addZero([d, h, m, s]);
    }

    addZero = (time) => time.map((n) => (String(n).length === 1 ? "0" + n : n));

    render() {
        let [d, h, m, s] = this.getCountdown(this.state.countdown);
        let timeLeft = `${d}:${h}:${m}:${s}`;

        return (
            <>
                <div className="countdown">{timeLeft}</div>
                <label className="pick-day">
                    Select date:
                    <input
                        type="date"
                        onInput={(e) =>
                            this.handleInput(e.target.valueAsNumber)
                        }
                        min={this.getMinDate()}
                    />
                </label>
            </>
        );
    }
}
