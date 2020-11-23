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

class StoreContents extends React.Component
{
    constructor()
    {
        super()
        this.showAdminPanel = false;
        this.LowerBarRef = React.createRef(); 
        this.ExpandButtonRef = React.createRef();      
    }


    SelectAbout = () =>
    {
        this.props.DeactivateStoreExpListing();
    }

    SelectExperience = () =>
    {
        this.props.ActivateStoreExpListing();
    }

    formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    ShowAdminDropDown()
    {
        if(this.props.isMobile)
        {
         if(this.LowerBarRef.current.className === 'justify-content-md-center adminPanelHiddenMobile')
         {
             this.LowerBarRef.current.className = "justify-content-md-center adminPanelUnhiddenMobile";
             this.ExpandButtonRef.current.src = "../assets/hideAdmin.svg"
         }
         else
         {
             this.LowerBarRef.current.className = "justify-content-md-center adminPanelHiddenMobile";
             this.ExpandButtonRef.current.src = "../assets/viewAdmin.svg"
 
         }
        }
        else
        {
         if(this.LowerBarRef.current.className === 'justify-content-md-center adminPanelHidden')
         {
             this.LowerBarRef.current.className = "justify-content-md-center adminPanelUnhidden";
             this.ExpandButtonRef.current.src = "../assets/hideAdmin.svg"
         }
         else
         {
             this.LowerBarRef.current.className = "justify-content-md-center adminPanelHidden";
             this.ExpandButtonRef.current.src = "../assets/viewAdmin.svg"
 
         }
        }
    }

    ConstructContentAbout()
    {
        let arrHtml; 
        arrHtml = 
        <div>
        <div className="contentBoxAboutExp">
            <Col>
                <div style={{paddingTop:'2%'}}>
                    <span className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle" }>Status:</span> 
                    <span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent" }>{(this.props.StoreInformationToRender.storesActiveStatus) ? 'Active' : 'InActive'}</span>
                </div>
            </Col>
            <Col>
            <div style={{paddingTop:'2%'}}>
                    <span className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Launch Date:</span> 
                    <span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"}>{this.formatDate(this.props.StoreInformationToRender.launchDate)}</span>
            </div>
            </Col>
            <Col>
            <div style={{paddingTop:'2%'}}>
                    <span className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Number of Experiences:</span> 
                    <span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"}>{this.props.StoreInformationToRender.storeNumExperience}</span>
            </div>
            </Col>
            <Col style={{paddingTop:'2%'}}>
                <Row className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Description</Row>
            </Col>
            <Col>
                <Row className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"} style={{width:'90%', textAlign:'left'}}>
                    {this.props.StoreInformationToRender.storeAboutText}
                </Row>
            </Col>
            {(this.props.StoreInformationToRender.storeAdminInform)
            ?
            <Col>
                <Row className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"} style={{width:'90%', textAlign:'left'}}>
                    <img onClick={() => this.ShowAdminDropDown()} ref={this.ExpandButtonRef} style={(this.props.isMobile) ? {width:'50%', marginTop:'5%'} : {width:'25%', marginTop:'5%'}} src="../assets/viewAdmin.svg"></img>
                </Row>
            </Col>
            :
            <Col></Col>
            }
        </div>
            {(this.props.StoreInformationToRender.storeAdminInform)
            ?
            <div className={(this.props.isMobile)? "justify-content-md-center adminPanelHiddenMobile"  : "justify-content-md-center adminPanelHidden"}  ref={this.LowerBarRef}>
                <div className="justify-content-md-center" style={{width:'100%'}}>
                    <Col className="adminContentBox">
                        <Row style={{paddingTop:'1%'}}>
                            <Col style={{textAlign:'right'}}><span style={{fontSize:'2vh'}} className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Door Code:</span></Col>
                             
                            <Col style={{paddingLeft:'0px',textAlign:'left'}}><span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"}>{this.props.StoreInformationToRender.storeAdminInform.fields.doorCode}</span></Col>
                        </Row>
                    <Row style={{paddingTop:'1%'}}>
                        <Col style={{textAlign:'right'}}><span style={{fontSize:'2vh'}} className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Creative Agency:</span> </Col>
                        <Col style={{paddingLeft:'0px',textAlign:'left'}}><span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"}>{this.props.StoreInformationToRender.storeAdminInform.fields.creativeAgency}</span></Col>
                    </Row>
                    <Row style={{paddingTop:'1%'}}>
                        <Col style={{textAlign:'right'}}><span style={{fontSize:'2vh'}} className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Fabricator:</span> </Col>
                        <Col style={{paddingLeft:'0px',textAlign:'left'}}><span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"}>{this.props.StoreInformationToRender.storeAdminInform.fields.fabricator}</span></Col>
                    </Row>
                    <Row style={{paddingTop:'1%'}}>
                        <Col style={{textAlign:'right'}}><span style={{fontSize:'2vh'}} className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Support Structure:</span></Col>
                        <Col style={{paddingLeft:'0px',textAlign:'left'}}><span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"}>{this.props.StoreInformationToRender.storeAdminInform.fields.supportStructure}</span></Col>
                    </Row>
                    <Row style={{paddingTop:'1%'}}>
                        <Col style={{textAlign:'right'}}><span style={{fontSize:'2vh'}} className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Creative Agency Fee:</span> </Col>
                        <Col style={{paddingLeft:'0px',textAlign:'left'}}><span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"}>{this.props.StoreInformationToRender.storeAdminInform.fields.creativeAgencyFee}</span></Col>
                    </Row>
                    <Row style={{paddingTop:'1%'}}>
                        <Col style={{textAlign:'right'}}><span style={{fontSize:'2vh'}} className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Fabrication Expenses:</span> </Col>
                        <Col style={{paddingLeft:'0px',textAlign:'left'}}><span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"}>{this.props.StoreInformationToRender.storeAdminInform.fields.fabricationExpen}</span></Col>
                    </Row>
                    <Row style={{paddingTop:'1%'}}>
                        <Col style={{textAlign:'right'}}><span style={{fontSize:'2vh'}} className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Expense Remarks:</span> </Col>
                        <Col style={{paddingLeft:'0px',textAlign:'left'}}><span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"}>{this.props.StoreInformationToRender.storeAdminInform.fields.expenRemarks.content[0].content[0].value}</span> </Col>
                        
                    </Row>
                    <Row style={{paddingTop:'1%'}}>
                        <Col style={{textAlign:'right'}}><span style={{fontSize:'2vh'}} className={(this.props.isMobile) ? "ContentInformationTitleMobile": "ContentInformationTitle"}>Floor Plan:</span>  </Col>
                        {(this.props.StoreInformationToRender.storeAdminInform.fields.floorPlan) 
                        ?
                        <Col style={{paddingLeft:'0px',textAlign:'left'}}><img style={{marginLeft:'5%', width:'20%'}} src={this.props.StoreInformationToRender.storeAdminInform.fields.floorPlan.fields.file.url}></img></Col>
                        :
                        <Col style={{paddingLeft:'0px',textAlign:'left'}}><span className={(this.props.isMobile) ? "ContentInformationContentMobile": "ContentInformationContent"}>Coming Soon</span> </Col>
                        }
                    </Row>
                    </Col>
                </div>
            </div>
            :
            <div></div>
            }
        </div>
        return arrHtml;
    }
    

