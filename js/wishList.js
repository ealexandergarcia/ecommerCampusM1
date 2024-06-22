import { footerWishList } from "./components/footer.js";
import { galleryCarrousel } from "./components/gallery.js";
import { cardProductWishList } from "./components/section.js";

let localStorageValues = Object.values(localStorage);
let sessionStorageValues = Object.values(sessionStorage);
let checkout__details = document.querySelector(".checkout__details");
let footer__ul = document.querySelector(".footer__ul")
let slide__track = document.querySelector(".slide__track")
console.log(localStorageValues);
addEventListener("DOMContentLoaded", async (e) => {
    checkout__details.innerHTML = await cardProductWishList(sessionStorageValues)
    footer__ul.innerHTML = await footerWishList(sessionStorage);
    slide__track.innerHTML = await galleryCarrousel(localStorageValues);
})