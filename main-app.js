
// ########    Сервер та роутер    ########
const express = require ("express");
const mainRouter = require('./routes/mainRoutes')
const server = express();
const createError = require('http-errors')

// ########    Шаблони    ########
server.set('view engine', 'ejs');
server.set('views', './views');

// ########    Статік    ########
server.use(express.static('./pub'));

// ########    Роути    ########

server.use('/', mainRouter);

server.get('/video/home.mp4', (req, res, next) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    next();
})

// ########    Помилки    ########
server.use((error, req, res, next) => {
    if (error.status === 500)
    {
        console.log("Помилка:" + error.status);
        res.statusCode = 500;
        res.render('500');
    }
    if (error.status === 400)
    {
        console.log("Помилка:" + error.status);
        res.statusCode = 400;
        res.render('400');
    }
    if (error.status === 404)
    {
        console.log("Помилка:" + error.status);
        res.statusCode = 404;
        res.render('404');
    }
    else {
        res.statusCode = 404;
        res.render('404');
    }

    res.statusCode = 404;
    res.render('404');

    console.log('error.status: ' + error.status)
    console.log('error.statusCode: ' + error.statusCode)
    console.log('error.message: ' + error.message)

})




// ########    Старт сервера    ########
server.listen(3000); console.log('server listen on localhost, port 3000');
