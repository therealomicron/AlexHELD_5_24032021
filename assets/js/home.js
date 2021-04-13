const productAPI = "http://localhost:3000/api/cameras";
let productListAsk = new XMLHttpRequest();
productListAsk.onreadystatechange = function () {
    if (productListAsk.readyState === 4) {
        console.log("Ready state: " + productListAsk.readyState);
        productList = JSON.parse(productListAsk.response);
        console.log(JSON.stringify(productList));
    } else {
        console.log("Ready state: " + productListAsk.readyState);
    }
}
productListAsk.open('GET', productAPI);
console.log('opened');
productListAsk.send();
console.log('sent');
