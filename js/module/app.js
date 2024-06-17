import { headers } from "../components/env.js";
export const getAllProductsName = async ({ search: text } = { search: "Phone" }) => {
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${text}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL `;
    const options = {
        method: 'GET',
        headers
    };
    let res = await fetch(url, options);
    let data = await res.json();
    
    return data;
}

export const getAllCategory = async () => {
    const url = 'https://real-time-amazon-data.p.rapidapi.com/product-category-list?country=US';
    const options = {
        method: 'GET',
        headers
    };
    let res = await fetch(url, options);
    let data = await res.json();
    return data;
}


export const getAllProductsByCategory = async ({ search: text, id:idCategory }) => {
    const url =  `https://real-time-amazon-data.p.rapidapi.com/search?query=${text}&page=1&country=US&sort_by=RELEVANCE&category_id=${idCategory}&product_condition=ALL ` ;
    const options = {
        method: 'GET',
        headers
    };
    let res = await fetch(url, options);
    let data = await res.json();
    return data;
}


export const getAllProductRandom = async ({
    query="zapato",
    page=1, 
    category_id="fashion",
    min_price=100,
    max_price=150,
    brand=["adidas", "nike","puma"]})=>{
        page= Math.random()*(page/20);
        page =parseInt(Math.round(page));
        if(!page) page = 2;
        const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${query}&page=${page}&country=US&sort_by=RELEVANCE&category_id=${category_id}&min_price=${min_price}&max_price=${max_price}&product_condition=ALL&brand=${brand.join(",")}`;
        const options = {
            method: 'GET',
            headers
        };
}