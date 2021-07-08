const createError = require('http-errors');
const express = require('express');
const methodOverride = require('method-override'); 
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const app = express();
// const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
// app.use(userLoggedMiddleware);
app.use(express.static(path.resolve(__dirname, '../public')));


const homeRouter = require('./routes/homeRouter');
const adminRouter = require('./routes/adminRouter');
const userRouter = require('./routes/userRouter');
const buyerRouter = require('./routes/buyerRouter');



const PORT = process.env.PORT || 3001



app.use(express.json())
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')) //Para que funcionen PUT y DELETE


app.use(session({
	secret: "Es un secreto de Ronins",
	resave: false,
	saveUninitialized: false,
}));
// app.use('/', (req, res) => res.json({ clave: "con el server" }));

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ' + PORT)
}

);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/products', buyerRouter);
app.use('/user', userRouter);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  app.use((req, res, next) => {
    res.status(404).render('404');
    next();
})

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

