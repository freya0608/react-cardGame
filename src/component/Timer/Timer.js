/**
 * Created by miguel on 18/8/8.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 动画callback只支持1.x版本的TransitionGroup
 */
import React from 'react';
import {Line} from 'rc-progress'
import './timer.css'

import PropTypes from 'prop-types';

// var time=99;
class Timer extends React.Component {
    static defaultProps = {
        setPercent:PropTypes.func,
        percent:PropTypes.percent,
    }
    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            percent:99,
        }
    }

    gameOver(){
        // time -= 3.3;
        //console.log('game over time',time)
        console.log('game over percent',this.state.percent);
        console.log('game over level',this.props.level)
        //var time30 = time+3.3;

        if(this.state.percent<1){
            this.setState({
                percent:0
            })
            this.props.setPercent(this.state.percent);
            clearInterval(this.timer);
            return
        }
       
        this.setState({
            percent:this.state.percent-1,
        });
    }
    componentDidMount(){
    
        console.log('didicomponent',this.state.percent)
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