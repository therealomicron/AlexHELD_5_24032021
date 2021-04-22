const productAPI = "http://localhost:3000/api/cameras/";
const basketContents = window.localStorage.getItem("basket").split(",");
async function getProductObject(url) {
    let productObject = await getProductList(url);
    return productObject;
};
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
function addToProducts(obj) {
    const products = document.querySelector("#products");
    products.appendChild(makeArticle(obj));
}
function makeArticle(obj) {
    const newArticle = document.createElement("article");
    newArticle.classList.add("d-flex");
    newArticle.classList.add("flew-row");
    newArticle.classList.add("m-3");
    newArticle.appendChild(makeFigure(obj));
    newArticle.appendChild(makeDiv(obj));
    return newArticle;
}
function makeFigure(obj) {
    const newFigure = document.createElement("figure");
    newFigure.classList.add("col-4");
    const newImg = document.createElement("img");
    newImg.classList.add("img-thumbnail");
    newImg.setAttribute("src", obj.imageUrl);
    newImg.setAttribute("alt", "A camera for hipsters");
    newFigure.appendChild(newImg);
    return newFigure;
}
function makeDiv(obj) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("col-8");
    const newTitle = document.createElement("h2");
    newTitle.textContent = obj.name;
    const newPrice = document.createElement("p");
    newPrice.textContent = "Prix: " + (obj.price/100) + "€";
    const newDescription = document.createElement("p");
    newDescription.textContent = obj.description;
    newDescription.classList.add("text-truncate");
    const newLink = document.createElement("a");
    newLink.setAttribute("href", "../pages/product.html?pid=" + obj._id);
    newLink.textContent = "Afficher le produit";
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newPrice);
    newDiv.appendChild(newDescription);
    newDiv.appendChild(newLink);
    return newDiv;
};

basketContents.forEach(element => getProductObject(productAPI + element).then(value => {
    console.log("Beginning basket build");
    productObject = value;
    addToProducts(productObject);
}))