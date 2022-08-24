

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

server.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const products = (require("./products"));

    const idProd = Number(id);
    const product = products.products_db.find(item => item.id === idProd);

    res.render('product', { product });
    //res.send('product id is: ' + id);
})

server.use((req, res, next) => {
    res.statusCode = 404;
    res.render('404');
    next();
})










server.listen(3000); console.log('server listen on localhost, port 3000');
