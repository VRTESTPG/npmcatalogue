import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Container from 'react-bootstrap/Container';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

class ExpContents extends React.Component
{
    constructor()
    {
        super()
        this.ContentRef = React.createRef();
        this.state =
        {
            assessmentRender : false,
        }

    
    }

    CloseExpContent()
    {
        this.ContentRef.current.className = "expInformationUnloaded";
        
        setTimeout(
            this.props.ResetExpInformation()
            
            
            , 100
        )

    }

    SelectAbout = () =>
    {
        this.setState(
            {
                assessmentRender : false
            })
    }

    SelectAssessment = () =>
    {
        this.setState(
        {
            assessmentRender : true
        })
    }

    formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    ConstructContentAbout()
    {
        let arrHtml; 
        arrHtml = 
        <React.Fragment>
            <Col>
                <div style={{paddingTop:'2%'}}>
                    <span className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle" }>Key Design Concept:</span> 
                    <span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent" }>{this.props.ExpContentInformation.expKeyDesignConcept}</span>
                </div>
            </Col>
            <Col>
                <div style={{paddingTop:'2%'}}>
                    <span className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle" }>Key Technology Platform:</span> 
                    <span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent" }>{this.props.ExpContentInformation.expKeyTechnicalPlatform}</span>
                </div>
            </Col>
            <Col style={{paddingTop:'2%'}}>
                <Row className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Shopper Problem to Address:</Row>
            </Col>
            <Col>
                <Row className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"} style={{width:'90%', textAlign:'left'}}>
                {this.props.ExpContentInformation.expShoppersProblem}
                </Row>
            </Col>
            <Col style={{paddingTop:'2%'}}>
                <Row className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>What's the experience?</Row>
            </Col>
            <Col>
                <Row className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"} style={{width:'90%', textAlign:'left'}}>
                {this.props.ExpContentInformation.expAbout}
                </Row>
            </Col>
        </React.Fragment>

        return arrHtml;
    }

    ConstructAssessmentListing()
    {
        let arrHtml; 
        arrHtml = 
        <React.Fragment>
            <Col style={{paddingTop:'2%'}}>
                <Row className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Overall Assessment</Row>
            </Col>
            <Col>
                <Row className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"} style={{width:'90%', textAlign:'justify'}}>
                {this.props.ExpContentInformation.assessmentOfExperience}
                </Row>
            </Col>
            <Col style={{paddingTop:'2%'}}>
                <Row className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Strengths:</Row>
            </Col>
            <Col>
                <Row className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"} style={{width:'90%', textAlign:'justify'}}>
                {this.props.ExpContentInformation.expStr}
                </Row>
            </Col>
            <Col style={{paddingTop:'2%'}}>
                <Row className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Opportunities:</Row>
            </Col>
            <Col>
                <Row className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"} style={{width:'90%', textAlign:'justify'}}>
                {this.props.ExpContentInformation.expOppoExp}
                </Row>
            </Col>
            <Col style={{paddingTop:'2%'}}>
                <Row className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>What's next?:</Row>
            </Col>
            <Col>
                <Row className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"} style={{width:'90%', textAlign:'justify'}}>
                {this.props.ExpContentInformation.expWhatsNext}
                </Row>
            </Col>
        </React.Fragment>

        return arrHtml;
    }

    ConstructSelectorBar()
    {
        var contentArr = ['ABOUT', 'ASSESSMENT']
        var classArr = (this.state.assessmentRender) ? ['storeSelectorUnSelected', 'popUpSelected'] : ['storeSelectorSelected', 'popUpUnSelected']
        var highLightArr = (this.state.assessmentRender) ? ['tabUnselected', 'tabSelected'] : ['tabSelected', 'tabUnselected']

        var functionArr = [this.SelectAbout, this.SelectAssessment]

        var arrHtml = new Array(contentArr.length).fill(0).map( ( zero, index ) =>
            <div  className={highLightArr[index]}>
                <div key={Math.random()} style={(this.props.isMobile) ?{fontSize:'2vh', marginTop:'7.0%'} : {marginTop:'2.5%'}} className={classArr[index]} onClick={() => functionArr[index]()}>{contentArr[index]}</div>
            </div>
        );

        return arrHtml;
    }

