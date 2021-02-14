const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast =  require('./utils/forecast')

const app = express();

//Define paths for Express config
const publidir = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine, and views location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

//Setup static directory to serve
app.use(express.static(publidir))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Rasit'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'Thanks to',
        name: 'Rasit'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message:'This is the help page for love',
        title: 'Help',
        name: 'Rasit'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place} = {})=>{
        if(error){
            res.send({
                error
            })

            return console.log(error)
        }
    
        forecast(latitude,longitude,(error, {desc,temp,feelslike} = {})=>{
            if(error){
                res.send({
                    error
                })
                return console.log(error)
            }
            console.log(place);
            console.log(desc + '. It is currently ' + temp + 
                        ' degrees out. And it feels like ' + feelslike + ' degress out')
        
            res.send({
                place,
                forecast: desc + '. It is currently ' + temp + 
                ' degrees out. And it feels like ' + feelslike + ' degress out'
            })
            
        })
        
    })
})

app.get('/products', (req,res)=>{

    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a searc term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//Eğer route'a özel not found hatası vermek istersek
app.get('/help/*', (req, res)=>{
    res.render('notfound', {
        name:'Rasit',
        title:'404',
        error: 'Help article not found'
    })
}) 

//bu get metodu en sona yazılmalı. Çünkü * tüm route'lar için cevap döner. 
//Sadece kendisinden öncekiler için birşey yapmaz. try-catch gibi en kapsamlı en sona.
app.get('*',(req, res)=>{
    res.render('notfound', {
        name: 'Rasit',
        title: '404',
        error: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is listening on port 3000.')
})