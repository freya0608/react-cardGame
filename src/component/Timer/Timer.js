/**
 * Created by miguel on 18/8/8.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 动画callback只支持1.x版本的TransitionGroup
 */
import React, {Component} from 'react';
import {Line} from 'rc-progress'

import './timer.css'
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
//import PropTypes from 'prop-types';

class Timer extends React.Component {
    static defaultProps = {
        ...Component.defaultProps
    }
    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {}
        this.dom = React.createRef()
        //this.handleClick = this.handleClick.bind(this);
    }

    
    componentDidMount() {
        //this.dom.root=ReactDOM.findDOMNode(this);
    }

    
    render() {
        return (
            <div ref={this.dom}>
            <section className="progress">
                        <div className="progress-text">剩余时间</div>
                        <div className="progress-bar">
                            <Line percent={this.props.percent} strokeWidth="2" strokeColor="red" />
                        </div>
                    </section>
            
            </div>
        );
    }
}

export default Timer;