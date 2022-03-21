import React from "react";

export class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { countdown: localStorage.getItem("countdown") || 0 };
    }

    componentDidMount() {
        if (localStorage.getItem("countdown")) {
            const storedDate = new Date(
                new Date().getTime() +
                    parseInt(localStorage.getItem("countdown") * 1000)
            );
            this.setDate(
                this.addZero(
                    [
                        storedDate.getFullYear(),
                        storedDate.getMonth() + 1,
                        storedDate.getDate(),
                    ],
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
        this.handleInput(this.setDate(new Date().getFullYear() + "-03-25"));
    }

    setDate(date) {
        let datePicker = document.querySelector("input[type='date']");
        datePicker.value = date;
        return datePicker.valueAsNumber;
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    handleInput(value) {
        if (isNaN(value)) {
            this.setMyBirthday();
            return;
        }

        let date = new Date();
        let countdown =
            (value - date.getTime() + date.getTimezoneOffset() * 60 * 1000) /
            1000;
        this.setState({ countdown: countdown });
    }

    getMinDate() {
        let today = new Date();
        today.setDate(today.getDate() + 1);
        let tomorrow = this.addZero(
            [today.getFullYear(), today.getMonth() + 1, today.getDate()],
            "-"
        );
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

        return this.addZero([d, h, m, s], ":");
    }

    addZero = (time, separator) =>
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
