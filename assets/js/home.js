const productAPI = "http://localhost:3000/api/cameras";
let productList;
function getProductList(url) {
   return new Promise(function (resolve, reject) {
       let productListAsk = new XMLHttpRequest();
       productListAsk.open("GET", url, true);
       productListAsk.onreadystatechange = function () {
           if (productListAsk.readyState === 4) {
               if (productListAsk.status === 200) {
                   console.log(productListAsk.readyState);
                   console.log(productListAsk.status);
                   resolve(productListAsk.response);
               } else {
                   console.log(productListAsk.status);
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
productArray(productAPI).then(value => {productList = value});
function loadPage(obj){
    //will call all functions used to create the DOM elements for each product
    //appends each completed article to section destined to contain all of the products
}
function makeHomeFigure(obj) {
    const newFigure = document.createElement("figure");
    newFigure.classList.add("col-4");
    const newImg = document.createElement("img");
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
    newPrice.textContent = obj.price;
    const newDescription = document.createElement("p");
    newDescription.textConent = obj.description;
    newDescription.classList.add("text-truncate");
    
};