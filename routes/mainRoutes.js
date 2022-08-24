const express = require ('express');
const router = express.Router();
const createError = require('http-errors')

let counterOfRequests = 0;

// ########    Лічильник    ########
router.use((req, res, next) => {
    counterOfRequests++;
    console.log(counterOfRequests);
    next();
})


// ########    Генеруємо Помилки    ########
router.get('/500', (req, res, next) => {
    //throw createError(status, message, properties)
    throw createError(500, `Internal Server Error`)

})

router.get('/400', (req, res, next) => {
    //throw createError(status, message, properties)
    throw createError(400, `Bad Request`)

})




// ########    Звичайні Роути    ########
router.get('/', (req, res) => {
    res.render('main');
})

router.get('/123', (req, res) => {
    res.send('123 ?? серйозно ?? тобі сумно чи як? :)');
})

router.get('/products', (req, res) => {
    const products = (require("../products"));
    res.json(products);
})

router.get('/products/:id', (req, res, next) => {
    const { id } = req.params;
    const products = (require("../products"));

    const idProd = Number(id);
    const product = products.products_db.find(item => item.id === idProd);

    if (product === undefined)
    {
        console.log("Товар не знайдено");
        res.render('noProduct');
        return;
    }

    res.render('product', { product });
})























module.exports = router;