let url = location;
let searchParams = new URLSearchParams(url.search);
let pID = searchParams.get("pid");
alert(pID);
const productAPI = "http://localhost:3000/api/teddies";
