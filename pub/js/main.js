
const preloader_elem = document.getElementById('preloader');
const products_elem = document.getElementById('products-div');

const GetOverHere = async () => {
        // отримати дані від віддаленого сервера
        const resultProductsObj = await axios.get('./products/');

        // відмалювати отримані дані в HTML (передаємо об'єкт)
        DrawProducts(resultProductsObj);
}

const DrawProducts = (result) => {
    let productParams = ""; // очистити накопичувальну HTML змінну
    let main_key ;

    for (main_key in result.data) { // перелічити всі параметри в об'єкті та їх значення
        console.log('key = ' + result.data[main_key]);
    }

    for (let i in result.data[main_key]) {
        productParams += `<div class="product"><a href="/products/${result.data[main_key][i]['id']}">
        <img height="150px" width="150px" src="${result.data[main_key][i]['picture']}"><br>
        <b>${result.data[main_key][i]['title']}</b><br>${result.data[main_key][i]['price']} грн.</a></div><br>`; // форматуємо виводимі дані
    }

    products_elem.insertAdjacentHTML('beforeend', productParams); // виводимо всі дані накопичені у змінній
    preloader_elem.style.display = 'none';
}

GetOverHere();









