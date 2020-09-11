const express = require('express')
const app = express();

app.listen(9000, () => {
    console.log('Server started')
})

app.use(express.json())
const baseRoute = require('./bases')

app.use('/bases',baseRoute)
app.use('/clans',clanRoute)

//module.exports = app();