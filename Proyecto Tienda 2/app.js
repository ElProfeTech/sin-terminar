document.addEventListener("DOMContentLoaded", function () {
    const btnCarrito = document.getElementById("boton_carrito");
    const mostrarCarrito = document.getElementById("contenedor-carrito");

    const tarjetaProducto = document.querySelectorAll(".productCard")
    const ListadoCarrito = document.querySelector(".listado-carrito")
    


    btnCarrito.addEventListener("click", () => {
        mostrarCarrito.classList.toggle("mostrar-carrito")
    });

    let contenedorCarrito = [];

    tarjetaProducto.forEach(tarjeta => {

        tarjeta.addEventListener("click", e => {
            if (e.target.classList.contains("addToKartBtn")) {
                    
                mostrarToast()
                
               
              


                function mostrarToast() {

                    const toast=document.getElementById("toast")
                    // Mostrar el toast
                    toast.style.display = "block";
                
                    // Forzar el reflow para reiniciar la animación al mostrar
                    void toast.offsetWidth;
                
                    // Aplicar la clase mostrar para activar la animación de zoom al aparecer
                    toast.classList.add("mostrar");
                
                    // Ocultar el toast después de un tiempo (por ejemplo, 3 segundos)
                    setTimeout(function () {
                        toast.classList.remove("mostrar");
                        setTimeout(function () {
                            toast.style.display = "none";
                        }, 300);
                    }, 3000);
                }
                
                
                

                const infoProducto = {
                    Imagen: tarjeta.querySelector("img").src,
                    Cantidad: 1,
                    Nombre: tarjeta.querySelector(".name").textContent,
                    Precio: parseFloat(tarjeta.querySelector(".price").textContent.slice(1))
                }


                const ProductoExistente = contenedorCarrito.find(producto => infoProducto.Nombre === producto.Nombre)

                if (ProductoExistente) {
                    ProductoExistente.Cantidad++


                }
                else {

                    contenedorCarrito.push(infoProducto)


                }
                ActualizarCarritoContent()
                console.log(contenedorCarrito)
            }

        })




    })

    function ActualizarCarritoContent() {
        ListadoCarrito.innerHTML = "";

        contenedorCarrito.forEach((item, index) => {
            const li = document.createElement("li")
            li.classList.add("info-carrito");
            li.innerHTML = ` 
           <div class="foto-carrito">
           <img src="${item.Imagen}" alt="">
       </div>
       <div class="titulo-carrito">
           <span class="articulo">${item.Nombre} </span>
           <div class="precio-cantidad">
               <span class="precio">$ ${item.Precio}</span>
               <input type="number" class="cantidad" min="1" value="${item.Cantidad}" >
           </div>
       </div>
       <div class="quitar-articulo" >
           <img src="img/quitar.png" alt="" class="quitar" data-index = "${index}">
       </div>
           
           
           `
            ListadoCarrito.appendChild(li)
          
       



        })
        ActualizarTotalCompra()
        ContadorDeArticulos()
        CantidadNumber();
      
       
        EliminarArticuloCarrito()


    }

    function ActualizarTotalCompra() {

        const TotalDeCompra = document.querySelector(".total-carrito")
        const Total = contenedorCarrito.reduce((acc, item) => acc + item.Precio * item.Cantidad, 0)
        TotalDeCompra.innerHTML = `   <span class="total">Total $ </span><span class="precio-total"> ${Total}</span>  `

    }

    function ContadorDeArticulos() {
        const ContadorCarrito = document.getElementById("contador-carrito")
        const Contador = contenedorCarrito.reduce((acc, item) => acc + item.Cantidad, 0)
        ContadorCarrito.innerHTML = `  <span> ${Contador}</span> `
    }

    function EliminarArticuloCarrito() {

        const BotonEliminar = document.querySelectorAll(".quitar")
        BotonEliminar.forEach(item => {
            item.addEventListener("click", (e) => {
                if (e.target.classList.contains("quitar")) {
                    const index = parseInt(e.target.getAttribute("data-index"))
                    contenedorCarrito.splice(index, 1)
                    console.log(contenedorCarrito)
                    ActualizarCarritoContent()
                    ActualizarTotalCompra()
                    ContadorDeArticulos()
                    CantidadNumber();
                
                }

            })

        })


    }

    

    function CantidadNumber() {
        const cantidadInputs = document.querySelectorAll(".cantidad");
    
        cantidadInputs.forEach((input, index) => {
            input.addEventListener("change", (e) => {
                if (e.target.classList.contains("cantidad")) {
                    contenedorCarrito[index].Cantidad = parseInt(e.target.value) || 1;
                    ActualizarTotalCompra();
                    ContadorDeArticulos();
                }
            });
        });
    }




const inputBusqueda=document.getElementById("inputBuscar")
const TodosArticulos=document.querySelectorAll(".productCard")

inputBusqueda.addEventListener("input",function(){

    const inputText=inputBusqueda.value.toLowerCase()

    TodosArticulos.forEach(articulo =>{
   const nombreArticulo=articulo.querySelector(".name").textContent.toLowerCase()
   if(nombreArticulo.includes(inputText)){
    articulo.style.display="block"
   }
   else{
    articulo.style.display="none"
   }
   

    })


})






















});

