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

