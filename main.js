
let  Productos =[];

fetch ("./contenido.json")
    .then(response=>response.json())
    .then(data=> {
        Productos = data;
        CargarProductos(Productos);
    })


// html 

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonCategoria = document.querySelectorAll(".Categoria");
const TituloP = document.querySelector("#TituloPrincipal");
let btnAgregar = document.querySelectorAll(".agregar-carrito");
const NumeroCarrito = document.querySelector("#numero-carrito");



// Funcion para cargar todos los productos
function CargarProductos (elegirProductos) { //agregue el parametro "Elegir productos" para que cada categoria tenga el array representativo
         
    // Vaciar el contenido actual del contenedor
    ContenedorProductos.innerHTML = "";

    elegirProductos.forEach(producto => {

        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = ` 
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="detalles">
           <h3 class="producto-titulo">${producto.titulo}</h3>
           <p class="precio">$${producto.precio}</p>
           <button class="agregar-carrito" id = "${producto.id}">Agregar</button>
        </div> `;

        ContenedorProductos.append(div);


    })
    ActualizarAgregar();
}

CargarProductos(Productos);

//funcion para cambiar de cateorias los productos.

botonCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonCategoria.forEach(boton =>boton.classList.remove("active"));

        e.target.classList.add("active");

        if (e.currentTarget.id != "todos"){
            //callback para que cada categoria tenga el titulo que corresponde
            const tituloCategoria = Productos.find(producto=>producto.categoria.id === e.currentTarget.id);
            TituloP.innerText = tituloCategoria.categoria.nombre;

             // filter para traer cada id de las categorias y asi crea un array solo de dicha categoria
        const prodBoton = Productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        CargarProductos(prodBoton)
        } else {
            TituloP.innerText = "Todos los productos";
            CargarProductos(Productos);
         }
    })
});


//Funcion para que cada vez que se carguen productos no se reinicien en 0
function ActualizarAgregar(){
    btnAgregar = document.querySelectorAll(".agregar-carrito");
    btnAgregar.forEach(boton=>{
        boton.addEventListener("click", agregarCarrito);
    })
};



//funcion para agregar al carrito los productos
let prodDecarrito;

let productosCarritoLS = localStorage.getItem("productos-del-carrito");

    if(productosCarritoLS){
        prodDecarrito = JSON.parse(productosCarritoLS);
        ActNumero();
    } else {
        prodDecarrito = [];

    };




//crear el evento para agregar al carrito y devuelva el producto seleccionado 

function agregarCarrito(e) {

    Toastify({
        text: "Producto en carrito",
        style: {
            background: "linear-gradient(to right, #E6B17E, #a84726)",
          },
        offset: {
          x: 50, 
          y: 10 
        },
      }).showToast();

    const idBoton = e.currentTarget.id;
    const ProAgregado = Productos.find(producto => producto.id === idBoton);

    if(prodDecarrito.some(producto => producto.id === idBoton)){
       const indeX= prodDecarrito.findIndex(producto => producto.id === idBoton);
        prodDecarrito [indeX].cantidad++;
     } else {
        ProAgregado.cantidad = 1;
            prodDecarrito.push(ProAgregado);
        }
        ActNumero();
        //agregar al local storage
        localStorage.setItem("productos-del-carrito", JSON.stringify(prodDecarrito));
    }





     //funcion para actualizar el numero del carrito 
    function ActNumero(){
        let Newnumero =prodDecarrito.reduce((acc, producto) =>acc + producto.cantidad, 0);
        NumeroCarrito.innerText = Newnumero;
    };
