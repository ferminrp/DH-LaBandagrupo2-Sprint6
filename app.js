const express = require('express')
const app = express()
const port = process.env.PORT;
const path = require('path');
app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/producto', (req, res) => {
    res.render('producto');
});

app.get('/carrito', (req, res) => {
    res.render('carrito');
});


app.listen(port || 3000, () => {
    console.log('Vamo arribaaaa neneeee 🤟      Mandale mecha al puerto 3000');
});
