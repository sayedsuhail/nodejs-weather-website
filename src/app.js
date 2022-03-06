const path = require('path')
const express = require('express')
const hbs = require('hbs')

// modules 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
// use for dynamic web pages, default path 'views'
app.set('view engine', 'hbs')
// change the views path from 'views' to our custom 'templates' directory
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// first arg is for dir, in this case its root dir, when app start it show this dir
app.get('', (req, res) => {
    // render one of our views, provide view name, no need file extension
    // first arg is name of view to render, 2nd arg is obj that you want your view to be able to access
    res.render('index', {
        title: 'Weather App',
        name: 'Sayed Suhail'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sayed Suhail'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: 'Sayed Suhail',
        helpText: "This is some helpful text!"
    })
})

// // root dir
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// // help dir/page
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Sayed'
//     }, {
//         name: 'Suhail'
//     }])
// })

// // about page
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// Weather page
app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        //log('Error', error)
        //log('Data', data)
        if(error)
        {
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
            {
                return res.send({ error })
            }
            //console.log(location)
            //console.log(forecastData)
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     location: req.query.address,
    //     forecast: 'Its Cloud!'
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// article not found in specific page
app.get('/help/*', (req, res) => {
    //res.send('Help article not found!')
    res.render('404', {
        title: '404',
        name: 'Sayed Suhail',
        errorMessage: 'Help Article not found!'
    })
})

// express check one by one page so we need to put this in last for all pages 
// 404 / page not found 
app.get('*', (req, res) => {
    //res.send('404 Page!')
    res.render('404', {
        title: '404',
        name: 'Sayed Suhail',
        errorMessage: 'Page not found!'
    })
})

// app.com
// app.com/help
// app.com/about

// start server at port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})