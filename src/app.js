const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
const app = express()


const port = process.env.PORT || 3000

// to get response when user types in url.


//setting up a path for express to get files from.
const viewsPath = path.join(__dirname , '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine
app.set('view engine' , 'hbs')

//setup views path if the folder has different name.
app.set('views' , viewsPath)


//setup hbs partials
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))


app.get('' , (req,res) => {

    res.render('index', {

        title:'weather app',
        name: 'nikhil reddy'
    })
})


app.get('/about' , (req,res) => {

    res.render('about' , {
        title:'about app',
        name: 'nikhil reddy'
    })
})


app.get('/help' , (req,res) => {

    res.render('help' , {
        title:'Help',
        message:'this is the message to be printed',
        name:'nikhil reddy'
    })
})

app.get('/weather' , (req, res) => {

        if(!req.query.address){
            return res.send({
                error:'you must provide an address to continue'
            })


        }
        // { } is defaultobject for error handling
        geocode(req.query.address , (error , {latitude,longitude,location} = { }) => {


            if(error) {
                return res.send ({
                    error
                })
            }
            
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({
                        error:'doesnt exists'
                    })
                }
                     res.send({
                        location : location,
                        forecast: forecastData
                    })

            })
        }) 


  
})


app.get('/products' , (req,res) => {


    if(!req.query.search) {

       return res.send({
            error:'u must provide search term'
        })

    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {


    res.render('error', {

        title:'Error page',
        name:'nikhil reddy',
        message:'help article not found'
    })
})

app.get('*' , (req, res) => {

    res.render('error', {
        title:'Error page',
        name:'nikhil reddy',
        message:'page not found'
    })
    
})



// app.get('/help' , (req, res) => {

//     res.send([{
//         name:'nikhil'
//     },
//     {
//         name:'priyanka'
//     }])
// })

// app.get('/about' , (req, res) => {

//     res.send('<h1>About page</h1>')
// })



app.listen(port , () => {

console.log('server is up on  port' + port)

})