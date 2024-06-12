export const galleryIndex = (arg) => {
    return /*html*/` 
    <section>
        <div class="section__front_page">
            <a href="views/detail.html">
                <img src=${arg.product_photo} alt="">
            </a>
            <img src="storage/img/heart.svg" alt="">
        </div>
        <h5>${arg.product_title}</h5>
        <small>Dress modern</small>
        <div class="section__price">
            <span>${arg.product_price}</span>
            <div class="price__score">
                <img src="storage/img/star.svg" alt="">
                <p>${arg.product_star_rating}</p>
            </div>
        </div>
    </section>`
}