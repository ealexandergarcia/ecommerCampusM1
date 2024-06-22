export const titleProductDetail = async({ data:dataUpdate } = res)=>{
    return /*html*/`
        <article class="article__detail">
            <div class="detail__head">
                <h1>${dataUpdate.product_title}</h1>
                <div class="product__select">
                    <img id="btn_minus" src="../storage/img/minus.svg">
                    <span id="span_quantity">1</span>
                    <img id="btn_plus" src="../storage/img/plus.svg" alt="">
                </div>
            </div>
            <div class="detail__score">
            ${
              dataUpdate.product_star_rating !== null && dataUpdate.product_star_rating !== undefined
                ? new Array(parseInt(dataUpdate.product_star_rating)).fill(`<img src="../storage/img/star.svg">`).join('')
                : ''
            }
            <span>${dataUpdate.product_star_rating}</span>
            <a href="${dataUpdate.product_url}">(${dataUpdate.product_num_ratings} reviews)</a>
          </div>
        </article>`;
}

export const buttonAtcProductDetial = async({ data:dataUpdate} = res) =>{
    return /*html*/`
        <li>
            <a href="../index.html" id="add__to__cart">
                <img src="../storage/img/shopping-cart.svg">
                <span>Add to Cart | ${dataUpdate.product_original_price}<del><sub>$${dataUpdate.product_price}</sub></del> </span>
            </a>
        </li>`;
}

export const cardProductCheckout = async (res) => {
    let plantilla = "";
    res.forEach((element) => {
        if (element !== null && typeof element === 'string') {
            const data = JSON.parse(element);
            let info = data.data;
            console.log(info);
            if (data.status === 'OK' && data.request_id && info && !info.favorite) {
                plantilla += /*html*/`
                <article class="details__product">
                    <div class="product__imagen">
                        <img src="${info.product_photo}">
                    </div>
                    <div class="product__description">
                        <h3>${info.product_title}</h3>
                        <small>Dress modern</small>
                        <span class="unit-price" data-price="${info.product_price}">$${info.product_price}</span>
                    </div>
                    <div class="product__custom">
                        <img src="../storage/img/menu.svg">
                        <div class="product__select">
                            <a href="" onclick="return false;" class='counter-button decrement'>
                                <img src="../storage/img/minusWhite.svg">
                            </a>
                            <span class='counter__value'>${info.quantity}</span>
                            <a href="" onclick="return false;" class='counter-button increment'>
                                <img src="../storage/img/plusWhite.svg">
                            </a>
                        </div>
                        <div class="total-price"></div>
                    </div>
                </article>
                `;
            }
        }
    });
    return plantilla;
};

export const billProductCheckout = async (totalItems, totalPrice) => {
    return /*html*/`
        <article class="section__bill">
            <div class="bill__total">
                <label>Total (${totalItems} items)</label>
                <span>$${totalPrice.toFixed(2)}</span>
            </div>
            <div class="bill__fee">
                <label>Shipping Fee</label>
                <span>$0.00</span>
            </div>
            <div class="bill__subtotal">
                <label>Sub Total</label>
                <span>$${totalPrice.toFixed(2)}</span>
            </div>
        </article>
    `;
};

export const productDetail = async(res)=>{
    let {data} = res;
    let {
        category_path,
        about_product,
        product_details,
        product_information,
        product_photos,
        product_variations,
        rating_distribution,
        review_aspects,
        ...dataUpdate
    } = data;
    // console.log(dataUpdate);
    let description = '';
    let description2 = '';
    if (dataUpdate.product_description) {
        description = dataUpdate.product_description.slice(0, 165);
        description2 = dataUpdate.product_description.slice(166);
    }else{
        description=("There is no description of this product")
    }

    return /*html*/`
    <details>
        <summary>${(dataUpdate.product_description && dataUpdate.product_description.length >= 165) ? description + "...Read more" : description}
        </summary>
        <p>${description2}</p>
    </details>`;
}


export const cardProductWishList = async (res) => {
    let plantilla = "";
    res.forEach((element) => {
        if (element !== null && typeof element === 'string') {
            const data = JSON.parse(element);
            let info = data.data;
            if (data.status === 'OK' && data.request_id && info && info.favorite) {
                // console.log(info);
                plantilla += /*html*/`
                <article class="details__product">
                    <div class="product__imagen">
                        <a href="detail.html?id=${info.asin}">
                        <img src="${info.product_photo}">
                        </a>
                    </div>
                    <div class="product__description">
                        <h3>${info.product_title}</h3>
                        <small>Dress modern</small>
                        <span class="unit-price" data-price="${info.product_price}">$${info.product_price}</span>
                    </div>
                </article>
                `;
            }
        }
    });
    return plantilla;
};