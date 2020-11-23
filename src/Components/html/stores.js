import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

class Stores extends React.Component
{
    constructor()
    {
        super();
        this.ContentRef = React.createRef();
        this.LowerBarRef  = []
        this.ExpandButtonRef = []
        this.rendered = false
        
        
    }

    ShowStoreDetails(index)
    {
        console.log(index);
    }

    ShowExpDropDown(index)
    {
       if(this.props.isMobile)
       {
        if(this.LowerBarRef[index].current.className === 'justify-content-md-center expBoxHiddenMobile')
        {
            this.LowerBarRef[index].current.className = "justify-content-md-center expBoxUnhiddenMobile";
            this.ExpandButtonRef[index].current.src =  "../assets/hideExp.svg"
        }
        else
        {
            this.LowerBarRef[index].current.className = "justify-content-md-center expBoxHiddenMobile";
            this.ExpandButtonRef[index].current.src = "../assets/viewExp.svg"

        }
       }
       else
       {
        if(this.LowerBarRef[index].current.className === 'justify-content-md-center expBoxHidden')
        {
            this.LowerBarRef[index].current.className = "justify-content-md-center expBoxUnhidden";
            this.ExpandButtonRef[index].current.src = "../assets/hideExp.svg"
        }
        else
        {
            this.LowerBarRef[index].current.className = "justify-content-md-center expBoxHidden";
            this.ExpandButtonRef[index].current.src = "../assets/viewExp.svg"

        }
       }
    }

