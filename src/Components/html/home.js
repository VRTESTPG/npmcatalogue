import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import '../css/home.css'
import '../css/ipad.css'
import Stores from './stores.js'
import StoreContents from './storeContents.js'
import ExpContents from './expContent.js'
import Search from './search.js'

class Home extends React.Component {

    constructor()
    {
        super();
        this.state = 
        {
            renderStores : false,
            countryToRender : '',
            indexToRender : null,

            renderStoreContents : false,
            storeContentToRender : null,

            renderExpContents : false,
            expContentToRender : null,

            renderLabContents: false,

            longestHeight : 0,

            searchQuery : 'Search....',

            searchRender : false,
            
            crossListingInformation : React.createRef(),
            crossStoreInformation : React.createRef(),
            crossExpInformation : React.createRef(),
            arrayOfThumbnailRef : [],
            arrayOfExpThumbnailRef : [],

            storeListingExpRender : false
        }
        this.arrayIndex = [];
        this.logoRef = React.createRef();
        this.listingRef = React.createRef();
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    ShowStoreExpListing = () =>
    {
        this.setState(
            {
                storeListingExpRender : true
            }
        )
    }

    HideStoreExpListing = () =>
    {
        this.setState(
            {
                storeListingExpRender : false
            }
        )
    }


    ShowExpListing = () =>
    {
        this.setState(
            {
                expListingRender : true
            }
        )
    }

    HideExpListing = () =>
    {
        this.setState(
            {
                expListingRender : false
            }
        )
    }

    ProcessCountries()
    {
        
        var arrHtml = new Array(this.props.CountryInformation.length).fill(0).map( ( zero, index ) =>
        (index, this.props.CountryInformation[index].fields.countryName === 'Lab')
        ?
        <Col xs lg="2" style={{textAlign: 'center'}} onClick={() => this.ShowLabStores(index, this.props.CountryInformation[index].fields.countryName)} key={index}>
            <img alt="countryThumbnails" src={this.props.CountryInformation[index].fields.countryImg.fields.file.url} style={{width:'100%'}}/>
            <span className="countryTitle">{this.props.CountryInformation[index].fields.countryName}</span>
        </Col>
        
        :
        
        <Col xs lg="2" style={{textAlign: 'center'}} onClick={() => this.ShowStores(index, this.props.CountryInformation[index].fields.countryName)} key={index}>
            <img alt="countryThumbnails" src={this.props.CountryInformation[index].fields.countryImg.fields.file.url} style={{width:'100%'}}/>
            <span className="countryTitle">{this.props.CountryInformation[index].fields.countryName}</span>
        </Col>
        
     )
     
     while(this.isMobile && arrHtml.length % 2 != 0)
     {
        arrHtml.push(<Col xs lg="2"></Col>)
     }
        /*
        this.props.CountryInformation.forEach(element => {
            var myImgFile = element.fields.countryImg.fields.file.url;
            console.log("vijay", index);
            arrHtml.push(<Col style={{textAlign: 'center'}} onClick={event => this.ShowStores(index)} key={index}><img alt="countryThumbnails" src={myImgFile} style={{width:'100%'}}/><span>{element.fields.countryName}</span></Col>);
            //index++;
        });*/
        var CompiledHTML = [];
        if(this.isMobile)
        {

            for(var i = 0; i < arrHtml.length; i++)
            {
                    CompiledHTML.push(<Row className="mobileRowStyle">{arrHtml[i++]}{arrHtml[i++]}{arrHtml[i]}</Row>)
            }
        }

        console.log(CompiledHTML)

    /*
        for(var i = 0; i < this.props.CountryInformation.length; i++)
        {
            var myImgFile = this.props.CountryInformation[i].fields.countryImg.fields.file.url;
            
            arrHtml.push(<Col style={{textAlign: 'center'}} onClick={() => this.ShowStores.bind(this,i)} key={i}><img alt="countryThumbnails" src={myImgFile} style={{width:'100%'}}/><span>{this.props.CountryInformation[i].fields.countryName}</span></Col>);
        }*/
        
        return (this.isMobile) ? CompiledHTML : arrHtml;
    }

    ShowLabStores(index, countryStoresToRender)
    {
        if(this.props.StoreInformation[index][0])
        {
            this.setState(
                {
                    countryToRender : countryStoresToRender,
                    indexToRender : 0,
                    renderStores:true,
                    renderLabContents : true,
                    renderStoreContents:true,
                    storeContentToRender: this.props.StoreInformation[index][0].fields
                }
            )
        }
        else
        {
            this.setState(
                {
                    countryToRender : countryStoresToRender,
                    indexToRender : index,
                    
                    renderStoreContents:true
                }
            )
        }

    }

    ResetthumbnailArray = () =>
    {
        this.setState(
            {
                arrayOfThumbnailRef : []
            }
        )
        //this.resetBoolVar();
    }

    ResetthumbnailexpArray = () =>
    {
        this.setState(
            {
                arrayOfExpThumbnailRef : []
            }
        )
        //this.resetBoolVar();
    }

    ShowStores(index, countryStoresToRender)
    {
        this.setState(
            {
                renderStores:true,
                countryToRender : countryStoresToRender,
                indexToRender : index
            }
        )
    }

    ShowSearch()
    {
        this.setState(
            {
                searchRender : true
            }
        )
    }

    
    shutStores = () => 
    {
        this.setState(
            {
                renderStores:false,
                countryToRender : null,
                indexToRender : null,
                renderLabContents: false
            }
        )
    }

    shutSearch = () => 
    {
        this.setState(
            {
                searchRender : false
            }
        )
    }

    ShowExperience = (expObj, storeObj, countryObj) =>
    {
        this.setState(
            {
                renderExpContents : true,
                expContentToRender : expObj,
                storeContentToRender : storeObj
            }
        )
    }

    SetStoreContentsToRender = (index) =>
    {
        this.setState(
            {
                renderStoreContents:true,
                storeContentToRender: this.props.StoreInformation[this.state.indexToRender][index].fields
            }
        )
    }

    SetSearchStoreContentsToRender = (countryIndex, storeIndex) =>
    {
        this.setState(
            {
                renderStoreContents:true,
                indexToRender:countryIndex,
                storeContentToRender: this.props.StoreInformation[countryIndex][storeIndex].fields
            }
        )
    }

    ShutStoreInformation = () =>
    {
        this.setState(
            {
                renderStoreContents:false,
                storeContentToRender : null
            }
        )
    }

    ShutExpInformation = () =>
    {
        this.setState(
            {
                renderExpContents:false,
                expContentToRender : null
            }
        )
    }

    UpdateHeight = (height) =>
    {
        if(height > this.state.longestHeight)
        {
            this.setState(
                {
                    longestHeight : height + 100
                }
            )
        }

    }

    handleQuery = (event) =>
    {
        //alert(textQuery);
        this.setState(
            {
                searchQuery : event.target.value
            }
        )
    }

    handleSubmit = (event) =>
    {
        this.setState(
            {
                searchRender : true
            }
        )

        event.preventDefault();
    }

    shutDownExpOnly = () =>
    {
        this.setState(
            {
                renderExpContents:false,
                expContentToRender : null
            }
        )
    }

    bringUpStoreShutDownExp = () =>
    {
        
        this.setState(
            {
                renderStoreContents:true,
                renderExpContents:false,
                expContentToRender : null
            }
        )
    }

    shutStoreAndShutExp = () =>
    {       
            this.setState(
                {
                    renderStoreContents:false,
                    renderExpContents:false,
                    expContentToRender : null,
                    storeContentToRender : null
                }
            )
    }

    shutListingAndInformation()
    {
        this.SkiiLogoRef.current.className = (this.isMobile) ? 'skiiLogoFaded' : 'skiiLogoFadedDesktop';
        this.ResetStoreInformation()

        this.StoreListingRef.current.className = "storeListingUnloaded widthMax";
        this.ShutDownStores();
        this.StoreInformationRef.current.className = "justify-content-md-center storeInformationUnloaded";
        this.DeactivateStoreExpListing();
        

    }

    render() {
        let countries = this.ProcessCountries();
        let divToRender = "";
        if (this.isMobile) {
            /* your code here */
            divToRender =   <div style={{paddingLeft:'0', paddingRight:'0', minHeight: '700px'}}>
                                <Row className="logoRowDesktop">
                                    <Col style={{zIndex:'99'}}><img ref={this.logoRef} src="../assets/skii.png" alt="skiilogo" className="skiiLogoFaded" ></img></Col>
                                    <Col style={{zIndex:'1'}}><img  src="../assets/fav.png" alt="favlogo" className="favLogo"/></Col>
                                </Row>
                                <Row style={{height:'400px'}}>
                                    <Col sm="6" md={{ size: 2 }} style={{height:'100%', position:'relative'}}><img alt="imgbg" src="../assets/landingbg.png" style={{width:'100%', objectFit:'cover', height:'100%'}} /></Col>
                                    <Col sm="6" md={{ size: 2 }} style={{height:'100%', position:'absolute'}}>
                                    <div  className="col container d-flex justify-content-center align-items-end" style={{position:'absolute', height:'325px'}}>
                                        <form onSubmit={this.handleSubmit}>
                                            <input className="searchBar" value={this.state.searchQuery} onChange={this.handleQuery}></input>
                                        </form>
                                    </div>
                                    </Col>


                                </Row>
                                
                                    {countries}
                                
                            </div>
        }
        else
        {
            divToRender =   /*<Container style={{paddingLeft:'0', paddingRight:'0',  maxWidth:'800px'}}>*/
                            <div>
                            <Row className="logoRowDesktop">
                                <Col  style={{zIndex:'99'}}><img ref={this.logoRef} src="../assets/skii.png" alt="skiilogo" className="skiiLogoFadedDesktop" ></img></Col>
                                <Col style={{zIndex:'1'}}><img  src="../assets/fav.png" alt="favlogo" className="favLogoDesktop"/></Col>
                            </Row>
                            <div>
                                <Row style={{height:'400px'}}>
                                    <Col sm="6" md={{ size: 2 }} style={{height:'100%', position:'relative'}}>
                                        <img alt="bgimg" src="../assets/Background@2x.png" style={{width:'100%', objectFit:'cover', height:'100%'}} />
                                    </Col>
                                    <Col sm="6" md={{ size: 2 }} style={{height:'100%', position:'absolute'}}>
                                    <div  className="col container d-flex justify-content-center align-items-end" style={{position:'absolute', height:'350px'}}>
                                        <form onSubmit={this.handleSubmit}>
                                            <input className="searchBar" value={this.state.searchQuery} onChange={this.handleQuery}></input>
                                        </form>
                                    </div>
                                    </Col>
                                </Row>
                                <Row className="justify-content-md-center" style={{height:'150px', marginTop : '5%'}}>
                                    <Row className="justify-content-md-center" style={{width:'60%'}}>
                                    {countries}
                                    </Row>
                                </Row>
                            </div>
                            </div>
                            /*</Container>*/

        }
        return (
            <div className="homeStyle">
                {divToRender}
                <Stores GetStoreInfo={this.props.StoreInformation} 
                        RenderStores={this.state.renderStores} 
                        IndexToRender={this.state.indexToRender}
                        CountryToRender={this.state.countryToRender}
                        SkiiLogoRef={this.logoRef}
                        ActivateStoreContents={this.SetStoreContentsToRender}
                        ActivateExpContents={this.ShowExperience}
                        ShutDownStores={this.shutStores}
                        isMobile={this.isMobile}
                        HeightToTake={this.UpdateHeight}
                        WhatToClose={this.checkWhatToClose}
                        RenderingStoreContents={this.state.renderStoreContents}
                        RenderStores={this.state.renderStores}
                        ResetStoreInformation={this.ShutStoreInformation}
                        StoreInformationRef={this.state.crossStoreInformation}
                        ArrayOfThumbnailRef={this.state.arrayOfThumbnailRef}
                        DeactivateStoreExpListing={this.HideStoreExpListing}
                        RenderExpContent={this.state.renderExpContents}
                        ExpInformationRef={this.state.crossExpInformation}
                        ResetExpInformation={this.ShutExpInformation}
                        RenderLabContents={this.state.renderLabContents}
                        StoreListingRef={this.state.crossListingInformation}></Stores>
                <StoreContents 
                RenderStoreContent={this.state.renderStoreContents}
                StoreInformationToRender={this.state.storeContentToRender}
                ResetStoreInformation={this.ShutStoreInformation}
                ActivateExpContents={this.ShowExperience}
                IndexToRender={this.state.indexToRender}
                isMobile={this.isMobile}
                UpdateMyHeight={this.UpdateHeight}
                LongestHeight={this.state.longestHeight}
                listingRef={this.listingRef}
                SkiiLogoRef={this.logoRef}
                RenderStores={this.state.renderStores} 
                CountryToRender={this.state.countryToRender}
                StoreInformationRef={this.state.crossStoreInformation}
                ArrayOfThumbnailRef={this.state.arrayOfThumbnailRef}
                StoreExpRender={this.state.storeListingExpRender}
                ActivateStoreExpListing={this.ShowStoreExpListing}
                DeactivateStoreExpListing={this.HideStoreExpListing}
                StoreListingRef={this.state.crossListingInformation}
                ShutDownStores={this.shutStores}
                ShutListingAndInformation={this.shutListingAndInformation}
                />
                <ExpContents
                RenderExpContent={this.state.renderExpContents}
                ExpContentInformation={this.state.expContentToRender}
                CountryToRender={this.state.countryToRender}
                StoreInformationToRender={this.state.storeContentToRender}
                ResetExpInformation={this.ShutExpInformation}
                isMobile={this.isMobile}
                UpdateMyHeight={this.UpdateHeight}
                LongestHeight={this.state.longestHeight}
                ExpInformationRef={this.state.crossExpInformation}
                ArrayOfExpThumbnailRef={this.state.arrayOfExpThumbnailRef}
                BringUpStoreShutDownExp={this.bringUpStoreShutDownExp}
                DeactivateStoreExpListing={this.HideStoreExpListing}
                ResetStoreInformation={this.ShutStoreInformation}
                StoreInformationRef={this.state.crossStoreInformation}
                ShutDownBothStoreAndExp={this.shutStoreAndShutExp}
                RenderSearchContents={this.state.searchRender}
                ShutDownExpOnly={this.shutDownExpOnly}
                SkiiLogoRef={this.logoRef}
                StoreListingRef={this.state.crossListingInformation}
                ShutDownStores={this.shutStores}
                ShutListingAndInformation={this.shutListingAndInformation}

                />
                <Search
                RenderSearchContents={this.state.searchRender}
                SearchParameters={this.state.searchQuery}
                AllStoreInfo={this.props.StoreInformation}
                SkiiLogoRef={this.logoRef}
                HeightToTake={this.UpdateHeight}
                UpdateMyHeight={this.UpdateHeight}
                isMobile={this.isMobile}
                ActivateStoreContents={this.SetSearchStoreContentsToRender}
                ActivateExpContents={this.ShowExperience}
                ShutDownSearch={this.shutSearch}
                StoreInformationRef={this.state.crossStoreInformation}
                ArrayOfThumbnailRef={this.state.arrayOfThumbnailRef}
                RenderStoreContent={this.state.renderStoreContents}
                DeactivateStoreExpListing={this.HideStoreExpListing}
                RenderExpContent={this.state.renderExpContents}
                ExpInformationRef={this.state.crossExpInformation}
                ResetExpInformation={this.ShutExpInformation}
                RenderLabContents={this.state.renderLabContents}
                ResetStoreInformation={this.ShutStoreInformation}
                StoreInformationToRender={this.state.storeContentToRender}
                RenderSearchContents={this.state.searchRender}

                />
            </div>
            
        )
    }

}

export default Home;