    selectingThumbnail(index)
    {
        
        var counter = 0;
        console.log(this.props.ArrayOfExpThumbnailRef);
        this.props.ArrayOfExpThumbnailRef.forEach(element => {
            if(element.current)
            {
                if(counter++ === index)
                {
                    element.current.className = 'imgThumbNailSelected'
                }
                else
                {
                    element.current.className = 'imgThumbNailUnselected'
                }
            }

        });
    }


    ConstructImageGallery()
    {
        var imageArray = [];
        var thumbArray = [];
        let retHtml;
        if(this.props.ExpContentInformation && this.props.ExpContentInformation.expImgs)
        {
            (this.props.ExpContentInformation.expImgs).forEach(element => {
                //<ReactPlayer style={{width:'250x'}} url={url}></ReactPlayer>
                var url = element.fields.file.url;
                if(url.includes('videos'))
                {
                    imageArray.push(
                        
                            <div key={Math.random()} style={{width:'100%'}}>
                                <video style={{width:'100%', height:'250px'}} src={url} controls>
                                    
                                </video>
                            </div>
                        
                    );
                    thumbArray.push("../assets/playbtn.png" )
                }
                else
                {
                    imageArray.push(
                        <div key={Math.random()} style={{textAlign:'center'}}><img alt="bigpics" style={{height:'250px'}} src={url}/></div>
                    );
                    thumbArray.push(url)
                }
            });

                        
            if(this.props.ArrayOfExpThumbnailRef.length < 1)
            {
                thumbArray.forEach(element => {
                    this.props.ArrayOfExpThumbnailRef.push(React.createRef());
                });
            }

            var arrHtml = new Array(thumbArray.length).fill(0).map( ( zero, index ) =>
                <div className="imgThumbnails" key={Math.random()}>
                    <img ref={this.props.ArrayOfExpThumbnailRef[index]} alt="cards"  className={(index === 0)? 'imgThumbNailSelected' : 'imgThumbNailUnselected' } style={{height:'75px', width:'85%'}} src={
                        (thumbArray[index].includes('video')) 
                        ? '../assets/playbtn.png'  :
                         thumbArray[index]
                    } onClick={() => {
                
                    this.Carousel.goToSlide(index)
                    this.selectingThumbnail(index);
                }}/>
                </div>
            );

        
            retHtml =
            <Row style={{width:'100%', marginRight:'0px', marginLeft:'0px'}}>
                <Col><Carousel 
                    showDots
                    responsive={responsive}
                    ref={(el) => (this.Carousel = el)}
                    >
                    
                    {imageArray}
                    </Carousel>
                    <div className="thumbnailScrollBox">
                        {arrHtml}
                    </div>
                </Col>
            </Row>
        }
        else
        {
            retHtml =
            <Row style={{width:'100%', height:'200px'}}>
                <Col></Col>
            </Row>
        }
        return retHtml;
    }

    ConstructTitleHeader()
    {
        var arrHtml = 
        <React.Fragment>
            <Row style={{width:'100%'}}>
                <Col className="StoreInformationTitleContainer">
                    <h2 className="StoreInformationTitle"><b>{this.props.ExpContentInformation.experienceName}</b></h2>
                </Col>
            </Row>
        </React.Fragment>
        return arrHtml;
    }

    ShutOwnExp()
    {
        if(this.props.RenderSearchContents)
        {
            this.props.ExpInformationRef.current.className = "justify-content-md-center expInformationUnloaded";
            this.props.ShutDownExpOnly();
        }
        else
        {
            this.props.ExpInformationRef.current.className = "justify-content-md-center expInformationUnloaded";

            this.props.BringUpStoreShutDownExp();
        }

    }

    ShutExpStore()
    {
        this.props.ExpInformationRef.current.className = "justify-content-md-center expInformationUnloaded";
        this.props.StoreInformationRef.current.className = "justify-content-md-center storeInformationUnloaded";
        this.props.DeactivateStoreExpListing();
        this.props.ShutDownBothStoreAndExp();
        setTimeout(
            
            this.props.ResetStoreInformation(), 100
            
        )
    }

    ShutEverything()
    {
        this.props.ExpInformationRef.current.className = "justify-content-md-center expInformationUnloaded";
        this.props.ShutDownExpOnly();
        this.props.ShutListingAndInformation();
        

            setTimeout(() => {
                this.props.StoreListingRef.current.className ="storeListingUnloaded widthZero";
            }, 100);
    }
    
    componentDidUpdate()
    {
        this.props.UpdateMyHeight(this.props.ExpInformationRef.current.clientHeight);
    }



