
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
            percent:100,
        }
    }

    gameOver(){
        console.log('game over percent',this.state.percent);
        console.log('game over level',this.props.level)

        if(this.state.percent<1){
            this.setState({
                percent:0
            })
            this.props.setPercent(0)
            clearInterval(this.timer);
            return
        }
        if(this.props.level===2){
            this.setState({
               // percent:this.state.percent + 30
            })
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