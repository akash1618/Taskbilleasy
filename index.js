const express = require('express');
const { mongoose } = require('mongoose');
const app = express();
const port = 3000
const DBURL = 'mongodb+srv://tanajibarge:%40T415501@cluster0.frqbm.mongodb.net/test3'

let connection = mongoose.connect(DBURL, {
    ssl: true,
    family: 4
})
app.get('/',(req,res)=> {
    res.send('Hello World')
})

app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})