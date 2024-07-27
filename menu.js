const openMenu = document.querySelector("#Open");
const cerrarMenu = document.querySelector("#close-menu");
const aside = document.querySelector ("aside");



//abrir y cerrar menu hamburguesa //

openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
})

cerrarMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
})

botonCategoria.forEach(boton => boton.addEventListener ("click", ()=> {
    aside.classList.remove("aside-visible");
}))