import { getAllProductsName } from "./module/app.js";
import { galleryIndex } from "./components/gallery.js";

let input_search = document.querySelector("#input_search");
let main__article = document.querySelector(".main__article")

input_search.addEventListener("change", async e => {
    let data = { search : e.target.value}
    input_search.value = null;
    let res = await getAllProductsName(data);
    let products = res.data.products
    products.forEach(element => {
        main__article.innerHTML += galleryIndex(element);
    });
    console.log(products);
});