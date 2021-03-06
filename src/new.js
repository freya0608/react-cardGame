import React, { Component } from 'react';
import './App.css';
import _every from 'lodash/every'
import bg from './bg.png'
import ImgFigure from './component/ImgFigure/ImgFigure'
import Timer from './component/Timer/Timer'



var time=100;
var  _urls = [];

//图片组件


class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            imgsArrangeArr: [],
            lastIndex:0,
            index:0,
            second:0,
            fNode:"",
            sNode:"",
            count:1,
            percent:100,
            layer:false,
            level:1,
            randomUrls:[],
        };
        this.timer = null;
        this.gameOver = this.gameOver.bind(this);
        this.layer  = this.layer.bind(this);
        this.wantToSee = this.wantToSee.bind(this);
        this.spreadImg = this.spreadImg.bind(this);
    }
    countSame(index,item,lastIndex,count){
       /* console.log(item);
        console.log('index',index);
        console.log('lastIndex',lastIndex);
        console.log('conut',count);*/


        if(this.state.fNode==''){
            this.state.fNode = item;
        }else {
            this.state.sNode = item
        }
            if(lastIndex===0&&count===1){
/*
                console.log('初始化')
*/
            }else if(this.state.fNode.fileName===this.state.sNode.fileName && count % 2 === 0){
                /*console.log('恭喜您，点对了');
                console.log('都对了，看看state',this.state.imgsArrangeArr);*/

                var allRight =  _every(this.state.imgsArrangeArr,['isInverse',false]);
                if(allRight){
                    setTimeout(()=>{
                        for(var i=0;i<this.state.imgsArrangeArr.length;i++){
                            this.state.imgsArrangeArr[i].isInverse = true;
                        }
                        this.setState({
                            level:this.state.level+1,
                            imgsArrangeArr:this.state.imgsArrangeArr

                        });
                    },2000);

                   /* for(var i=0;i<this.state.imgsArrangeArr.length;i++){
                        this.state.imgsArrangeArr[i].isInverse = true;
                    }
                    this.setState({
                        imgsArrangeArr:this.state.imgsArrangeArr
                    })*/



                }
                this.state.fNode = "";
                this.state.sNode = "";
            }else if(this.state.fNode.fileName!==this.state.sNode.fileName && count % 2 === 0) {
                this.state.fNode = "";
                this.state.sNode = "";
                setTimeout(()=>{
                    this.state.imgsArrangeArr[index].isInverse = !this.state.imgsArrangeArr[index].isInverse;//刚才点的那张
                    this.state.imgsArrangeArr[lastIndex].isInverse = true ;//上次点的那张
                    this.setState({
                        imgsArrangeArr:this.state.imgsArrangeArr,
                    })
                },1000);

            }
    }


    componentWillUpdate(nextProps, nextState){
        console.log('this.statecomponentWillUpdate',this.state);
       /* console.log('componentWillUpdate')
        console.log('nextState',nextState);
        console.log('nextProps',nextState);
        console.log('this.state',this.state);
        console.log('componentWillUpdate');
        console.log('this.state.imgsArrangeArr',this.state.imgsArrangeArr)
        console.log('componentDidUpdate');*/

    }

    inverse(index,item) {
        return function() {
            this.state.imgsArrangeArr[index].isInverse = !this.state.imgsArrangeArr[index].isInverse;
            //更新视图
            this.setState({
                imgsArrangeArr: this.state.imgsArrangeArr,
                lastIndex:index,
                count:this.state.count+1
            });
            this.countSame(index,item,this.state.lastIndex,this.state.count);
        }.bind(this);
    }

    gameOver(){
        time -= 2.5;
        if(this.state.percent<2.5){
            this.state.percent = 0;
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
        //this.timer = setInterval(
           // ()=> this.gameOver(),
           // 1000
       // )




        //第一局

        console.log('didMount')


        if(this.state.level===1){
            _urls = urls.slice(0,4);
            this.spreadImg(_urls);
        }
        if(this.state.level===2){
            _urls = urls.slice(0,6);
            this.spreadImg(_urls);
        }else if(this.state===3){
            _urls = urls.slice(0,8);
            this.spreadImg(_urls);
        }

    }

    random(urls){
        return urls.sort(function (a,b){ return Math.random() >0.5 });
    }

    spreadImg(urls) {
        var whole  = urls.concat(urls);
        this.setState({
            randomUrls:this.random(whole)
        });
    }



    //get start end  over

    componentWillMount(){

        console.log('componentWillMount',this.state)

/*
        console.log('componentWillUpdate')
*/


    }

    componentWillUnmount(){
        console.log('componentWillUnmount',this.state)

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
        for(var i=0;i<this.state.imgsArrangeArr.length;i++){
            this.state.imgsArrangeArr[i].isInverse = false;
            console.log('arr',this.state.imgsArrangeArr)

        }
        this.setState({
            imgsArrangeArr:this.state.imgsArrangeArr
        });

        setTimeout( ()=> {
            for(var i=0;i<this.state.imgsArrangeArr.length;i++){
                this.state.imgsArrangeArr[i].isInverse = true;
            }
            this.setState({
                imgsArrangeArr:this.state.imgsArrangeArr
            })
        },3000)
    }

    //组件将接收道具
    componentWillReceiveProps(nextProps){
/*
        console.log('componentWillReceiveProps')
*/
    }
    shouldComponentUpdate(nextProps, newState) {

        console.log('shouldComponentUpdate')
        console.log('this.state',this.state);
       console.log('nextState',newState);


       return true

        console.log('shouldComponentUpdate')



    }
    //组件将更新

    //组件更新完毕
    componentDidUpdate(nextProps, nextState){
        console.log('this.statecomponentDidUpdate',this.state);




    }
    //组件将要卸载




    render(){
        var imgFigures = [];

        console.log('this.state.level',this.state.level);

        this.state.randomUrls.forEach(function(item,index){
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index] = {
                    isInverse: true,
                    fileName:item.fileName
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

        var bgStyle = {
            backgroundImage: `url(${bg})`,
            width:'100%',
            height:'100vh',
            backgroundSize:'contain'
        };
        
        return (
            <div style={bgStyle}>
                <section className="stage">
                    <Timer percent = {this.state.percent}/>
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
