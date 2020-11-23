import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

class Search extends React.Component
{
    constructor()
    {
        super();

        this.ContentRef = React.createRef();

        this.state = 
        {
            renderExps :false
        }

        this.LowerBarRef  = []
        this.ExpandButtonRef = []
        this.searchStoresContainer = [];
        this.searchExpContainer = [];
        this.storeIndexStorage = [];
        this.expIndexStorage = [];
    }

    componentDidUpdate()
    {
        this.props.HeightToTake(this.ContentRef.current.clientHeight);
    }

    CloseSearchMenu()
    {

        if(this.props.RenderExpContent && this.props.ExpInformationRef)
        {
            this.props.ExpInformationRef.current.className = "expInformationUnloaded";
        
            setTimeout(
                this.props.ResetExpInformation()
                
                
                , 100
            )
        }
        else if(this.props.RenderStoreContent && this.props.StoreInformationRef)
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
        this.ContentRef.current.className = "justify-content-md-center searchListingUnloaded widthMax";
        this.props.SkiiLogoRef.current.className = (this.props.isMobile) ? 'skiiLogoFaded' : 'skiiLogoFadedDesktop';

        setTimeout(() => {
            this.props.ShutDownSearch();
            this.ContentRef.current.className = "justify-content-md-center searchListingUnloaded widthZero";
            this.LowerBarRef  = []
            this.ExpandButtonRef = []
            this.searchStoresContainer = [];
            this.searchExpContainer = [];
            this.storeIndexStorage = [];
            this.expIndexStorage = [];
            this.setState(
                {
                    renderExps : false
                }
            )
        }, 100);
        }
    }

    SelectStores = () =>
    {
        console.log('store');
        this.setState(
            {
                renderExps : false
            }
        )
    }

    SelectExperiences= () =>
    {
        console.log('exp');
        this.setState(
            {
                renderExps : true
            }
        )
    }

    CheckForStoreMatches(storeObj)
    {
        var checkArr = [];
        var finalCheck = false;
        var searchParamLower = this.props.SearchParameters.toLowerCase();
        checkArr.push(storeObj.launchDate.toLowerCase().includes(searchParamLower))
        checkArr.push(storeObj.storeAboutText.toLowerCase().includes(searchParamLower))
        checkArr.push(storeObj.storeCountry.fields.countryName.toLowerCase().includes(searchParamLower))
        checkArr.push(storeObj.storeLocation.toLowerCase().includes(searchParamLower))
        checkArr.push(storeObj.storeName.toLowerCase().includes(searchParamLower))

        checkArr.forEach(element =>
            {
                if(element === true)
                    finalCheck = true;
            })
        
        return finalCheck;
    }

    CheckForExpMatches(expObj)
    {
        var checkArr = [];
        var finalCheck = false;
        var searchParamLower = this.props.SearchParameters.toLowerCase();
        checkArr.push(expObj.assessmentOfExperience.toLowerCase().includes(searchParamLower))
        checkArr.push(expObj.expAbout.toLowerCase().includes(searchParamLower))
        checkArr.push(expObj.expKeyDesignConcept.toLowerCase().includes(searchParamLower))
        checkArr.push(expObj.expKeyTechnicalPlatform.toLowerCase().includes(searchParamLower))
        checkArr.push(expObj.expOppoExp.toLowerCase().includes(searchParamLower))
        checkArr.push(expObj.expShoppersProblem.toLowerCase().includes(searchParamLower))
        checkArr.push(expObj.expStr.toLowerCase().includes(searchParamLower))
        checkArr.push(expObj.experienceName.toLowerCase().includes(searchParamLower))

        checkArr.forEach(element =>
            {
                if(element === true)
                    finalCheck = true;
            })
        
        return finalCheck;
    }

    ShowExpDropDown(index)
    {
        if(this.props.isMobile)
        {
            console.log(this.LowerBarRef[index].current.className === 'justify-content-md-center expBoxHiddenMobile')
             if(this.LowerBarRef[index].current.className === 'justify-content-md-center expBoxHiddenMobile')
             {
                 this.LowerBarRef[index].current.className = "justify-content-md-center expBoxUnhiddenMobile";
                 this.ExpandButtonRef[index].current.src = "../assets/hideExp.svg"
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

    PopulateExpArrayListing(expObj)
    {
        
        expObj.forEach(element =>
            {
                if(this.CheckForExpMatches(element.fields))
                {
                    var checked = false;
                    this.searchExpContainer.forEach(SelectedElements =>
                        {
                            checked = (SelectedElements.experienceName.toLowerCase().includes(element.fields.experienceName.toLowerCase()))
                        }
                    )
                    if(!checked)
                        this.searchExpContainer.push(element.fields);
                }

            }

        );
    }

    
    PopulateStoreExpArrayListing()
    {
        this.searchStoresContainer = [];
        this.searchExpContainer = [];
        this.storeIndexStorage = [];
        var storageCountryIndex = 0;
        var storageStoreIndex = 0;
        this.props.AllStoreInfo.forEach(x => 
        {
            storageStoreIndex = 0;
            if(x.length > 0)
            {
                x.forEach(y =>
                    {
                        if(this.CheckForStoreMatches(y.fields))
                        {
                            this.searchStoresContainer.push(y.fields)
                            this.storeIndexStorage.push([storageCountryIndex, storageStoreIndex]);
                        }
                        if(y.fields.expInStore)
                        {
                            this.PopulateExpArrayListing(y.fields.expInStore, storageCountryIndex, storageStoreIndex++);
                        }
                    }
                )
            }
            storageCountryIndex++
        });
    }
    

    ConstructStoresListing()
    {
        var lowerBarForExp = [[]];
        /*for(var i = 0; i < storesToRender.length; i++)
        {*/
        this.searchStoresContainer.forEach((element, externalIndex) => {
            this.LowerBarRef.push(React.createRef());
            this.ExpandButtonRef.push(React.createRef());
            lowerBarForExp[externalIndex] = new Array(this.searchStoresContainer[externalIndex].expInStore.length).fill(0).map( ( zero, index ) =>
                <Row key={Math.random()} className={(this.props.isMobile) ? "cardsMobile ": "cards" } onClick={() => this.props.ActivateExpContents(this.searchStoresContainer[externalIndex].expInStore[index].fields, this.searchStoresContainer[externalIndex])}>
                    <Col  xs={(this.props.isMobile) ? '5' : '3'}> 
                        <img src={this.searchStoresContainer[externalIndex].expInStore[index].fields.expThumbnailImg.fields.file.url} alt={index} className="expImgFrame" style={(this.props.isMobile) ? {height:'60px', width:'100%'} : {height:'100px', width:'100%'} } />
                    </Col>
                    <Col  xs={(this.props.isMobile) ? '5' : '7'} style={{paddingLeft:'10%'}}>
                        <div className="expNameTitle" style={{textAlign:'left'}}><span>{this.searchStoresContainer[externalIndex].expInStore[index].fields.experienceName}</span></div>
                    </Col>
                    <Col  xs="2">
                        <img className={(this.props.isMobile) ? "viewExpDetailsMobile" : "viewExpDetails" } alt="" src="../assets/viewDetails.svg"></img>
                    </Col>
                </Row>

            );
        });



        var arrHtml = new Array(this.searchStoresContainer.length).fill(0).map( ( zero, index ) =>
        (this.props.isMobile) 
        ? 
    <React.Fragment key={Math.random()}>
        <React.Fragment key={Math.random()}>
            <Row className="justify-content-md-center" style={{width:'100%', marginLeft:'unset'}} >
            <Row className={(this.props.isMobile)? "justify-content-md-center innerStoreListingMobile" : "justify-content-md-center innerStoreListingDesktop"} >
                <div style={{width:'100%'}}>
                <Col style={{textAlign: 'center', paddingLeft:'unset', paddingRight:'unset'}}  key={index} onClick={() => this.props.ActivateStoreContents(this.storeIndexStorage[index][0], this.storeIndexStorage[index][1])}>
                    {(this.searchStoresContainer[index].storeThumbnailImg != null) ? 
                    <img alt="storeThumbnails" src={this.searchStoresContainer[index].storeThumbnailImg.fields.file.url} className="storeListingThumbnailMobile"/>
                    : <Row style={(this.props.isMobile)? {height:'150px'} : {height:'200px'}}></Row>}
                </Col>
                </div>
                <Col xs="10" style={{height:'100px', paddingLeft:'unset'}} onClick={() => this.props.ActivateStoreContents(this.storeIndexStorage[index][0], this.storeIndexStorage[index][1])}>
                    <Row className="storeListingHeaderMobile"><b>{this.searchStoresContainer[index].storeName}</b></Row>
                    <Row className="storeListingSubHeaderMobile">{this.searchStoresContainer[index].storeLocation}</Row>
                </Col>
                
                <Col xs="2" style={{position:'relative'}}>
                    <Row>
                        <img alt={index} src="../assets/nonfav.png" style={{width:'50%', marginTop:'10%', right:'15%', position:'absolute'}}/>
                        <img alt={index} src="../assets/viewExp.svg" ref={this.ExpandButtonRef[index]} onClick={() => this.ShowExpDropDown(index)} style={{width:'250%', position:'absolute', bottom:'0', right:'0', marginRight:'10%', marginBottom:'10%'}}></img>                        </Row>
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
                    
                    <Col xs="4"style={{textAlign: 'center'}}  key={index} onClick={() => this.props.ActivateStoreContents(this.storeIndexStorage[index][0], this.storeIndexStorage[index][1])}>
                        {(this.searchStoresContainer[index].storeThumbnailImg != null) ? 
                        <img alt="storeThumbnails" src={this.searchStoresContainer[index].storeThumbnailImg.fields.file.url} className={(this.props.isMobile) ?  'storeListingMobileDesktop' : 'storeListingThumbnailDesktop' }/>
                        : <Row style={(this.props.isMobile)? {height:'150px'} : {height:'200px'}}></Row>}
                    </Col>
                    <Col xs="7" onClick={() =>this.props.ActivateStoreContents(this.storeIndexStorage[index][0], this.storeIndexStorage[index][1])}>
                        <Row className="storeListingHeader"><b>{this.searchStoresContainer[index].storeName}</b></Row>
                        <Row className="storeListingSubHeader">{this.searchStoresContainer[index].storeLocation}</Row>
                    </Col>
                    
                    <Col xs="1" style={{position:'relative'}}>
                        <Row>
                            <img alt={index} src="../assets/nonfav.png" style={{width:'50%'}}/>
                            <img alt={index} src="../assets/Group 1@3x.png" ref={this.ExpandButtonRef[index]} onClick={() => this.ShowExpDropDown(index)} style={{width:'250%', position:'absolute', bottom:'0', right:'0', marginRight:'10%', marginBottom:'10%'}}></img>
                        </Row>
                    </Col>
                </Row>
                <React.Fragment key={Math.random()} >
                        <div className="justify-content-md-center expBoxHiddenMobile"  ref={this.LowerBarRef[index]}>
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

        return arrHtml;
    }

    ConstructExpListing()
    {
        

        var arrHtml = new Array(this.searchExpContainer.length).fill(0).map( ( zero, index ) =>
        (this.props.isMobile) 
        ?
        <React.Fragment key={Math.random()}>
            <React.Fragment key={Math.random()}>
                <Row className="justify-content-md-center" style={{width:'100%', marginLeft:'unset'}} >
                    <Row className={(this.props.isMobile)? "justify-content-md-center innerStoreListingMobile" : "justify-content-md-center innerStoreListingDesktop"} >
                        <div style={{width:'100%'}}>
                        <Col style={{textAlign: 'center', paddingLeft:'unset', paddingRight:'unset'}}  key={index} onClick={() => this.props.ActivateExpContents(this.searchExpContainer[index])}>
                            {(this.searchExpContainer[index].expThumbnailImg!= null) ? 
                            <img alt="storeThumbnails" src={this.searchExpContainer[index].expThumbnailImg.fields.file.url} className="storeListingThumbnailMobile"/>
                            : <Row style={(this.props.isMobile)? {height:'150px'} : {height:'200px'}}></Row>}
                        </Col>
                        </div>
                        <Col xs="10" style={{height:'100px', paddingLeft:'unset'}} onClick={() => this.props.ActivateExpContents(this.searchExpContainer[index])}>
                            <Row className="storeListingHeaderMobile"><b>{this.searchExpContainer[index].experienceName}</b></Row>
                        </Col>
                        
                        <Col xs="2" style={{position:'relative'}}>
                            <Row>
                                <img alt={index} src="../assets/Group 37@3x.png" onClick={() => this.props.ActivateExpContents(this.searchExpContainer[index])} style={{width:'200%', position:'absolute', bottom:'0', right:'0', marginRight:'10%', marginBottom:'10%'}}></img>                        
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </React.Fragment>
        </React.Fragment>
        :
        <React.Fragment key={Math.random()}>
            <React.Fragment key={Math.random()}>
                <Row className="justify-content-md-center" style={{width:'100%', marginLeft:'unset'}} >
                    <Row className={(this.props.isMobile)? "justify-content-md-center innerStoreListingMobile" : "justify-content-md-center innerStoreListingDesktop"} >
                        
                        <Col xs="4"style={{textAlign: 'center'}}  key={index} onClick={() => this.props.ActivateExpContents(this.searchExpContainer[index])}>
                            {(this.searchExpContainer[index].expThumbnailImg!= null) ? 
                            <img alt="storeThumbnails" src={this.searchExpContainer[index].expThumbnailImg.fields.file.url} className={(this.props.isMobile) ?  'storeListingMobileDesktop' : 'storeListingThumbnailDesktop' }/>
                            : <Row style={(this.props.isMobile)? {height:'150px'} : {height:'200px'}}></Row>}
                        </Col>
                        <Col xs="7" onClick={() =>this.props.ActivateExpContents(this.searchExpContainer[index])}>
                            <Row className="storeListingHeader"><b>{this.searchExpContainer[index].experienceName}</b></Row>
                        </Col>
                        <Col xs="1" style={{position:'relative'}}>
                            <Row>
                                <img alt={index} src="../assets/Group 37@3x.png" onClick={() => this.props.ActivateExpContents(this.searchExpContainer[index])} style={{width:'250%', position:'absolute', bottom:'0', right:'0', marginRight:'10%', marginBottom:'10%'}}></img>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </React.Fragment>
        </React.Fragment>
/*
        <React.Fragment key={Math.random()}>
            <React.Fragment key={Math.random()}>
                <Row style={{width:'100%', marginTop: '3%'}}>
                    
                    <Col xs="6" style={{textAlign: 'center'}}  key={index} onClick={() => this.props.ActivateExpContents(this.searchExpContainer[index])}>
                        {(this.searchExpContainer[index].expThumbnailImg!= null) ? 
                        <img alt="storeThumbnails" src={this.searchExpContainer[index].expThumbnailImg.fields.file.url} style={(this.props.isMobile) ?  {width:'100%',height:'150px', marginLeft:'7.5%'} :  {width:'75%',height:'100%', marginLeft:'7.5%'}}/>
                        : <Row></Row>}
                    </Col>
                    <Col xs="5" onClick={() => this.props.ActivateExpContents(this.props.IndexToRender, index)}>
                        <Row className="storeListingHeader"><b>{this.searchExpContainer[index].experienceName}</b></Row>
                    </Col>
                </Row>
                <Row style={{width:'100%'}}>
                    <div><img alt="dividerLine" src="../assets/dividerLine.png" style={{width:'95%', marginLeft:'5%', height:'5px'}} />
                    </div>
                </Row>
            </React.Fragment>

        </React.Fragment>
        */
        );

        return arrHtml;
    }


    constructCategoryTabs()
    {
        var contentArr = ['STORES', 'EXPERIENCES']
        //var classArr = (this.state.renderExps) ?  : (this.state.renderExps) ? ['unSelectedTopCateogry', 'SelectedTopCategory'] : ['SelectedTopCategory', 'unSelectedTopCateogry']
        var classArr = (this.state.renderExps ? 
                            (this.props.isMobile) 
                                ? 
                                ['UnselectedStoreCategoryMobile', 'SelectedStoreCategoryMobile'] 
                                : 
                                ['UnselectedStoreCategoryDesktop' , 'SelectedStoreCategoryDesktop']
                            :   
                            (this.props.isMobile) 
                                ? 
                                ['SelectedStoreCategoryMobile', 'UnselectedStoreCategoryMobile'] 
                                : 
                                ['SelectedStoreCategoryDesktop' , 'UnselectedStoreCategoryDesktop'])
        var functionArr = [this.SelectStores, this.SelectExperiences]

        var arrHtml = new Array(contentArr.length).fill(0).map( ( zero, index ) =>
            <Col xs lg="2" style={{textAlign: 'center'}}><div  className={classArr[index]} key={Math.random()} onClick={() => functionArr[index]()}>{contentArr[index]}</div></Col>
        );
        
        var retHtml = <Row className="justify-content-md-center categoryHeader" style={{marginTop:'unset'}}>
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
        this.searchStoresContainer = [];
        this.searchExpContainer = [];
        this.storeIndexStorage = [];
        let breadCrumbs;
        let footCloser;
        if(this.props.RenderSearchContents)
        {
            var Text = "< Back To Home"
            breadCrumbs = (this.props.isMobile) ? 
                          
                            <Row className="justify-content-md-center" style={{width:'100%', marginLeft:'unset'}}> 
                            <Row className="justify-content-md-center" style={(this.props.isMobile) ?  {width:'100%', marginLeft:'unset', marginTop:'1%'} : {width:'70%', marginLeft:'unset', marginTop:'1%'}} >
                            <Col style={{width:'70%'}}>
                                <span className="mobileBackText" style={{cursor: 'pointer'}} onClick={() => this.CloseSearchMenu()}>{Text} </span>
                            </Col>
                          </Row>
                          </Row>
                          :
                          <Row className="justify-content-md-center" style={{width:'100%'}}> 
                          <Row className="justify-content-md-center" style={(this.props.isMobile) ?  {width:'100%', marginLeft:'unset', marginTop:'1%'} : {width:'70%', marginLeft:'unset', marginTop:'1%'}} >
                            <Col style={{width:'70%'}}>
                                <span style={{cursor: 'pointer'}} onClick={() => this.CloseSearchMenu()}><u>Home</u></span> > Search Results
                            </Col>
                          </Row>
                          </Row>
            this.PopulateStoreExpArrayListing();
            this.props.SkiiLogoRef.current.className = (this.props.isMobile) ? 'skiiLogo'  : 'skiiLogoDesktop';
            this.ContentRef.current.className = "justify-content-md-center searchListingLoaded";
            //headerTitle = <b className="HeaderTitle">Searching for : {this.props.SearchParameters}</b>
            cross = <img src="../assets/cross.png" alt="crossCancel" onClick={() => this.CloseSearchMenu()} style={{top:'unset'}} style={(this.props.isMobile)? {width:'10%', float:'right'} : {width:'3.5%', float:'right'}}/>
            categoryHeader = <div style={{display:'inline-block', width:'100%'}}>{this.constructCategoryTabs()}</div>
            storeListing = (this.state.renderExps) ?  this.ConstructExpListing() : this.ConstructStoresListing();
            /*if(this.props.GetStoreInfo[this.props.IndexToRender].length > 0)
                storeListing = this.ProcessStores(this.props.GetStoreInfo[this.props.IndexToRender]);
            else
                storeListing = <Col style={(this.props.isMobile)? {} :{width:'1024px'}}><Row style={{width:'100%'}}></Row></Col>
*/
            if(storeListing.length <= 0)
                storeListing = <Col style={(this.props.isMobile)? {} :{width:'1024px'}}><Row style={{width:'100%'}}></Row></Col>

            headerOpener = <div style={{marginTop:'2%'}}>{cross}</div>;
            footCloser = <Row className="justify-content-md-center" style={{width:'100%', marginLeft:'unset', marginTop:'1%'}} >
            <div style={(this.props.isMobile) ? {width:'100%', textAlign:'center' , marginTop:'5%'} : {width:'70%', textAlign:'center' , marginTop:'5%'}}>
                <img onClick={() => window.scrollTo(0, 0)} style={{cursor: 'pointer', width:'15%'}} src="../assets/goToTop.svg"></img>

            </div>
            </Row>
        }
        else
        {
            headerTitle = '';
            cross = '';
            categoryHeader = '';
            storeListing = '';
            headerOpener = '';
        }
        return(
            /*<<Container style={{paddingLeft:'0px', paddingRight:'0px', maxWidth:'800px'}}>*/
            <div className="justify-content-md-center searchListingUnloaded" ref={this.ContentRef} style={{minHeight:window.innerHeight, background:'#F7F7F9'}}>
                {headerOpener}
                {categoryHeader}
                {breadCrumbs}
                {storeListing}
                {footCloser}
            </div>
            /*</Container>*/
        )
    }
}

export default Search