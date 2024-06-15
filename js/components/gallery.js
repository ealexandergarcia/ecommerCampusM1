export const galleryIndex = (res, cat) => {
    let { products } = res.data;
    let plantilla = "";

    products.forEach(element => {
        plantilla += /*html*/` 
        <section>
            <div class="section__front_page">
                <a href="views/detail.html?id=${element.asin}">
                    <img src=${element.product_photo} alt="">
                </a>
                <img src="storage/img/heart.svg" alt="">
            </div>
            <h5>${element.product_title}</h5>
            <small>${cat}</small>
            <div class="section__price">
                <span>${element.product_price}</span>
                <div class="price__score">
                    <img src="storage/img/star.svg" alt="">
                    <p>${element.product_star_rating}</p>
                </div>
            </div>
        </section>`
    });

    return plantilla
}

export const galleryCategory = ({data: {product_photos}} = res)=>{
    return /*html*/`
        <article class="article__product">
            <div class="product__image">
                ${product_photos.map(value => `<div class="product__image__item"><img src="${value}"></div>`).join('')}
            </div>
            <div class="product__menu">
                <a href="../">
                    <img src="../storage/img/back.svg">
                </a>
                <img src="../storage/img/heartblack.svg">
            </div>
        </article>`;
}