    ConstructExpListing()
    {
        var currentExpInStore = this.props.StoreInformationToRender.expInStore;
        var arrHtml = new Array(currentExpInStore.length).fill(0).map( ( zero, index ) =>
        

        <React.Fragment key={Math.random()}>
        <Row style={{width:'100%', marginLeft:'unset'}} >
            <Row style={{width:'100%', marginTop: '3.5%', paddingBottom: '5%'}}>
            
            <Col xs="5" style={{textAlign: 'center'}}  key={index} onClick={() => this.props.ActivateExpContents(currentExpInStore[index].fields, this.props.StoreInformationToRender,this.props.CountryToRender )}>
                        {(currentExpInStore[index].fields.expThumbnailImg!= null) ? 
                        <img alt="storeThumbnails" className="imageThumbnailExp" src={currentExpInStore[index].fields.expThumbnailImg.fields.file.url} style={(this.props.isMobile) ?  {width:'100%',height:'100px', marginLeft:'7.5%'} :  {width:'75%',height:'150px', marginLeft:'7.5%'}}/>
                        : <Row></Row>}
            </Col>
            <Col xs="5" onClick={() => this.props.ActivateExpContents(currentExpInStore[index].fields, this.props.StoreInformationToRender,this.props.CountryToRender )}>
            <Row className="storeListingHeader" style={(this.props.isMobile)? {fontSize:'2.5vh'} : {fontSize:'3.5vh'}}><b>{currentExpInStore[index].fields.experienceName}</b></Row>
            </Col>
            
            <Col xs="1" style={{position:'relative'}}>
                <Row>
                    <img alt={index} src="../assets/viewDetails.svg" onClick={() => this.props.ActivateExpContents(currentExpInStore[index].fields, this.props.StoreInformationToRender,this.props.CountryToRender )} style={(this.props.isMobile) ? {width:'350%', position:'absolute', bottom:'0', right:'0', marginRight:'10%', marginBottom:'10%'} :  {width:'200%', position:'absolute', bottom:'0', right:'0', marginRight:'10%', marginBottom:'10%'}}></img>
                </Row>
            </Col>
        </Row>
        </Row>

        </React.Fragment>
        );

        return arrHtml;
    }