    render() {
        let headerTitle;
        let cross;
        let StoreInformationTitle;
        let ImageGallery;
        let CategoryHeader;
        let ContentContainer;
        let headerOpener;
        let footCloser;
        if(this.props.RenderExpContent)
        {
            console.log(this.props.StoreInformationToRender)
            this.props.ExpInformationRef.current.className = "justify-content-md-center expInformationLoaded"
            /*headerTitle = <b className="HeaderTitle">Browsing {this.props.ExpContentInformation.experienceName}</b>
            cross = <img src="../assets/cross.png" alt="crossCancel" onClick={() => this.CloseExpContent()} style={(this.props.isMobile)? {width:'10%', float:'right'} : {width:'5%', float:'right'}}/>*/
            var symbol = "<"
            var Text = (this.props.RenderSearchContents) ? " Back To Search Results" : " Back To " + this.props.StoreInformationToRender.storeName;
            headerTitle = (this.props.isMobile) ? 
                                <div><span>{symbol}</span><span className="mobileBackText" style={{cursor: 'pointer'}} onClick={() => this.ShutOwnExp()} >{Text} </span></div>
                            :
                                (this.props.RenderSearchContents) ?
                                    <div> <span style={{cursor: 'pointer', textDecoration:'underline'}} onClick={()=> this.ShutEverything()}>Home </span>
                                        > <span style={{cursor: 'pointer', textDecoration:'underline'}} onClick={()=> this.ShutOwnExp()}>Search Results</span> 
                                        > {this.props.ExpContentInformation.experienceName}
                                    </div>
                                :
                                    <div> <span style={{cursor: 'pointer', textDecoration:'underline'}} onClick={()=> this.ShutEverything()}>Home </span>
                                        > <span style={{cursor: 'pointer', textDecoration:'underline'}} onClick={()=> this.ShutExpStore()}>{this.props.CountryToRender}</span>
                                        > <span style={{cursor: 'pointer', textDecoration:'underline'}} onClick={()=> this.ShutOwnExp()}>{this.props.StoreInformationToRender.storeName}</span> 
                                        > {this.props.ExpContentInformation.experienceName}
                                    </div>

            StoreInformationTitle = this.ConstructTitleHeader();
            ImageGallery = this.ConstructImageGallery();
            var ContentBar = this.ConstructSelectorBar();
            CategoryHeader = <div className="contentAboutExp" style={(this.props.isMobile) ? {display:'flex', width:'100%', height:'50px'} : {display:'flex', width:'100%', height:'50px'}}>
                                {ContentBar}
                            </div>
            ContentContainer = (this.state.assessmentRender) ? this.ConstructAssessmentListing() : this.ConstructContentAbout();
            

            ContentContainer = <div style={{paddingBottom:'10%'}}  className="justify-content-md-center expListingForStoreInfo" >
                                 {ContentContainer}
                                </div>

            headerOpener =  <div>{headerTitle}</div>;
                
            footCloser = <Row className="justify-content-md-center" style={{width:'100%', marginLeft:'unset', marginTop:'1%'}} >
            <div style={(this.props.isMobile) ? {width:'100%', textAlign:'center' , marginTop:'5%'} : {width:'70%', textAlign:'center' , marginTop:'5%'}}>
                <img onClick={() => window.scrollTo(0, 0)} style={{cursor: 'pointer', width:'22.5%'}} src="../assets/goToTop.svg"></img>
            </div>
            </Row>
        }
        return(
            /*<<Container style={{paddingLeft:'0px', paddingRight:'0px', maxWidth:'800px'}}>*/
            <Row className="justify-content-md-center expInformationUnloaded" ref={this.props.ExpInformationRef} style={(this.props.RenderExpContent) ? (this.props.isMobile)  ? {minHeight:this.props.LongestHeight, marginTop:'6.0rem', width:'100%', background:'#F7F7F9', display:'inline-flex'} : {minHeight:this.props.LongestHeight, marginTop:'10.5vw', width:'100%', background:'#F7F7F9', display:'inline-flex'} : {visibility:'hidden'} }>
                <div className="justify-content-md-center" style={(this.props.isMobile) ? {width:'100%', paddingLeft:'5%', paddingRight:'5%'} : {width:'70%', marginTop:'1%'}}>
                {headerOpener}
                {StoreInformationTitle}
                {ImageGallery}
                {CategoryHeader}
                {ContentContainer}
                {footCloser}
                </div>
            </Row>
            /*</Container>*/
        );
    }
}

export default ExpContents