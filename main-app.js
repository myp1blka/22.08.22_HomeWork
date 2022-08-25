
// ########    Сервер та роутер    ########
const express = require ("express");
const mainRouter = require('./routes/mainRoutes')
const server = express();
//const createError = require('http-errors')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


// ########    Шаблони    ########
server.set('view engine', 'ejs');
server.set('views', './views');

// ########    Статік    ########
server.use(express.static('./pub'));

// ########    Роути    ########

server.use('/', mainRouter);



// ########    Помилки    ########
server.use((error, req, res, next) => { // почему если убрать NEXT не работает РЕНДЕР
    console.log('error.status: ' + error.status)
    console.log('error.statusCode: ' + error.statusCode)
    console.log('error.message: ' + error.message)

    if (error.status === 500){
        console.log("Помилка:" + error.status);
        res.statusCode = 500;
        res.render('500');
        return;}
    if (error.status === 400){   
        console.log("Помилка:" + error.status);
        res.statusCode = 400;
        res.render('400');
        return;}
    else {   
        res.statusCode = 404;
        res.render('404');}

})

// server.use((req, res) => {

//     res.statusCode = 404;
//     res.render('404');

// })





// ########    Старт сервера    ########
server.listen(3000); console.log('server listen on localhost, port 3000');
