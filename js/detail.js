import { galleryCategory } from "./components/gallery.js";
import { buttonAtcProductDetial, titleProductDetail } from "./components/section.js";
import { getProductId } from "./module/detail.js";


let main__section__gallery = document.querySelector("#main__section__gallery");
let main__section__title = document.querySelector("#main__section__title");
let footer__ul = document.querySelector(".footer__ul");
let info = "";
let prueba = {};
addEventListener("DOMContentLoaded", async(e)=>{
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    if(!localStorage.getItem(id)) localStorage.setItem(id, JSON.stringify(await getProductId({id})));
    info = JSON.parse(localStorage.getItem(id));
    console.log(info);
    console.log(localStorage)
    prueba.Producto = info;
    main__section__gallery.innerHTML = await galleryCategory(info)
    main__section__title.innerHTML = await titleProductDetail(info)
    footer__ul.innerHTML = await buttonAtcProductDetial(info)
    // let {data} = res;
    // let {
    //     category_path,
    //     about_product,
    //     product_details,
    //     product_information,
    //     product_photos,
    //     product_variations,
    //     rating_distribution,
    //     review_aspects,
    //     ...dataUpdate
    // } = data;
    // console.log(dataUpdate);
})

footer__ul.addEventListener("click", async (e) =>{
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    console.log(id)
    if(!sessionStorage.getItem(prueba.Producto)) sessionStorage.setItem(id,JSON.stringify(prueba.Producto));
    let info = JSON.parse(sessionStorage.getItem(id));
})