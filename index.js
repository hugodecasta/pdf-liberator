// --------------------------------------------------- INIT SERVERS
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT ?? 3000

// --------------------------------------------

app.use(cors())
app.get('/', (req, res) => res.send('hey welcome, use me as "/pdf/ ... pdf url ..."'))

require('./server')(app)

// --------------------------------------------------- LISTEN

const package = require('./package.json')

app.listen(PORT, () => console.log(`${package.name} v${package.version} listening on ${PORT}`))