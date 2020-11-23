import React from 'react';
import Loader from '../Components/Loader'
import Home from './html/home'

class Contentful extends React.Component {

    constructor() {
        super();
      this.contentful = require('contentful');
      this.allStoresSorted = [];
        this.state = {
            countryContainer : [],
            allStoresContainers : [],
            loading: true
        }


    //   this.setState({
    //       ...this.state,
    //       CountryInformation:[],
    //       StoreAndExperienceInformation: []

    //   })

      this.client = this.contentful.createClient({
            space: 'jrytppl0r8sg',
            accessToken: 'bKQcHCH7wvrUgxE6H15dKTEKCQU2kmPcpwZFIhme11s'
        })

      //this.CountryInformation = null;
      //this.StoreAndExperienceInformation = null;
    }

    componentDidMount() {

      //retrieving specific content
        //var countryPromise = this.retrieveSpecificContentType('country');
        //ar storeExpPromise = this.retrieveSpecificContentType('country');
        //var japanStorePromise = this.retrievingNestedFields('store', 'Japan');
        //var chinaStorePromise = this.retrievingNestedFields('store', 'China');

        this.retrieveSpecificContentType('country').then((results) =>
          {
            this.setState(
              {
                countryContainer : results
              });
            var arrOfPromises = [];
            for(var i = 0; i < results.length; i++)
            {
              var tmpStorage = this.retrievingNestedFields('store', results[i].fields.countryName);
              arrOfPromises.push(tmpStorage);
            }
            Promise.all(arrOfPromises).then((values) =>{
              this.setState(
                {
                  allStoresContainers : values,
                  loading : false
                }
              );
            })

          }
        )
/*
        Promise.all([countryPromise, japanStorePromise, chinaStorePromise]).then((values) => {
            this.setState({
                CountryInformation : values[0],
                JapanStoreInformation : values[1],
                ChinaStoreInformation : values[2],
                loading : false
            })
          });*/
        /*
        this.retrieveSpecificContentType('country').then(results =>{
            this.setState({
                CountryInformation : results,
            })

        })


        this.StoreAndExperienceInformation = this.retrieveSpecificContentType('store').then(results =>
            {
                return results;
            }
        )*/

        
    }

    render() {
      let loadingSpin = <Loader />;

      if(this.state.loading === false)
      {
        loadingSpin = <Home CountryInformation={this.state.countryContainer} StoreInformation={this.state.allStoresContainers}/>;
        //console.log(this.state.ChinaStoreInformation);
      }
      return (
        
          <div>
            {loadingSpin}
          </div>
        )
    }

    //utility functions begin here
    retrieveSpecificContentType(str) {
        return new Promise((resolve, reject) => {
    
            this.client.getEntries(/*{
                content_type: str
              }*/
              {
                /*
                'fields.storeCountry.sys.content_type.id' : 'store',
                'fields.storeCountry.fields.countryName': 'Japan',*/
                
                content_type : str,
                order: 'sys.createdAt'
              })
              .then(function (entries) {
                resolve(entries.items)
              })
              .catch(error => reject(error))
        }).then(function(result) {
            // do something with result
            return result;
         })
       }

       retrievingNestedFields(initialFilter, valueToCheck)
       {
         
        return new Promise((resolve, reject) => {
          this.client.getEntries({
            content_type : initialFilter,
          })
          .then(function(result)
            {
              var arrToRet = [];
              result.items.forEach(function (entry) {
                if(entry.fields.storeCountry.fields.countryName === valueToCheck)
                {
                  arrToRet.push(entry)
                }
              })
              resolve(arrToRet);
            })
            .catch(error => reject(error))
          })
          .then(function (result)
          {
            return result;
          })
      }
  }

  
export default Contentful;