    ProcessStores(storesToRender)
    {
        var lowerBarForExp = [[]];
        /*for(var i = 0; i < storesToRender.length; i++)
        {*/
        storesToRender.forEach((element, externalIndex) => {
            
        
            this.LowerBarRef.push(React.createRef());
            this.ExpandButtonRef.push(React.createRef());
            lowerBarForExp[externalIndex] = new Array(storesToRender[externalIndex].fields.expInStore.length).fill(0).map( ( zero, index ) =>
                <Row key={Math.random()} className={(this.props.isMobile) ? "cardsMobile ": "cards" } onClick={() => this.props.ActivateExpContents(storesToRender[externalIndex].fields.expInStore[index].fields, storesToRender[index].fields)}>
                    <Col  xs={(this.props.isMobile) ? '5' : '3'}> 
                        <img src={storesToRender[externalIndex].fields.expInStore[index].fields.expThumbnailImg.fields.file.url} alt={index} className="expImgFrame" style={(this.props.isMobile) ? {height:'85px', width:'100%'} : {height:'100px', width:'100%'} } />
                    </Col>
                    <Col  xs={(this.props.isMobile) ? '5' : '7'} style={{paddingLeft:'10%'}}>
                        <div className="expNameTitle" style={{textAlign:'left'}}><span>{storesToRender[externalIndex].fields.expInStore[index].fields.experienceName}</span></div>
                    </Col>
                    <Col  xs="2">
                        <img className={(this.props.isMobile) ? "viewExpDetailsMobile" : "viewExpDetails" } alt="" src="../assets/viewDetails.svg"></img>
                    </Col>
                </Row>

            );
        });

        var arrHtml = new Array(storesToRender.length).fill(0).map( ( zero, index ) =>
        (this.props.isMobile) 
            ? 
        <React.Fragment key={Math.random()}>
            <React.Fragment key={Math.random()}>
                <Row className="justify-content-md-center" style={{width:'100%', marginLeft:'unset'}} >
                <Row className={(this.props.isMobile)? "justify-content-md-center innerStoreListingMobile" : "justify-content-md-center innerStoreListingDesktop"} >
                    <div style={{width:'100%'}}>
                    <Col style={{textAlign: 'center', paddingLeft:'unset', paddingRight:'unset'}}  key={index} onClick={() => this.props.ActivateStoreContents(index)}>
                        {(storesToRender[index].fields.storeThumbnailImg != null) ? 
                        <img alt="storeThumbnails" src={storesToRender[index].fields.storeThumbnailImg.fields.file.url} className="storeListingThumbnailMobile"/>
                        : <Row style={(this.props.isMobile)? {height:'150px'} : {height:'200px'}}></Row>}
                    </Col>
                    </div>
                    <Col xs="10" style={{height:'100px', paddingLeft:'unset'}} onClick={() => this.props.ActivateStoreContents(index)}>
                        <Row className="storeListingHeaderMobile"><b>{storesToRender[index].fields.storeName}</b></Row>
                        <Row className="storeListingSubHeaderMobile">{storesToRender[index].fields.storeLocation}</Row>
                    </Col>
                    
                    <Col xs="2" style={{position:'relative'}}>
                        <Row>
                            <img alt={index} src="../assets/nonfav.png" style={{width:'50%', marginTop:'10%', right:'15%', position:'absolute'}}/>
                            <img alt={index} src="../assets/viewExp.svg" ref={this.ExpandButtonRef[index]} onClick={() => this.ShowExpDropDown(index)} style={{width:'250%', position:'absolute', bottom:'0', right:'0', marginRight:'10%', marginBottom:'10%'}}></img>
                        </Row>
                    </Col>
                </Row>
                    <React.Fragment key={Math.random()} >
                        <div className="justify-content-md-center expBoxHiddenMobile"  ref={this.LowerBarRef[index]}>
                            <div className="justify-content-md-center" style={{width:'100%'}}>
                                <Col className="expScrollBoxMobile">
                                    {lowerBarForExp[index]}
                                </Col>
                            </div>
                        </div>
                    </React.Fragment>
                </Row>
            </React.Fragment>
        </React.Fragment>
        :
        <React.Fragment key={Math.random()}>
            <React.Fragment key={Math.random()}>
                <Row className="justify-content-md-center" style={{width:'100%', marginLeft:'unset'}} >
                <Row className={(this.props.isMobile)? "justify-content-md-center innerStoreListingMobile" : "justify-content-md-center innerStoreListingDesktop"} >
                    
                    <Col xs="4"style={{textAlign: 'center'}}  key={index} onClick={() => this.props.ActivateStoreContents(index)}>
                        {(storesToRender[index].fields.storeThumbnailImg != null) ? 
                        <img alt="storeThumbnails" src={storesToRender[index].fields.storeThumbnailImg.fields.file.url} className="storeListingThumbnailDesktop"/>
                        : <Row style={(this.props.isMobile)? {height:'150px'} : {height:'200px'}}></Row>}
                    </Col>
                    <Col xs="7" onClick={() => this.props.ActivateStoreContents(index)}>
                        <Row className="storeListingHeader"><b>{storesToRender[index].fields.storeName}</b></Row>
                        <Row className="storeListingSubHeader">{storesToRender[index].fields.storeLocation}</Row>
                    </Col>
                    
                    <Col xs="1" style={{position:'relative'}}>
                        <Row>
                            <img alt={index} src="../assets/nonfav.png" style={{width:'50%', marginTop:'10%'}}/>
                            <img alt={index} src="../assets/viewExp.svg" ref={this.ExpandButtonRef[index]} onClick={() => this.ShowExpDropDown(index)} style={{width:'250%', position:'absolute', bottom:'0', right:'0', marginRight:'10%', marginBottom:'10%'}}></img>
                        </Row>
                    </Col>
                </Row>
                    <React.Fragment key={Math.random()} >
                        <div className="justify-content-md-center expBoxHidden"  ref={this.LowerBarRef[index]}>
                            <div className="justify-content-md-center" style={{width:'100%'}}>
                                <Col className="expScrollBox">
                                    {lowerBarForExp[index]}
                                </Col>
                            </div>
                        </div>
                    </React.Fragment>
                </Row>
            </React.Fragment>
        </React.Fragment>
        );

        /*
                        <Row style={{width:'100%'}}>
                    <div><img alt="dividerLine" src="../assets/dividerLine.png" style={{width:'95%', marginLeft:'5%', height:'5px'}} />
                    </div>
                </Row>


                                        <Row style={{width:'100%'}}>
                            <Col><span style={{marginLeft:'3.5%'}}>All experiences in the store</span></Col>
                        </Row>
                    
                        <div className="expScrollBox">
                            {lowerBarForExp[index]}
                        </div>
        */
        return arrHtml;
    }
    
