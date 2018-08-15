import React from "react";
import back from '../../back.jpg'
import './imgFigure.css'
import _every from 'lodash/every'
import PropTypes from 'prop-types';

class ImgFigureSection extends React.Component {
    static propTypes = {
        setLevel:PropTypes.func,
        randomUrls:PropTypes.array,
        level:PropTypes.number,
    }
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
            level:1,
            isClickable:true
        };
        this.countSame = this.countSame.bind(this);
        this.wantToSee = this.wantToSee.bind(this);

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
    componentDidMount(){
        //console.log('didmount',this.state)
    

    }
    wantToSee(){
        //时间到了之后，将所有的卡片翻转到背面
        for(var i=0;i<this.state.imgsArrangeArr.length;i++){
            this.state.imgsArrangeArr[i].isInverse = false;
            //console.log('arr',this.state.imgsArrangeArr)

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

    countSame(index,item,lastIndex,count){
         if(this.state.fNode ===''){
             this.state.fNode = item;
         }else {
             this.state.sNode = item
         }
             if(lastIndex===0&&count===1){
 /*
                 console.log('初始化')
 */
             }else if(this.state.fNode.fileName===this.state.sNode.fileName && count % 2 === 0){
                 console.log('恭喜您，点对了');
                 console.log('都对了，看看state',this.state.imgsArrangeArr);
                // console.log('count same ',count)
 
                 var allRight =  _every(this.state.imgsArrangeArr,['isInverse',false]);
                 if(allRight){
                    // console.log('all right')
                    setTimeout(()=>{
                        var imgsArrangeArr = this.state.imgsArrangeArr
                        for(var i=0;i<imgsArrangeArr.length;i++){
                            imgsArrangeArr[i].isInverse = true;
                            console.log('arr',imgsArrangeArr)
                        }
                        this.setState({
                            level:this.state.level+1,
                            imgsArrangeArr:imgsArrangeArr
                        },()=>{
                            if(this.props.setLevel){
                                setTimeout(()=>{
                                    this.props.setLevel(this.state.level)
                                },1000)
                            }
                        });
                    },2000);
                 }
                 this.state.fNode = "";
                 this.state.sNode = "";
                // console.log('countsame',this.state.level)
             }else if(this.state.fNode.fileName!==this.state.sNode.fileName && count % 2 === 0) {
                 this.state.fNode = "";
                 this.state.sNode = "";
                 this.setState({
                    isClickable:false
                 })
                 setTimeout(()=>{
                     this.state.imgsArrangeArr[index].isInverse = !this.state.imgsArrangeArr[index].isInverse;//刚才点的那张
                     this.state.imgsArrangeArr[lastIndex].isInverse = true ;//上次点的那张
                     this.setState({
                         imgsArrangeArr:this.state.imgsArrangeArr,
                     })
                 },1000);
                 setTimeout(()=>{
                     this.setState({
                        isClickable:true
                     })
                 },1000)
             }
     }
 
    render() {
        const {randomUrls} = this.props;
        console.log('reder level',this.state.level)
    
    
        var imgFigures = [];
        //console.log('chhhhrann',randomUrls);
        //console.log('this.props',this.props)

        randomUrls.forEach(function(item,index){
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index] = {
                    isInverse: true,
                    fileName:item.fileName
                }
            }
            imgFigures.push(
                <SingleImg
                    imgData={item}
                    index={index}
                    inverse={this.inverse(index,item)}
                    arrange={this.state.imgsArrangeArr[index]}
                    ref={'imgFigure' + index}
                    isClickable = {this.state.isClickable}
                    key = {index}/>)
        }.bind(this));
        return (
            <div>

                <section className="stage">               
                    <section className="img-sec">
                        {imgFigures}
                    </section>
                </section>
                <div className="want">
                    <button className="wantToSee"  onClick={this.wantToSee}>偷看</button>
                </div>
            </div>
        )
    }
}

class SingleImg extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
       
    }
    handleClick(e){
        console.log('click',this.props.isClickable)

        this.props.inverse();
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
       const {imgData} = this.props;
        var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
        console.log('render isClickable',this.props.isClickable)
        var imgFront = this.props.isClickable?'':'isClickable'

        var imgBack = 'img-back';
        imgBack += !this.props.isClickable ? ' isClickable':''
    

        return (
            <figure  className={imgFigureClassName} >
                <img className={imgFront}  onClick={this.handleClick} src={imgData.imageURL} alt={imgData.title}/>
                <figcaption>
                    <div className={imgBack} id="imgBack"   onClick={this.handleClick}>
                        <img src={back} alt="背面图片"/>
                    </div>
                </figcaption>
        
            </figure>

        );
    }
}



export default ImgFigureSection;
