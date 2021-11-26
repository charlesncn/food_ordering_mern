const express = require("express")
const mongoose = require('mongoose')
const menuRouter = require('./routes/menu')
const app = express()

mongoose.connect(`mongodb://localhost/chickeninnDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))



app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('menu/home')
})


app.use('/menu', menuRouter)


app.listen(3000)