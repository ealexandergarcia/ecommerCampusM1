import { buttonCartDetails } from "./components/footer.js";
import { galleryCategory } from "./components/gallery.js";
import { buttonAtcProductDetial, titleProductDetail, productDetail } from "./components/section.js";
import { getProductId } from "./module/detail.js";

let main__section__gallery = document.querySelector("#main__section__gallery");
let main__section__title = document.querySelector("#main__section__title");
let product__information = document.querySelector(".product__information");
let footer__ul = document.querySelector(".footer__ul");
let info = "";
let prueba = {};
let amount = 1;
addEventListener("DOMContentLoaded", async(e)=>{
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    if(!localStorage.getItem(id)) localStorage.setItem(id, JSON.stringify(await getProductId({id})));
    info = JSON.parse(localStorage.getItem(id));
    console.log(info);
    // console.log(localStorage)
    prueba.Producto = info;
    console.log('Info');
    
    console.log(prueba.Producto);

    main__section__gallery.innerHTML = await galleryCategory(info)
    main__section__title.innerHTML = await titleProductDetail(info)

    let btn_minus = document.querySelector("#btn_minus");
    let btn_plus = document.querySelector("#btn_plus");
    let wishList = document.querySelector("#btn_wishList")

    product__information.innerHTML = await productDetail(info);
    footer__ul.innerHTML = await buttonCartDetails(info);

    btn_minus.addEventListener("click",quantity)
    btn_plus.addEventListener("click",quantity)
    wishList.addEventListener("click",addToWishList)
    // footer__ul.innerHTML = await buttonAtcProductDetial(info)
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
    if(!sessionStorage.getItem(prueba.Producto)) {
        prueba.Producto.data.quantity = amount;
        // e.preventDefault();
        prueba.Producto.data.product_price = prueba.Producto.data.product_price.replace(/^\$/, '');
        if(prueba.Producto.data.product_original_price){
            prueba.Producto.data.product_original_price = prueba.Producto.data.product_original_price.replace(/^\$/, '');
        }        
        sessionStorage.setItem(id,JSON.stringify(prueba.Producto));
    }
    let info = JSON.parse(sessionStorage.getItem(id));
    console.log(info)
})


const quantity = async (e)=>{
    let span_quantity = document.querySelector("#span_quantity");
    let price_discount = document.querySelector("#price_discount");
    let price_original = document.querySelector("#price_original");
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    let res = JSON.parse(localStorage.getItem(id)).data;
    
    let product_original_price = undefined;
    if(res.product_original_price) product_original_price = Number(res.product_original_price.replace("$", ""));
    let product_price= Number(res.product_price.replace("$", ""));


    if(e.target.id == "btn_plus")amount = span_quantity.innerHTML = Number(span_quantity.innerHTML) + 1;
    
    if(e.target.id == "btn_minus" && span_quantity.innerHTML > "1") amount = span_quantity.innerHTML = Number(span_quantity.innerHTML) - 1;

    price_discount.innerHTML = `$${(product_price * Number(span_quantity.innerHTML)).toFixed(2)}`;
    if(product_original_price) price_original.innerHTML = `$${(product_original_price * Number(span_quantity.innerHTML)).toFixed(2)}`;
    // Swal.fire({
    //     position: "top-end",
    //     title: `<small>Product ${id} with a quantity of ${span_quantity.innerHTML} was added to the cart</small>`,
    //     showConfirmButton: false,
    //     timer: 2000
    // });
}

const addToWishList= ()=>{
    alert("Product saved to wish list")
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    console.log(id)
    if(!sessionStorage.getItem(prueba.Producto)){
        prueba.Producto.data.favorite = true;
        prueba.Producto.data.product_price = prueba.Producto.data.product_price.replace(/^\$/, '');
        if(prueba.Producto.data.product_original_price){
            prueba.Producto.data.product_original_price = prueba.Producto.data.product_original_price.replace(/^\$/, '');
        }        
        sessionStorage.setItem(id,JSON.stringify(prueba.Producto));
    }
}