export const titleProductDetail = async ({data:dataUpdate}= res)=>{
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
    // console.log(res);
    return /*html*/`
    <article class="article__detail">
        <div class="detail__head">
            <h1>${dataUpdate.product_title}</h1>
            <div class="product_select">
                <img src="../storage/img/minus.svg" alt="">
                <span>1</span>
                <img src="../storage/img/plus.svg" alt="">
            </div>
        </div>
        <div class="detail__score">
            ${new Array(parseInt(dataUpdate.product_star_rating)).fill(`<img src="../storage/img/star.svg" alt="">`).join('')}
            <span>${dataUpdate.product_star_rating}</span>
            <a href="${dataUpdate.product_url}">(${dataUpdate.product_num_ratings} reviews)</a>
        </div>
    </article>`
}