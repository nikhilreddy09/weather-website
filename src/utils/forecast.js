const request = require('request')
const forecast = (latitude, longitude , callback) => {

    const url = 'https://api.darksky.net/forecast/3a6ba96d4492f051c7fac0523c4e4203/'+latitude+','+longitude+'?units=si'

    request({url , json : true} , (error, {body}) => {

            if(error) {
                callback('no connectivity detected')
            }
            else if(body.error) {
                callback('unable to find location')
            }
            else {

                callback(undefined , {

                            timezone: body.timezone,
                            currentTemperature: body.currently.temperature,
                            chanceofRain : body.currently.precipProbability,
                            dailySummary : body.daily.data[0].summary,
                            humidity : body.currently.humidity

                })
            }

    })

}


// const url = 'https://api.darksky.net/forecast/3a6ba96d4492f051c7fac0523c4e4203/37.8267,-122.4233?units=si'


// request({url : url , json: true}, (error , response) => {


// if(error) {

//     console.log("unable to connect to weather service")

// } else if(response.body.error) {

// console.log("unable to find location")

// } else {

//     console.log(response.body.timezone)
//     console.log("it is currently " +response.body.currently.temperature + " degrees out. there is " + response.body.currently.precipProbability + " percent chance of rain today" )
    
//     console.log(response.body.daily.data[0].summary)
    
//     }


// })




module.exports = forecast