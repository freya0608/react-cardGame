import React, { Component } from 'react';
import './App.css';
import bg from './bg.png'
import ImgFigureSection from './component/ImgFigure/ImgFigure'
import Timer from './component/Timer/Timer'
import {Line} from 'rc-progress'

var time=100;
let imgDatas = require('./imageDatas');
function getImgURL(imgDateArray) {
    for(var i=0;i<imgDateArray.length;i++){
        var signleImageData = imgDateArray[i];
        signleImageData.imageURL = `${process.env.PUBLIC_URL}/img/${signleImageData.fileName}`;
        imgDateArray[i] = signleImageData;
    }
    return imgDateArray;
}

var urls = getImgURL(imgDatas);
var randomUrls = [];
var level=1;
var _level = 1

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            percent:100,
            layer:false,
            level:1,
        };        
        this.spreadImg = this.spreadImg.bind(this);
        console.log('construcetor',this.state)

    }
    
    random(urls){
        return urls.sort(function (a,b){ return Math.random() >0.5 });
    }

    spreadImg(urls) {
        var whole  = urls.concat(urls);
        return this.random(whole)
    }
     setLevel(level){
        console.log('setLvel',level)
        this.setState({
            level
        })
        console.log('new setLvel',level)
    }

    gameOver(){
        time -= 25;
        console.log(time)
        if(this.state.percent==0){
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


    //组件将要卸载
    render(){
        console.log('level parent ',this.state.level)

        if(this.state.level===1){
          var  _urls = urls.slice(0,4);
            randomUrls =   this.spreadImg(_urls)
        }
        
        if(this.state.level===2){
              _urls = urls.slice(0,6);
              randomUrls =   this.spreadImg(_urls);
        }
        if(this.state.level===3){
            _urls = urls.slice(0,8);
            randomUrls =   this.spreadImg(_urls);
      }

        var bgStyle = {
            backgroundImage: `url(${bg})`,
            width:'100%',
            height:'100vh',
            backgroundSize:'contain'
        };
        return (
            <div style={bgStyle}>

            <section className="progress">
                    <div>剩余时间</div>
                    <Line percent={this.state.percent} strokeWidth="3" strokeColor="red" />
                </section>
                <section className="stage">
                    <section>
                        <ImgFigureSection 
                        
                        setLevel = { level => this.setLevel(level) } 
                        level={this.state.level} 
                        randomUrls = {randomUrls} />
                    </section>
                </section>

            </div>
        )
    }
}

export default App;
