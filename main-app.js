

const express = require ("express");
const server = express();

let counterOfRequests = 0;

server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static('./pub'));

// ############################################               Роути              ############################################

server.use((req, res, next) => {
    counterOfRequests++;
    console.log(counterOfRequests);
    next();
})

server.use('/video/home.mp4', (req, res, next) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    next();
})

server.get('/', (req,res) => {
    res.render('main');
})

server.get('/123', (req,res) => {
    res.send('123');
})

server.get('/products', (req,res) => {
    const products = (require("./products"));
    res.json(products);
})

server.get('/products/:id', (req, res, next) => {
    const { id } = req.params;
    const products = (require("./products"));

    const idProd = Number(id);
    const product = products.products_db.find(item => item.id === idProd);

    if (product === undefined)
    {
        console.log("Товар не знайдено");
        res.render('noProduct');
    }

    res.render('product', { product });
})


server.use((req, res, next) => {
    if (res.statusCode===500)
    {
        console.log("Товар не знайдено");
        res.statusCode = 500;
        res.render('500');
        return;
    }



    res.statusCode = 404;
    res.render('404');
    next();
})










server.listen(3000); console.log('server listen on localhost, port 3000');
