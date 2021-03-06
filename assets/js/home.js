const productAPI = "http://localhost:3000/api/cameras";
let productList;
function getProductList(url) {
    return new Promise(function (resolve, reject) {
        let productListAsk = new XMLHttpRequest();
        productListAsk.open("GET", url, true);
        productListAsk.onreadystatechange = function () {
            if (productListAsk.readyState === 4) {
                if (productListAsk.status === 200) {
                    resolve(productListAsk.response);
                } else {
                    reject(productListAsk.response);
                }
            } else {
                console.log("Ready state: " + productListAsk.readyState);
            }
        }
        productListAsk.send();
    });
};

async function productArray(url) {
    let productString = await getProductList(url);
    return JSON.parse(productString);
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
    newLink.setAttribute("href", "./pages/product.html?pid=" + obj._id);
    newLink.textContent = "Afficher le produit";
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newPrice);
    newDiv.appendChild(newDescription);
    newDiv.appendChild(newLink);
    return newDiv;
};

function makeArticle(obj) {
    const newArticle = document.createElement("article");
    newArticle.classList.add("d-flex");
    newArticle.classList.add("flew-row");
    newArticle.classList.add("m-3");
    newArticle.appendChild(makeFigure(obj));
    newArticle.appendChild(makeDiv(obj));
    return newArticle;
}

function addToProducts(obj) {
    const products = document.querySelector("#products");
    products.appendChild(makeArticle(obj));
}

productArray(productAPI).then(value => {
    productList = value;
    for (let i = 0; i < productList.length; i++) {
        addToProducts(productList[i]);
    }
});