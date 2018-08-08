import React from "react";

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

export default ImgFigure;
