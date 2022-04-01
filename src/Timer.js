import React from "react";

export class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: localStorage.getItem("countdown") || 0,
        };
    }

    componentDidMount() {
        if (localStorage.getItem("countdown") > 0) {
            const storedDate = new Date(
                new Date().getTime() + parseInt(localStorage.getItem("countdown") * 1000)
            );
            this.setDate(
                this.formatTime(
                    [storedDate.getFullYear(), storedDate.getMonth() + 1, storedDate.getDate()],
                    "-"
                )
            );
            console.log("Made by Madyarov Arslan");
        } else this.setMyBirthday();

        this.intervalID = setInterval(() => {
            if (this.state.countdown === 4) {
                let countdown = new Audio("countdown.wav");
                countdown.play();
            }
            if (this.state.countdown > 0) {
                this.setState((prevState) => ({
                    countdown: prevState.countdown - 1,
                }));
                localStorage.setItem("countdown", this.state.countdown);
            }
        }, 1000);
    }

    setMyBirthday() {
        let date = new Date();
        let year = date.getFullYear();
        if (date.getMonth() > 2 || (date.getDate() >= 25 && date.getMonth() === 2)) year++;

        this.handleInput(this.setDate(year + "-03-25"));
    }

    setDate(date) {
        let datePicker = document.querySelector("input[type='date']");
        datePicker.value = date;
        return datePicker.valueAsNumber;
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    handleInput(value, e) {
        const date = new Date();
        const offset = Math.floor((new Date(value) - date) / 1000 / 60 / 60 / 24);

        if (isNaN(value)) {
            this.setMyBirthday();
            return;
        }
        console.log(e);
        if (offset > 365) {
            // e.preventDefault();
            return false;
        }

        let countdown = (value - date.getTime() + date.getTimezoneOffset() * 60 * 1000) / 1000;
        this.setState({
            countdown: countdown,
        });
    }

    getMinDate() {
        let today = new Date();
        return this.formatTime(
            [today.getFullYear(), today.getMonth() + 1, today.getDate() + 1],
            "-"
        );
    }

    getMaxDate() {
        let today = new Date();
        return this.formatTime(
            [today.getFullYear() + 1, today.getMonth() + 1, today.getDate()],
            "-"
        );
    }

    getCountdown(countdown) {
        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;

        let d = Math.floor(countdown / day);
        let h = Math.floor((countdown % day) / hour);
        let m = Math.floor((countdown % hour) / minute);
        let s = Math.floor(countdown % minute);

        return this.formatTime([d, h, m, s], ":");
    }

    formatTime = (time, separator) =>
        time.map((n) => (String(n).length === 1 ? "0" + n : n)).join(separator);

    render() {
        let timeLeft = this.getCountdown(this.state.countdown);

        return (
            <>
                <div className="countdown">{timeLeft}</div>
                <label className="pick-day">
                    Select date:
                    <input
                        type="date"
                        onInput={(e) => this.handleInput(e.target.valueAsNumber, e)}
                        min={this.getMinDate()}
                        max={this.getMaxDate()}
                    />
                </label>
            </>
        );
    }
}
