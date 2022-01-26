const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Vis Vim'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Vis Vim'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Vis Vim'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Add address property onto JSON which returns the provided address'
        })
    }

    geocode(req.query.address,(error, data) => {
        if(error){
          return res.send({ error })
        }
        
        forecast(data.latitude, data.longitude, (error, forecastData) => {
          if(error){
            return res.send({ error })
          }
    
          return res.send({
            location: data.location,
            forecast: forecastData,
            address: req.query.address
        })
        })  
    })
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('NotFound',{
        title: '404',
        name: 'Vis Vim',
        errorMessag:'Help article not found'})
})

app.get('*',(req,res)=>{
    res.render('NotFound',{
        title: '404',
        name: 'Vis Vim',
        errorMessag:'Page not found'})
})


app.listen(port, ()=>{
    console.log('Server is up on Port ' + port + '.')
})