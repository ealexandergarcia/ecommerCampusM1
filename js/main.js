import { menuListCategoryIndex } from "./components/menu.js";
import { galleryIndex } from "./components/gallery.js";
import { getAllProductsName, getAllCategory } from "./module/app.js";

let input_search = document.querySelector("#input_search");
let main__article = document.querySelector(".main__article")
let nav__ul = document.querySelector(".nav__ul")

addEventListener("DOMContentLoaded", async (e) =>{
    let data = await getAllCategory();
    nav__ul.innerHTML = await menuListCategoryIndex(data);
})

input_search.addEventListener("change", async e => {
    let data = { search: e.target.value }
    input_search.value = null;
    let res = await getAllProductsName(data);

    main__article.innerHTML += galleryIndex(res);

});