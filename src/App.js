import React, { Component } from 'react';
import './App.css';

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

       const {imgData, index,inverse} = this.props;

       console.log(inverse)
        var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return (
            <figure className={imgFigureClassName} onClick={this.handleClick} >
                <img src={imgData.imageURL} alt={imgData.title}/>
                <figcaption>
                    <h2>{imgData.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>{imgData.desc}</p>
                    </div>
                </figcaption>
            </figure>

        );
    }
}



//
class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            imgsArrangeArr: []
        };
        this.inverse = this.inverse.bind(this);
    }

    inverse(index) {
        console.log('index',index);
        return function() {
            var imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
            this.setState({
                imgsArrangeArr: imgsArrangeArr
            })
        }.bind(this);
    }



    render(){
        var imgFigures = [];
        urls.map((item,index)=>{
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index] = {
                    rotate: 0,
                    isInverse: false,
                }
            }

            imgFigures.push(
                <ImgFigure
                    imgData={item}
                    index={index}
                    inverse={this.inverse(index)}
                    ref={'imgFigure' + index}
                    key = {index}/>)
        });

        return (
            <div>
                {imgFigures}
            </div>

        )
    }

}

export default App;
