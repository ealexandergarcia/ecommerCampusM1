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
                <a href="../?id='fashion'">
                    <img src="../storage/img/back.svg">
                </a>
                <img id="btn_wishList" src="../storage/img/heartblack.svg">
            </div>
        </article>`;
}

export const galleryCarrousel = async (res) => {
    let plantilla = "";
    res.forEach((element) => {
        if (element !== null && typeof element === 'string') {
            const data = JSON.parse(element);
            let info = data.data;
            // console.log(info);
            if (data.status === 'OK' && data.request_id && info && info.asin) {
                console.log(info);  
                plantilla += /*html*/`
                <div class="slide">
                    <section>
                        <div class="section__front_page">
                            <a href="views/detail.html">
                                <img src="${info.product_photo}" alt="">
                            </a>
                        </div>
                        <h5>${info.product_title}</h5>
                        <div class="section__price">
                            <span>${info.product_price}</span>
                            <div class="price__score">
                                <img src="../storage/img/star.svg" alt="">
                                <p>${info.product_star_rating?? 0}</p>
                            </div>
                        </div>
                    </section>
                </div>
                `;
            }
        }
    });
    return plantilla;
};