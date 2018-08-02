import React, { Component } from 'react';
import './App.css';
import back from './back.jpg'
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
            count:1
        }
    }
    countSame(index,item,first,count){
        console.log(item)
        console.log('index',index);
        console.log('first',first)
        console.log('conut',count);
            if(first===0){
                console.log('初始化')
            }else if(parseInt(item.fileName.replace(".jpg",""))===first && count%2===0){
                console.log('恭喜您，点对了')
            }else if(parseInt(item.fileName.replace(".jpg",""))!==first && count%2===0) {
                console.log('点错了,让这错的图片自动翻转');
                this.state.count = 1;
                this.state.first =  0;
                var imgsArrangeArr = this.state.imgsArrangeArr;
                setTimeout(function () {
                    imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
                    imgsArrangeArr[first].isInverse = true;
                },500)
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

    render(){
        var imgFigures = [];

        urls.forEach(function(item,index){
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
            <section className="stage">
                <section className="">进度条</section>
                <section className="img-sec">
                    {imgFigures}
                </section>
            </section>
        )
    }

}

export default App;
