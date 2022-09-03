document.addEventListener('DOMContentLoaded', () => {

    // Variables
    let Productos = [];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const DOMbotonFinalizar = document.querySelector('#boton-finalizar');
    const DOMselectMarca = document.querySelector('#select-marca');
    const DOMbotonSearch = document.querySelector('#boton-search');
    const miLocalStorage = window.localStorage;

    // Funciones
    function nombreFilter(array) {
        console.log(array);
        let nombre = DOMselectMarca.value;
        if (!nombre) {
            return array;
        } else {
            return array.filter((e) => e.nombre == nombre);
        }
    }

    function renderizarProductos(array) {
        DOMitems.innerHTML = ""

        array.forEach((producto) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h6');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = producto.nombre;
            // Descripcion
            const miNodoDescripcion = document.createElement('p');
            miNodoDescripcion.classList.add('card-descripcion');
            miNodoDescripcion.textContent = producto.descripcion;
            // Foto
            const miNodoFoto = document.createElement('img');
            miNodoFoto.classList.add('img-fluid');
            console.log(producto.foto);
            console.log(miNodoFoto.src);
            miNodoFoto.setAttribute('src', producto.foto);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${divisa} ${producto.precio}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-dark');
            miNodoBoton.textContent = 'Agregar al Carrito';
            miNodoBoton.setAttribute('marcador', producto.id);
            //En el listener, agregamos la función a traves de una función flecha apra pasar el parámetro e
            miNodoBoton.addEventListener('click', (e) => {
                anadirProductoAlCarrito(e);
            });
            // Insertamos
            miNodoCardBody.appendChild(miNodoFoto);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoDescripcion);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    function getData() {

        const url = "../js/productos.json";

        fetch(url)
            .then(response => response.json())
            .then(articulos => {
                //guardamos los artículos en la variable productos. esto lo hacemos para después filtrar y obtener el id en 
                Productos = articulos;
                renderizarProductos(nombreFilter(articulos));

            })
            .catch(function(error) {
                console.log('Error during fetch: ' + error.message);
            });
    }

    DOMbotonSearch.addEventListener('click', () => {
        getData();
    })


    /**
     * Evento para añadir un producto al carrito de la compra
     */
    function anadirProductoAlCarrito(evento) {
        // añadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        Swal.fire({
            icon: 'success',
            title: 'Nuevo producto agregado al carrito',
            text: anadirProductoAlCarrito.nombre,
            confirmButtonColor: "#444444"
        });
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }


    /**
     * Dibuja todos los productos guardados en el carrito
     */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';

        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos

            const miItem = Productos.filter((itemBasedeDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBasedeDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario lo mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-justify', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].descripcion} -${divisa} ${miItem[0].precio}`;

            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = '🗑️';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    /**
     * Evento para borrar un elemento del carrito
     */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        Swal.fire({
            icon: 'error',
            title: 'Producto Eliminado',
            text: borrarItemCarrito.nombre,
            confirmButtonColor: "#444444"
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = Productos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    /**
     * Varia el carrito y vuelve a dibujarlo
     */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();
    }

    function finalizar() {
        //definimos la constante para que al pulsar el botón salgan los altert
        const precioFinal = DOMtotal.textContent;
        Swal.fire({
            title: '¿Seguro que queres finalizar tu compra?',
            text: `Total a abonar: $${precioFinal}`,
            showCancelButton: true,
            confirmButtonColor: '#008f39',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Compra Confirmada',
                    'Tu mascota está feliz!!!',
                    'success'
                )
                vaciarCarrito();
            }
        })
    }

    function guardarCarritoEnLocalStorage() {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage() {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    DOMbotonFinalizar.addEventListener('click', finalizar);

    // Inicio
    cargarCarritoDeLocalStorage();

})