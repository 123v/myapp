import React, { Component } from 'react'
import { Input, Button, Divider } from "antd";
import './App.scss'
import App from './App'

export default class ReverseText extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             text: '',
             reverse_value: ''
        }
    }

    check = (str) => {
    let pat = /[a-zA-z]/igm;
    if (str.match(pat)) {
        return true
    } else {
        return false
    }
}

    reverseText = () => {
        try {
            // let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            let textArr = this.state.text.split('')
            let l = 0;
            let r = textArr.length - 1;
            while (l < r) {
                if (!this.check(textArr[l])) {
                    l++;
                } else if (!this.check(textArr[r])) {
                    r--;
                } else {
                    let tmp = textArr[l];
                    textArr[l] = textArr[r];
                    textArr[r] = tmp;
                    l++;
                    r--;
                }
            }
            this.setState({reverse_value: textArr.join('')})
        } catch (error) {
            console.error(error);
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <App history={this.props.history} />
                <div className="container">
                    <p>Enter Text</p>
                    <Input value={this.state.text} onChange={e => this.setState({ text: e.target.value })} />
                    <Button style={{marginTop:'20px'}} onClick={this.reverseText}>Reverse</Button>
                    <Divider />
                    {
                        this.state.reverse_value !== '' ? 
                        <React.Fragment>
                            <p>Reversed Value</p>
                            <p style={{fontWeight:'bold'}}>{this.state.reverse_value}</p>
                        </React.Fragment>
                        : null
                    }
                </div>
            </React.Fragment>
        )
    }
}
