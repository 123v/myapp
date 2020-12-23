import React, { Component } from 'react'
import { Slider, Input } from 'antd';
import './App.scss'
import App from './App'

export default class slider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            min: 0,
            max: 100,
            slider_value: 52,
        }
    }

    callback = () => {

    }

    isNumber = (evt) => {
        if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
            evt.preventDefault();
        }
    };

    render() {
        return (
            <React.Fragment>
                <App history={this.props.history} />
                <div className="container">
                    <div>
                        <p>Min</p><Input value={this.state.min} onChange={(e) => this.setState({ min: e.target.value })} onKeyPress={this.isNumber} />
                        <p>Max</p><Input value={this.state.max} onChange={(e) => this.setState({ max: e.target.value })} onKeyPress={this.isNumber} />
                    </div>
                    <div className="slider-container">
                        <p>{this.state.min}</p>
                        <Slider
                            defaultValue={30}
                            min={this.state.min}
                            max={this.state.max}
                            value={this.state.slider_value}
                            onChange={(e) => this.setState({ slider_value: e })}
                            tooltipVisible
                        />
                        <p>{this.state.max}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
