import React from 'react';
import ReactDOM from 'react-dom';
import { Timer } from './Timer';
import { ThemeChanger } from './ThemeChanger';
import './index.css'

class App extends React.Component {
    render() {
        return (
            <div className="timer">
                <Timer />
                <ThemeChanger />
            </div>
        );
    }
}

// TODO
// pick appropriate themes
// figure out a way to stop the timer and notify the user when time is up
// fix min date

ReactDOM.render(<App />, document.getElementById('root')); 