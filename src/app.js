const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000


//define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Priyanshi Gangwar'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name:'Priyanshi Gangwar'
    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        helptext : 'This is some helpful text.',
        title: 'Help',
        name:'Priyanshi Gangwar'
    })
})

// app.get('',(req,res) =>{
//     res.send('<h1>Weather</h1>')

// })


app.get('/weather',(req,res) => {
   if(!req.query.address){
       return res.send({
           error:'No address given'
       })
   }
   geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{
    if(error){
        return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData) => {
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location,
            address: req.query.address

        })
    })

   }) 


    
   
   // res.send({
    //     forecast :'Windy',
    //     location :'Philadelphia',
    //     address: req.query.address

    // })
})


app.get('/products',(req,res) =>{
    if (!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
     
    console.log(req.query.search)
    res.send({
        products: []
    })
  
})




app.get('/help/*',(req,res) =>{
    //res.send('Help article not found')
    res.render('404',{
       title:'404 ',
       name:'Priyanshi Gangwar',
        errorMessage:'Help article not found.'
    })
})

app.get('*',(req,res) =>{
    // res.send('My 404 page')
    res.render('404',{
        title:'404',
        name:'Priyanshi Gangwar',
        errorMessage:'Page not found.'
    })
})


app.listen(port, () =>{
   console.log('Server is up on port ' + port) 
})


