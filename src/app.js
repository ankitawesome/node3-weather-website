const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// const hbs = require('hbs')
const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup for Handlebars engine and Views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directories to serve
app.use(express.static(publicDirectoryPath))

// Setting routes to handle http requests 

app.get('/', (req, res) =>{
    res.render('index',{
        title:'Weather',
        name:'Ankit'
    })
})
app.get('/about', (req, res) =>{
    res.render('about',{
        title:'About me',
        name:'Ankit'
    })
})
app.get('/help', (req, res) =>{
    res.render('help',{
        title:'Help',
        desc:'Help us here',
        name:'Ankit'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}) =>{
        if(error){
            return res.send({error: error})
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search',
            docs : 'Without search no search will be made'
        })   
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title:'404',
        name:'Ankit',
        errorMessage:'Page not found'

    })
})

app.get('*', (req, res) =>{
    res.render('404',{title:'404',name:'Ankit K', errorMessage:'Page not found'})
})


app.listen(3000, (err, res) =>{
    console.log('Server is up on port 3000')
})