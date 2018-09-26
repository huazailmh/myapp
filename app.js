const express = require('express')
const app = express()

app.use(express.static('public'))

app.use("/lib", express.static('lib'))
app.use("/js", express.static('js'))
app.use("/styles", express.static('styles'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))