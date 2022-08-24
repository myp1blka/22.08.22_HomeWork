

const express = require ("express");
const server = express();

server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static('./pub'));

// ############################################               Роути              ############################################

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

    const id_prod = Number(id);
    const product = products.products_db.find(item => item.id === id_prod);

    res.render('product', { product });
    //res.send('product id is: ' + id);
})










server.listen(3000); console.log('server listen on localhost, port 3000');
