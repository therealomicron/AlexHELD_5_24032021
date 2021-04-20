let url = location;
let searchParams = new URLSearchParams(url.search);
let pID = searchParams.get("pid");
let product;
let zeroArray = [];
let basketArray;
const productAPI = "http://localhost:3000/api/cameras";
const articleClasses = ["d-flex", "flex-column", "flex-md-row", "my-3"];
const figureClasses = ["w-50", "mx-3"];
const imgClasses = ["w-100", "mx-3", "img-thumbnail"];
const divContainerClasses = ["d-flex", "flex-column", "justify-content-start", "mx-3"];
const divOptionsClasses = ["d-flex", "flex-row", "align-items-baseline", "justify-content-start", "w-100"];
const divBuyClasses = ["d-flex", "flex-column", "justify-content-start", "m-3"];
const quantityInputClasses = ["mx-3", "my-1"];
let buyBtn; 
let orderQTY;
function createBasketObject(arrayLength) {
    let i = 0;
    for(i; i < arrayLength; i++) {
        zeroArray.push(0);
    }
    window.localStorage.setItem("basket", zeroArray);
}
function initializeBasketArray() {
    basketArray = window.localStorage.getItem("basket").split(",");
    console.log(basketArray);
} 
function modifyBasket() {
    basketArray[pID] = parseInt(basketArray[pID], 10) + parseInt(orderQTY.value, 10);
    window.localStorage.setItem("basket", basketArray);
    console.log(window.localStorage.getItem("basket").split(","))
}
function getProductList(url) {
    return new Promise(function (resolve, reject) {
        let productListAsk = new XMLHttpRequest;
        productListAsk.open('GET', url, true);
        productListAsk.onreadystatechange = function () {
            if (productListAsk.readyState === 4) {
                if (productListAsk.status === 200) {
                    resolve(JSON.parse(productListAsk.response))
                } else {
                    console.log("Status: " + productListAsk.status);
                }
            } else {
                console.log("Ready state: " + console.log(productListAsk.readyState))
            }
        }
        productListAsk.send();

    });
};
function makeFigure(obj) {
    const newFigure = document.createElement("figure");
    figureClasses.forEach(element => { newFigure.classList.add(element) });
    const newImg = document.createElement("img");
    imgClasses.forEach(element => { newImg.classList.add(element) });
    newImg.setAttribute("src", obj.imageUrl);
    newImg.setAttribute("alt", "A camera for hipsters");
    newFigure.appendChild(newImg);
    return newFigure;
};
function makeDivContainer(obj) {
    const newDivContainer = document.createElement("div");
    divContainerClasses.forEach(element => { newDivContainer.classList.add(element) });
    const newName = document.createElement("h1");
    newName.textContent = obj.name;
    const newPrice = document.createElement("p");
    newPrice.textContent = "Prix : " + (obj.price / 100) + "€";
    const newDescription = document.createElement("p");
    newDescription.textContent = obj.description;
    newDivContainer.appendChild(newName);
    newDivContainer.appendChild(newPrice);
    newDivContainer.appendChild(makeDivOptions(obj));
    newDivContainer.appendChild(newDescription);
    return newDivContainer;
};
function makeDivOptions(obj) {
    const newDivOptions = document.createElement("div");
    divOptionsClasses.forEach(element => { newDivOptions.classList.add(element) });
    const newHeader = document.createElement("p");
    newHeader.textContent = "Lenses : ";
    newDivOptions.appendChild(newHeader);
    for (i = 0; i < obj.lenses.length; i++) {
        const newButton = document.createElement("button");
        newButton.textContent = obj.lenses[i];
        newButton.classList.add("m-3");
        newButton.classList.add("btn-secondary");
        newDivOptions.appendChild(newButton);
    };
    return newDivOptions;
};
function makeOrderInputs() {
    const newDivOrder = document.createElement("div");
    divBuyClasses.forEach(element => { newDivOrder.classList.add(element) });
    const newLabel = document.createElement("label");
    newLabel.setAttribute("for", "quantity");
    newLabel.textContent = "Quantité souhaité : ";
    quantityInputClasses.forEach(element => { newLabel.classList.add(element) });
    const newQuantityInput = document.createElement('input');
    newQuantityInput.setAttribute("type", "number");
    newQuantityInput.setAttribute("min", "1");
    newQuantityInput.setAttribute("max", "42")
    newQuantityInput.setAttribute("id", "quantity");
    newQuantityInput.setAttribute("name", "quantity");
    quantityInputClasses.forEach(element => { newQuantityInput.classList.add(element) });
    const newBuyButton = document.createElement("input");
    newBuyButton.setAttribute("type", "submit");
    newBuyButton.setAttribute("value", "Acheter maintenant");i
    newBuyButton.setAttribute("id", "buyBtn");
    quantityInputClasses.forEach(element => { newBuyButton.classList.add(element) });
    newDivOrder.appendChild(newLabel);
    newDivOrder.appendChild(newQuantityInput);
    newDivOrder.appendChild(newBuyButton);
    return newDivOrder;
};
function makeArticle(obj) {
    const newArticle = document.createElement("article");
    articleClasses.forEach(element => { newArticle.classList.add(element) });
    newArticle.appendChild(makeFigure(obj));
    newArticle.appendChild(makeDivContainer(obj));
    newArticle.appendChild(makeOrderInputs());
    return newArticle;
};
async function getProductArray(url) {
    let productArray = await getProductList(url);
    return productArray;
};
function orderProduct() {
    document.querySelector("#quantity").value
}
getProductArray(productAPI).then(value => {
    product = value[pID];
    const productLength = value.length
    if (typeof window.localStorage.getItem("basket") === 'object') {
        createBasketObject(productLength)
    } else {
        initializeBasketArray();
    };
    const section = document.querySelector("section");
    section.appendChild(makeArticle(product));
    buyBtn = document.querySelector("#buyBtn");
    orderQTY = document.querySelector("#quantity");
    buyBtn.addEventListener('click', () => modifyBasket())
});