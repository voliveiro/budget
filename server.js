require('dotenv').config(); 
const express = require('express'); 
const app = express(); 
const ejs = require('ejs');
const data = require('./modules/data.js')

app.use(express.static('public')); 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send(data)
})

app.get('/index', (req, res) => {
    res.render('index.ejs', {
        budgetData: data
    }); 
})

app.get('/budgetitem/:itemno', (req, res) => {
    const itemNo = parseInt(req.params.itemno);
    res.render('show.ejs', {
        budgetItem : data[itemNo]
    }) 

})

app.get('/index/new', (req, res) => {
    res.render('new.ejs')
})

app.post('/index', (req, res) => {
    data.push(req.body); 
    res.redirect('/index')
})

app.listen(process.env.PORT, ()=> {
    console.log ('listening @ port 3000')
})