const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// Define paths for express configu
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Marcelo'
//     }, {
//         name: 'Sarah'
//     }])
// }) 
// app.get('/about', (req, res) => {
//     res.send('<h1> About </h1>')
// })



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Marcelo Tavares'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Marcelo Tavares'
    })
})

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'Sunny',
//         location: 'Rio de Janeiro',
//         title: 'Weather',
//         name: 'Marcelo'
//     })
// })

//refazendo o comentado acima, aula 55, mas não entendi essa parte, rever
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })




    // res.send({
    //     forecast: 'Sunny',
    //     location: 'Rio de Janeiro',
    //     title: 'Weather',
    //     name: 'Marcelo',
    //     address: req.query.address
    // })
})








app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }



    console.log(req.query)
    res.send({
        products: []
    })
})







app.get('/help', (req, res) => {
    res.render('help', { //primeiro argumento é o nome do arquivo hbs
        title: 'Help',
        name: 'Marcelo'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Marcelo',
        errorMessage: 'Help article not found'
    })
})

// esse * tem que vir no final sempre
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Marcelo',
        errorMessage: 'Page not found'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
