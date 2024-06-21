import { footerWishList } from "./components/footer.js";
import { cardProductWishList } from "./components/section.js";

let sessionStorageValues = Object.values(sessionStorage);
let checkout__details = document.querySelector(".checkout__details");
let footer__ul = document.querySelector(".footer__ul")

addEventListener("DOMContentLoaded", async (e) => {
    checkout__details.innerHTML = await cardProductWishList(sessionStorageValues)
    footer__ul.innerHTML = await footerWishList(sessionStorage);
})