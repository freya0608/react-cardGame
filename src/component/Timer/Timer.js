/**
 * Created by miguel on 18/8/8.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 动画callback只支持1.x版本的TransitionGroup
 */
import React from 'react';
import {Line} from 'rc-progress'
import './timer.css'

import PropTypes from 'prop-types';

var time=100;
class Timer extends React.Component {
    static defaultProps = {
        setPercent:PropTypes.func
    }
    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            percent:100
        }
    }

    gameOver(){
        time -= 2.5;
        //console.log(time)
        if(this.state.percent===0){
            this.props.setPercent(this.state.percent)
            clearInterval(this.timer);
            return
        }
        this.setState({
            percent:time,
        });
    }
    componentDidMount(){
        this.timer = setInterval(
            ()=> this.gameOver(),
            1000
        )
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }


    
    render() {
        return (
            <div ref={this.dom}>
            <section className="progress">
                        <div className="progress-text">剩余时间</div>
                        <div className="progress-bar">
                            <Line percent={this.state.percent} strokeWidth="2" strokeColor="red" />
                        </div>
                    </section>
            
            </div>
        );
    }
}

export default Timer;