    CloseStores()
    {
        if(this.props.RenderExpContent && this.props.ExpInformationRef)
        {
            this.props.ExpInformationRef.current.className = "expInformationUnloaded";
        
            setTimeout(
                this.props.ResetExpInformation()
                
                
                , 100
            )
        }
        //this.props.ResetAllThumbnailRef();
        else if(this.props.RenderingStoreContents && this.props.RenderLabContents && this.props.StoreInformationRef)
        {
            this.props.StoreInformationRef.current.className = "storeInformationUnloaded";
            this.props.StoreListingRef.current.className = "storeListingUnloaded";

            this.props.SkiiLogoRef.current.className = (this.props.isMobile) ? 'skiiLogoFaded' : 'skiiLogoFadedDesktop';
            this.props.DeactivateStoreExpListing();
                this.props.ResetStoreInformation()
                this.props.ShutDownStores()

        }
        
        else if(this.props.RenderingStoreContents && this.props.StoreInformationRef)
        {
            
            this.props.StoreInformationRef.current.className = "storeInformationUnloaded";
            this.props.SkiiLogoRef.current.className = (this.props.RenderStores) ? ((this.props.isMobile) ? 'skiiLogo'  : 'skiiLogoDesktop') : ((this.props.isMobile) ? 'skiiLogoFaded' : 'skiiLogoFadedDesktop');
            this.props.DeactivateStoreExpListing();
            setTimeout(
                
                this.props.ResetStoreInformation(), 100
                
            )
            //console.log(this.props.StoreInformationRef.current);
        }
        else
        {
            this.props.StoreListingRef.current.className = "storeListingUnloaded widthMax";
            this.props.SkiiLogoRef.current.className = (this.props.isMobile) ? 'skiiLogoFaded' : 'skiiLogoFadedDesktop';
    
            setTimeout(() => {
                this.props.ShutDownStores();
                this.props.StoreListingRef.current.className ="storeListingUnloaded widthZero";
            }, 100);
        }

        
    }

    componentDidUpdate()
    {
        this.props.HeightToTake(this.props.StoreListingRef.current.clientHeight);
    }

    selectStores()
    {

    }

    selectPopUps()
    {

    }

    selectFavourites()
    {

    }

    constructCategoryTabs()
    {
        var contentArr = ['STORES', 'POP-UPS', 'FAVOURITES']
        var classArr = ['storeSelectorSelected', 'popUpUnSelected', 'favouritesUnselected']
        var functionArr = [this.selectStores, this.selectPopUps, this.selectFavourites]

        var favsTab = (this.props.isMobile) ? 
                        <div style={{marginTop:'2%'}}>
                            <div>
                                <img style={{width:'100%', paddingRight:'10%'}}  src="../assets/fav.png" alt="favlogo"/>
                            </div>
                        </div>
                    
                        : 
                        <Col xs lg="2" style={{textAlign: 'center'}}>
                            <div style={{marginTop:'1vw', fontWeight:'bold'}}>
                                <div>
                                    <img style={{width:'12.5%', marginTop:'-1.5%'}}  src="../assets/fav.png" alt="favlogo"/>
                                    <span style={{letterSpacing:'0.1rem'}}>FAVOURITES</span>
                                </div>
                            </div>
                        </Col>;
        var arrHtml = new Array(contentArr.length).fill(0).map( ( zero, index ) =>
            (index === 2) ? 
                favsTab :  <Col xs lg="2" style={{textAlign: 'center'}}><div className={(index === 0 ? (this.props.isMobile) ? 'SelectedStoreCategoryMobile' : 'SelectedStoreCategoryDesktop' : (this.props.isMobile) ? 'UnselectedStoreCategoryMobile' : 'UnselectedStoreCategoryDesktop')}  key={Math.random()} onClick={() => functionArr[index]()}>{contentArr[index]}</div></Col>
        );
        
        var retHtml = <Row className="justify-content-md-center categoryHeader">
                        {arrHtml}
                       </Row>

        return retHtml;
    }


