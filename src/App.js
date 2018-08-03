import React, { Component } from 'react';
import './App.css';
import back from './back.jpg'
import {Line} from 'rc-progress'
import _every from 'lodash/every'
let imgDatas = require('./imageDatas');

function getImgURL(imgDateArray) {
    for(var i=0;i<imgDateArray.length;i++){
        var signleImageData = imgDateArray[i];
        signleImageData.imageURL = `${process.env.PUBLIC_URL}/img/${signleImageData.fileName}`;
        imgDateArray[i] = signleImageData;
    }
    return imgDateArray;
}
var time=0,level;
var urls = getImgURL(imgDatas);

//图片组件
class ImgFigure extends React.Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        this.props.inverse();
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
       const {imgData, index} = this.props;
        var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return (
            <figure  className={imgFigureClassName}  onClick={this.handleClick}>
                <img onClick={this.handleClick} src={imgData.imageURL} alt={imgData.title}/>
                <figcaption>
                    <div className="img-back" onClick={this.handleClick}>
                        <img src={back}/>
                    </div>
                </figcaption>
            </figure>

        );
    }
}


class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            imgsArrangeArr: [],
            first:0,
            second:0,
            count:1,
            percent:0,
            layer:false,
            level:1
        };
        this.timer = null;
        this.gameOver = this.gameOver.bind(this);
        this.layer  = this.layer.bind(this);
        this.wantToSee = this.wantToSee.bind(this);
    }
    countSame(index,item,first,count){
        console.log(item)
        console.log('index',index);
        console.log('first',first);
        console.log('conut',count);
        var imgsArrangeArr = this.state.imgsArrangeArr;
            if(first===0&&count===1){
                console.log('初始化')
            }else if(parseInt(item.fileName.replace(".jpg",""))===first && count%2===0){
                console.log('恭喜您，点对了')

              var allRight =  _every(imgsArrangeArr,['isInverse',false]);
                if(allRight){
                    level +=1;
                    this.setState({
                        level:level
                    })
                }

            }else if(parseInt(item.fileName.replace(".jpg",""))!==first && count%2===0) {
                console.log('点错了,让这错的图片自动翻转');
                this.setState({
                    count:1,
                    first:0
                });
                setTimeout(function () {
                    imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
                    imgsArrangeArr[first].isInverse = true;
                },300)
            }
    }

    inverse(index,item) {
        return function() {
            var imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
            //更新视图
            this.setState({
                imgsArrangeArr: imgsArrangeArr,
                first:parseInt(item.fileName.replace(".jpg","")),
                count:this.state.count+1
            });
            this.countSame(index,item,this.state.first,this.state.count);
        }.bind(this);
    }

    gameOver(){
        time += 3;
        console.log(time)
        if(this.state.percent>100){
            clearInterval(this.timer);
            this.setState({
                layer:true
            });
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

    layer(){
        this.setState({
            layer:false
        });
        //时间到了之后，将所有的卡片翻转到背面
        var imgsArrangeArr = this.state.imgsArrangeArr;
        for(var i=0;i<this.state.imgsArrangeArr.length;i++){
            imgsArrangeArr[i].isInverse = true;
        }
    }

    //偷看
    wantToSee(){
        //时间到了之后，将所有的卡片翻转到背面
        console.log('wangtosee',this.state)
        var imgsArrangeArr = this.state.imgsArrangeArr;
        for(var i=0;i<this.state.imgsArrangeArr.length;i++){
            imgsArrangeArr[i].isInverse = false;
        }
        setTimeout(function () {
            console.log('setTimeout',imgsArrangeArr)
            for(var i=0;i<imgsArrangeArr.length;i++){
                imgsArrangeArr[i].isInverse = true;
            }
        },3000)
    }


    render(){
        var imgFigures = [];
        var  _urls = [];
        var randomUrls = [];

        if(this.state.level===1){
            _urls = urls.slice(0,4)
        }else if (this.state.level===2){
            _urls = urls.slice(0,6)
        }else if(this.state===3){
            _urls = urls.slice(0,8);
        }
        var random = Math.floor(Math.random()*_urls.length*2);
        for(var i=0;i<_urls.length;i++){
            if(!randomUrls[random]){
                randomUrls.push(_urls[i]);
            }
            if(!randomUrls[random]){
                randomUrls.push(_urls[i]);
            }
        }

        randomUrls.forEach(function(item,index){
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index] = {
                    rotate: 0,
                    isInverse: true,
                }
            }
            imgFigures.push(
                <ImgFigure
                    imgData={item}
                    index={index}
                    inverse={this.inverse(index,item)}
                    arrange={this.state.imgsArrangeArr[index]}
                    ref={'imgFigure' + index}
                    key = {index}/>)
        }.bind(this));
        
        return (
            <div>
                <section className="stage">
                    <section className="progress">
                        <div className="progress-text">剩余时间</div>
                        <div className="progress-bar">
                            <Line percent={this.state.percent} strokeWidth="2" strokeColor="red" />
                        </div>
                    </section>
                    <section className="img-sec">
                        {imgFigures}
                    </section>

                </section>
                {
                    this.state.layer &&
                    <section className="layer">
                        <div className="layer-outer">
                            <div className="layer-inner">
                                <div className="layer-content">
                                    时间到了
                                </div>
                                <button onClick={this.layer}>OK</button>
                            </div>
                        </div>
                    </section>
                }
                <div className="want">
                    <button className="wantToSee"  onClick={this.wantToSee}>偷看</button>
                </div>

            </div>


        )
    }

}

export default App;
