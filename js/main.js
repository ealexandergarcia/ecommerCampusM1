import { menuListCategoryIndex } from "./components/menu.js";
import { galleryIndex } from "./components/gallery.js";
import { getAllProductsName, getAllCategory, getAllProductsByCategory } from "./module/app.js";
import { getProductId } from "./module/detail.js";

let input_search = document.querySelector("#input_search");
let main__article = document.querySelector(".main__article")
let nav__ul = document.querySelector(".nav__ul")
let search = async(e)=>{
    

    let params = new URLSearchParams(location.search);
    let dataSearch = { search: e.target.value, id:params.get("id") }
    
    input_search.value = null;
     let res =""
    if(input_search.dataset.opc == "random") {
        res = await getAllProductsName(dataSearch);
        input_search.dataset.opc == undefined;
    }else res = await getAllProductsName(dataSearch);
    // let res = await getAllProductsName(dataSearch);
    // console.log(res);
    
    main__article.innerHTML += galleryIndex(res,params.get("id"));

    let {data: {products}} = res;
    let asin = products.map(value => {return {id: value.asin}});
    
    let proceso = new Promise(async(resolve, reject) =>{
        for (let index = 0; index < asin.length; index++) {
            let id = asin[index].id;
            if(localStorage.getItem(id)) continue;
            let data = await getProductId(asin[index]);
            if(localStorage.setItem(id, JSON.stringify(data))) ;
        }
        resolve({message:"Datos buscados correctamente"})
    })
    Promise.all([proceso]).then(res => {console.log(res);
    })
}

addEventListener("DOMContentLoaded", async (e) =>{
    if (!localStorage.getItem("getAllCategory")) localStorage.setItem("getAllCategory", JSON.stringify(await getAllCategory())); 
    nav__ul.innerHTML = await menuListCategoryIndex(JSON.parse(localStorage.getItem("getAllCategory")));
    history.pushState(null,"","?id=fashion");
    input_search.value ="zapato"
    
    const eventochange = new Event('change');
    input_search.dispatchEvent(eventochange);
})

input_search.addEventListener("change", search() 
    // let params = new URLSearchParams(location.search);
    // let dataSearch = { search: e.target.value, id:params.get("id") }
    
    // input_search.value = null;
    // let res = await getAllProductsName(dataSearch);
    // // console.log(res);
    
    // main__article.innerHTML += galleryIndex(res,params.get("id"));

    // let {data: {products}} = res;
    // let asin = products.map(value => {return {id: value.asin}});
    
    // let proceso = new Promise(async(resolve, reject) =>{
    //     for (let index = 0; index < asin.length; index++) {
    //         let id = asin[index].id;
    //         if(localStorage.getItem(id)) continue;
    //         let data = await getProductId(asin[index]);
    //         if(localStorage.setItem(id, JSON.stringify(data))) ;
    //     }
    //     resolve({message:"Datos buscados correctamente"})
    // })
    // Promise.all([proceso]).then(res => {console.log(res);
    // })
);