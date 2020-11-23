
/*
  export function getCountryCount()
  {
    
    client.getEntries({
        content_type: 'country'
      })
      .then(function (entries) {
        // log the file url of any linked assets on field `image`
        return entries.items.length;
      })
  }

  function retrieveCountry() {
    return new Promise((resolve, reject) => {

        client.getEntries({
            content_type: 'country'
          })
          .then(function (entries) {
            // log the file url of any linked assets on field `image`
            //return entries.items.length;
            resolve(entries.items.length)
            
          })
          .catch(error => reject(error))
        /*axios
        .get(`${apiURL}/boardInfo`,
        {
            headers: {
                'Ocp-Apim-Subscription-Key': `${OCP_APIM_SUBSCRIPTION_KEY}`,
                Authorization: jwt,
            }
        })
        .then(json => {
            if (json.data.success) {
                resolve(json.data)
            } else {
                resolve(false)
            }
        })
        .catch(error => reject(error))
    }).then(function(result) {
        // do something with result
        return result;
     })
   }

  //export {contentful, client, getCountryCount};
/*
  client.getEntries({
    content_type: 'country'
  })
  .then(function (entries) {
    // log the file url of any linked assets on field `image`
    console.log(entries.items.length);
    entries.items.forEach(function (entry) {
        
        if(entry.fields.countryStores)
        {
          console.log(entry.fields.countryStores[0].fields.expInStore[0].fields);
        }
          
  
          console.log(entry);
      
  
      })
    })
  .catch(console.error) */