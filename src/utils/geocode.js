const request = require('request')



const geoCode = (address, callback) => {

    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlraGlscmVkZHkwOSIsImEiOiJjazRicmVuOXAwZ2hkM2ZtdjUza3lraDk1In0.Rv2tUA7wJy66VxZ-xSz3-A&limit=1'

    request({url:geoCodeUrl , json:true} , (error , {body}) => {

        if(error) {

            callback('unable to connect to location services')
        }
        else if(body.features.length === 0) {

            callback('unable to find location.')
        }
        else {

            callback(undefined , {
                                  latitude: body.features[0].center[1],
                                  longitude: body.features[0].center[0],
                                  location: body.features[0].place_name

            })

        }
       

    })

}



// const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibmlraGlscmVkZHkwOSIsImEiOiJjazRicmVuOXAwZ2hkM2ZtdjUza3lraDk1In0.Rv2tUA7wJy66VxZ-xSz3-A&limit=1'


// request({url:url2 , json:true} , (error , response) => {

//     if(error) {

//         console.log("unable to connect to network")

//     }
//     else if(response.body.features.length === 0) {

//         console.log("unable to find location")
//     }


// else {
//     const latitude = response.body.features[0].center[1]

//     const longitude = response.body.features[0].center[0]
    
//     console.log("laltitude is " + latitude + " longitude is " + longitude)

// }


// })

module.exports = geoCode