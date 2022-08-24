
const preloader_elem = document.getElementById('preloader');
const products_elem = document.getElementById('products-div');

const getOverHere = async () => {
        // отримати дані від віддаленого сервера
        const resultProductsObj = await axios.get('./products/');

        // відмалювати отримані дані в HTML (передаємо об'єкт)
        drawProducts(resultProductsObj);
}

const drawProducts = (result) => {
    let productParams = ""; // очистити накопичувальну HTML змінну
    let mainKey ;

    for (mainKey in result.data) { // перелічити всі параметри в об'єкті та їх значення
        console.log('key = ' + result.data[mainKey]);
    }

    for (let i in result.data[mainKey]) {
        productParams += `<div class="product"><a href="/products/${result.data[mainKey][i]['id']}">
        <img height="150px" width="150px" src="${result.data[mainKey][i]['picture']}"><br>
        <b>${result.data[mainKey][i]['title']}</b><br>${result.data[mainKey][i]['price']} грн.</a></div><br>`; // форматуємо виводимі дані
    }

    products_elem.insertAdjacentHTML('beforeend', productParams); // виводимо всі дані накопичені у змінній
    preloader_elem.style.display = 'none';
}

getOverHere();









