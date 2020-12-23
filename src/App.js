import React, { Component } from 'react'
import './App.scss'
import Slider from './Slider'
export default class App extends Component {

	callback = () => {

	}
	
	render() {
		return (
			<React.Fragment>
				<header className="header">
					<p onClick={() => this.props.history.push('./slider')}>Slider</p>
					<p onClick={() => this.props.history.push('./reversetext')}>Reverse Text</p>
				</header>
			</React.Fragment>
		)
	}
}