    ConstructSelectorBar()
    {
        var contentArr = ['DESCRIPTION', 'EXPERIENCE']
        var classArr = (this.props.StoreExpRender) ? ['storeSelectorUnSelected', 'popUpSelected'] : ['storeSelectorSelected', 'popUpUnSelected']
        var highLightArr = (this.props.StoreExpRender) ? ['tabUnselected', 'tabSelected'] : ['tabSelected', 'tabUnselected']
        var functionArr = [this.SelectAbout, this.SelectExperience]

        var arrHtml = new Array(contentArr.length).fill(0).map( ( zero, index ) =>
            <div  className={highLightArr[index]}>
                <div key={Math.random()} style={(this.props.isMobile) ?{fontSize:'2vh', marginTop:'7%'} : {marginTop:'2.5%'}} className={classArr[index]} onClick={() => functionArr[index]()}>{contentArr[index]}</div>
            </div>
        );

        return arrHtml;
    }

    selectingThumbnail(index)
    {
        
        var counter = 0;
        console.log(this.props.ArrayOfThumbnailRef);
        this.props.ArrayOfThumbnailRef.forEach(element => {
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
        /*
        var imageArray = [];
        let retHtml;
        if(this.props.StoreInformationToRender.storeImages)
        {
            (this.props.StoreInformationToRender.storeImages).forEach(element => {
                
                imageArray.push(
                    {
                        original: element.fields.file.url,
                        thumbnail: element.fields.file.url,
                    }
                );
            });
            retHtml =
            <Row style={{width:'100%'}}>
                <Col><ImageGallery items={imageArray} /></Col>
            </Row>
        }
        else
        {
            retHtml =
            <Row style={{width:'100%', height:'200px'}}>
                <Col></Col>
            </Row>
        }*/

        var imageArray = [];
        var thumbArray = [];
        let retHtml;
        if(this.props.StoreInformationToRender && this.props.StoreInformationToRender.storeImages)
        {

            (this.props.StoreInformationToRender.storeImages).forEach(element => {
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
            
            if(this.props.ArrayOfThumbnailRef.length < 1)
            {
                thumbArray.forEach(element => {
                    this.props.ArrayOfThumbnailRef.push(React.createRef());
                });
            }


            var arrHtml = new Array(thumbArray.length).fill(0).map( ( zero, index ) =>
                <div className="imgThumbnails" key={Math.random()}>
                    <img ref={this.props.ArrayOfThumbnailRef[index]} alt="cards" className={(index === 0)? 'imgThumbNailSelected' : 'imgThumbNailUnselected' } style={{height:'75px', width:'85%'}} src={
                        (thumbArray[index].includes('video')) 
                        ? '../assets/playbtn.png'  :
                         thumbArray[index]
                    } onClick={() => {
                
                    this.Carousel.goToSlide(index);
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
                    <h2 className="StoreInformationTitle"><b>{this.props.StoreInformationToRender.storeName}</b></h2>
                </Col>
            </Row>
            <Row style={{width:'100%'}}>
                <Col className="StoreInformationSubTitleContainer">
                    <h2 className="StoreInformationSubTitle"><b>{this.props.StoreInformationToRender.storeLocation}</b></h2>
                </Col>
            </Row>
        </React.Fragment>
        return arrHtml;
    }

    ShutOwnListing()
    {
        this.props.StoreInformationRef.current.className = "justify-content-md-center storeInformationUnloaded";
        this.props.SkiiLogoRef.current.className = (this.props.RenderStores) ? ((this.props.isMobile) ? 'skiiLogo'  : 'skiiLogoDesktop') : ((this.props.isMobile) ? 'skiiLogoFaded' : 'skiiLogoFadedDesktop');
        this.props.DeactivateStoreExpListing();
        setTimeout(
            
            this.props.ResetStoreInformation(), 100
            
        )
    }

    ShutEveryThing()
    {
        this.props.ShutListingAndInformation();
            setTimeout(() => {
                this.props.StoreListingRef.current.className ="storeListingUnloaded widthZero";
            }, 100);
    }

    componentDidUpdate()
    {
        this.props.UpdateMyHeight(this.props.StoreInformationRef.current.clientHeight);

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
        if(this.props.RenderStoreContent && this.props.StoreInformationToRender)
        {
            
            this.props.StoreInformationRef.current.className = "justify-content-md-center storeInformationLoaded"
            this.props.SkiiLogoRef.current.className = (this.props.isMobile) ? 'skiiLogo'  : 'skiiLogoDesktop';
            var symbol = "<"
            var Text = " Back To " + this.props.CountryToRender
            var labCheck = (this.props.CountryToRender === 'Lab') ? ''  : <span style={{cursor: 'pointer', textDecoration:'underline'}} onClick={() => this.ShutOwnListing()}>{this.props.CountryToRender}</span>
            /*headerTitle = <b className="HeaderTitle">Browsing {this.props.StoreInformationToRender.storeName}</b>*/
            headerTitle = (this.props.isMobile) ?
                            <div><span>{symbol}</span><span className="mobileBackText" style={{cursor: 'pointer'}} onClick={() =>  (this.props.CountryToRender === 'Lab')  ? this.ShutEveryThing() : this.ShutOwnListing()} >{Text} </span> </div>
                            : 
                            <div><span style={{cursor: 'pointer', textDecoration:'underline'}} onClick={() => this.ShutEveryThing()}>Home</span>
                                 {(this.props.CountryToRender === 'Lab') ? '' : ' > '}
                                 {labCheck}  > 
                                 {this.props.StoreInformationToRender.storeName}</div>
            cross = <img src="../assets/cross.png" alt="crossCancel" onClick={() => this.CloseStoreContent()} style={(this.props.isMobile)? {width:'10%', float:'right'} : {width:'4%', position:'absolute', top:'3%', right:'0%', zIndex:'3'}}/>
            StoreInformationTitle = this.ConstructTitleHeader();
            ImageGallery = this.ConstructImageGallery();
            var ContentBar = this.ConstructSelectorBar();
            CategoryHeader = <div className="contentAboutExp" style={(this.props.isMobile) ? {display:'flex', width:'100%', height:'50px'} : {display:'flex', width:'100%', height:'50px'}}>
                                {ContentBar}
                            </div>
            ContentContainer = (this.props.StoreExpRender) ? <div  className= "justify-content-md-center expListingForStoreInfo"  >{this.ConstructExpListing()}</div> : this.ConstructContentAbout();
            headerOpener = <div>{headerTitle}</div>
            
            console.log(this.props.HeightToTake);
            footCloser = <Row className="justify-content-md-center" style={{width:'100%', marginLeft:'unset', marginTop:'1%'}} >
            <div style={(this.props.isMobile) ? {width:'100%', textAlign:'center' , marginTop:'5%'} : {width:'70%', textAlign:'center' , marginTop:'5%'}}>
                <img onClick={() => window.scrollTo(0, 0)} style={{cursor: 'pointer', width:'22.5%'}} src="../assets/goToTop.svg"></img>

            </div>
            </Row>
            //this.props.StoreInformationRef = this.ContentRef;
            //this.props.HeightToTake(document.getElementsByClassName('storeListingLoaded').clientHeight);
        }
        else if(this.props.RenderStoreContent)
        {
            this.props.StoreInformationRef.current.className = "storeInformationLoaded"
            headerTitle = <b className="HeaderTitle">Browsing </b>
            cross = <img src="../assets/cross.png" alt="crossCancel" onClick={() => this.CloseStoreContent()} style={(this.props.isMobile)? {width:'10%', float:'right'} : {width:'5%', float:'right'}}/>
            headerOpener = <div style={{marginTop:'17%'}}>{headerTitle}{cross}</div>

        }
        return(
                
                    <Row className="justify-content-md-center storeInformationUnloaded" ref={this.props.StoreInformationRef} style={(this.props.RenderStoreContent) ? (this.props.isMobile)  ? {minHeight:this.props.LongestHeight, marginTop:'6.0rem', width:'100%', background:'#F7F7F9', display:'inline-flex'} : {minHeight:this.props.LongestHeight, marginTop:'10.5vw', width:'100%', background:'#F7F7F9', display:'inline-flex'} : {visibility:'hidden'} }>
                         <div className="justify-content-md-center" style={(this.props.isMobile) ? {width:'100%', paddingLeft:'5%', paddingRight:'5%'} : {width:'70%', marginTop:'1%'}}>
                            {headerOpener}
                            {StoreInformationTitle}
                            {ImageGallery}
                            {CategoryHeader}
                            {ContentContainer}
                            {footCloser}
                        </div>
                    </Row>
                
        );
    }
}

export default StoreContents