    render() {
        let headerTitle;
        let cross;
        let categoryHeader;
        let storeListing;
        let headerOpener;
        let breadCrumbs;
        let footerCloser;
        let breadCrumbsMobile;
        if(this.props.RenderStores)
        {
            this.props.SkiiLogoRef.current.className = (this.props.isMobile) ? 'skiiLogo'  : 'skiiLogoDesktop';
            this.props.StoreListingRef.current.className = "justify-content-md-center storeListingLoaded";
            //headerTitle = <b className="HeaderTitle">Browsing {this.props.CountryToRender}</b>
            cross = <img src="../assets/cross.png" alt="crossCancel" onClick={() => this.CloseStores()} style={(this.props.isMobile)? {width:'10%', float:'right'} : {width:'3.5%', float:'right'}}/>
            /*categoryHeader = <div style={{display:'inline-block', width:'100%'}}>
                                <div className="storeSelectorSelected">Store</div>
                                <div className="popUpUnSelected">Popup</div>
                              </div>*/
            categoryHeader = this.constructCategoryTabs();
            /*
            categoryHeader = <Row className="justify-content-md-center categoryHeader">
                                 <Col xs lg="2" style={{textAlign: 'center'}}>
                                     <div style={{marginTop:'7.5%', fontWeight:'bold'}}><u>STORES</u></div>
                                 </Col>
                                 <Col xs lg="2" style={{textAlign: 'center'}}>
                                    <div style={{marginTop:'7.5%', fontWeight:'bold'}}>POP-UPS</div>
                                </Col>
                                {favsTab}
                            </Row>*/
            var symbol = "<"
             var Text = " Back To Home"
            breadCrumbs = (this.props.isMobile) ? 
                          
                            <Row className="justify-content-md-center" style={{width:'100%', marginLeft:'unset'}}> 
                            <Row className="justify-content-md-center" style={(this.props.isMobile) ?  {width:'100%', marginLeft:'unset', marginTop:'1%'} : {width:'70%', marginLeft:'unset', marginTop:'1%'}} >
                            <Col style={{width:'70%'}}>
                                <div><span>{symbol}</span><span className="mobileBackText" style={{cursor: 'pointer'}} onClick={() => this.CloseStores()}>{Text} </span></div>
                            </Col>
                          </Row>
                          </Row>
                          :
                          <Row className="justify-content-md-center" style={{width:'100%'}}> 
                          <Row className="justify-content-md-center" style={(this.props.isMobile) ?  {width:'100%', marginLeft:'unset', marginTop:'1%'} : {width:'70%', marginLeft:'unset', marginTop:'1%'}} >
                            <Col style={{width:'70%'}}>
                                <span style={{cursor: 'pointer'}} onClick={() => this.CloseStores()}><u>Home</u></span> > {this.props.CountryToRender}
                            </Col>
                          </Row>
                          </Row>
            
            
            if(this.props.GetStoreInfo[this.props.IndexToRender].length > 0)
                storeListing = this.ProcessStores(this.props.GetStoreInfo[this.props.IndexToRender]);
            else
                storeListing = <Col style={(this.props.isMobile)? {} :{width:'1024px'}}><Row className="justify-content-md-center"  style={{width:'100%'}}></Row></Col>

            headerOpener = <div style={{marginTop:'2%'}}>{headerTitle}{cross}</div>;
            footerCloser = <Row className="justify-content-md-center" style={{width:'100%', marginLeft:'unset', marginTop:'1%'}} >
                            <div style={(this.props.isMobile) ? {width:'100%', textAlign:'center' , marginTop:'5%'} : {width:'70%', textAlign:'center' , marginTop:'5%'}}>
                                <img onClick={() => window.scrollTo(0, 0)} style={(this.props.isMobile) ? {cursor: 'pointer', width:'20%', paddingBottom:'10%'} : {cursor: 'pointer', width:'15%', paddingBottom:'10%'}} src="../assets/goToTop.svg"></img>
                            </div>
                            </Row>
        }
        //this.ProcessStores();
        return (
            /*<Container style={{paddingLeft:'0px', paddingRight:'0px', maxWidth:'800px'}}>*/
            <div className="justify-content-md-center storeListingUnloaded" ref={this.props.StoreListingRef} style={{minHeight:window.innerHeight}}>
                {headerOpener}
                {categoryHeader}
                {breadCrumbs}
                {storeListing}
                {footerCloser}
            </div>
            /*</Container>*/
        );
    }
}

export default Stores;