import { menuListCategoryIndex } from "./components/menu.js";
import { galleryIndex } from "./components/gallery.js";
import { getAllProductsName, getAllCategory, getAllProductsByCategory } from "./module/app.js";

let input_search = document.querySelector("#input_search");
let main__article = document.querySelector(".main__article")
let nav__ul = document.querySelector(".nav__ul")

addEventListener("DOMContentLoaded", async (e) =>{
    if (!localStorage.getItem("getAllCategory")) localStorage.setItem("getAllCategory", JSON.stringify(await getAllCategory())); 
    nav__ul.innerHTML = await menuListCategoryIndex(JSON.parse(localStorage.getItem("getAllCategory")));
})

input_search.addEventListener("change", async e => {
    let params = new URLSearchParams(location.search);
    let data = { search: e.target.value, id:params.get("id") }
    
    input_search.value = null;
    let res = await getAllProductsName(data);
    // console.log(res);
    
    main__article.innerHTML += galleryIndex(res,params.get("id"));

});