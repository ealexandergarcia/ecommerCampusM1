export const menuListCategoryIndex = async (res)=>{
    let {data} = res;
    let plantilla = "";
    data.forEach(element => {
        plantilla+=/*html*/` 
        <li title="${element.name}" id="nav__ul__product__li">
            <a href="?id=${element.id} ">
                <img src="storage/img/category.svg" alt="">
                <span>${element.name}</span>
            </a>
        </li>`
    });
    return plantilla
}