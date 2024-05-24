import{a as L,S as w,i as m}from"./assets/vendor-b11e2a50.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();function v(e){return`<div class="gallery-item">
  <a href="${e.largeImageURL}">
    <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy"/>
  </a>
  <ul class="block-info">
    <li>
      <p class="title">Likes</p>
      <p class="text">${e.likes}</p>
    </li>

    <li>
      <p class="title">Views</p>
      <p class="text">${e.views}</p>
    </li>

    <li>
      <p class="title">Comments</p>
      <p class="text">${e.comments}</p>
    </li>

    <li>
      <p class="title">Downloads</p>
      <p class="text">${e.downloads}</p>
    </li>
  </ul>
</div>`}function E(e){return e.map(v).join("")}function g(e,r){const a=E(e);r.insertAdjacentHTML("beforeend",a)}const s={query:"",currentPage:1,maxPage:1,perPage:15};async function f(){const e="https://pixabay.com",r="/api/",a="44013925-160a3698223f11c3c7b6b04f2",i=e+r,t=new URLSearchParams({key:a,q:s.query,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:s.currentPage,lang:"en"});return await L.get(i,{params:t})}const q="/goit-js-hw-12/assets/error-17638c89.svg",y=new w(".gallery-item a",{captionsData:"alt"}),l=document.querySelector(".js-gallery"),S=document.querySelector(".js-form"),d=document.querySelector(".js-load-btn"),h=document.querySelector(".js-loader");S.addEventListener("submit",async e=>{if(e.preventDefault(),p(),l.innerHTML="",s.query=e.target.elements.query.value.trim(),s.currentPage=1,!s.query){c("Please enter a search term.");return}n.show();try{const r=await f(s.query);if(g(r.data.hits,l),y.refresh(),s.maxPage=Math.ceil(r.data.totalHits/s.perPage),r.data.hits.length===0){c("Sorry, there are no images matching your search query. Please try again!"),e.target.reset(),n.hide();return}}catch{c("Server error")}n.hide(),P(),e.target.reset()});d.addEventListener("click",async()=>{p(),s.currentPage+=1,n.show();try{const e=await f(s.query);g(e.data.hits,l),y.refresh()}catch{c("Server error")}n.hide(),P(),b()});function p(){d.classList.add("hidden")}function x(){d.classList.remove("hidden")}function P(){s.currentPage>=s.maxPage?(p(),A("You've reached the end of search results.")):x()}function b(){const r=l.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:r*4,behavior:"smooth"})}const n={hide(){h.classList.add("hidden")},show(){h.classList.remove("hidden")}};function c(e){m.warning({title:"Warning",titleColor:"#FAFAFB",message:e,messageColor:"#FAFAFB",color:"#EF4040",position:"topRight",timeout:5e3,iconUrl:q})}function A(e){m.info({message:e,messageColor:"black",color:"yellow",position:"topRight",timeout:5e3})}
//# sourceMappingURL=commonHelpers.js.map
