const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector ('#cart');
const productos = document.querySelector('.especiales');

let articulosCarrito = [];

productos.addEventListener('click', agregarProducto);

carrito.addEventListener('click', quitarProducto);

$('formulario').on('submit', agregarProducto);


window.addEventListener('load', () => {
    console.log('load');
});   

function quitarProducto(e) {
	if (e.target.classList.contains('borrarProducto')) {
		const productoId = e.target.getAttribute('data-id');

		articulosCarrito = articulosCarrito.filter(producto => producto.id != productoId);
		insertarCarritoHTML();
		guardarStorage();
	}
}

const botonVaciarCarrito = document.querySelector('.vaciarCarrito');
botonVaciarCarrito.addEventListener('click', vaciarCarrito);

function vaciarCarrito () {
    limpiarCarrito();
    articulosCarrito = [];
    guardarStorage();
}

function agregarProducto (e) {
    e.preventDefault();
    
    if(e.target.classList.contains('botonComprar')) {
        const productoSeleccionado = e.target.parentElement;
        
        obtenerDatos(productoSeleccionado);
    }
}

function obtenerDatos (producto) {
    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('.especialesNombre').textContent,
        precio: producto.querySelector ('.especialesPrecio').textContent,
        id: producto.querySelector('.botonComprar').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(producto => {
        return producto.id === productoAgregado.id
    });

    if (existe) {
        const listaCompras = articulosCarrito.map(producto => {
            if(producto.id === productoAgregado.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        })
        articulosCarrito = [...listaCompras];
    } else {
        articulosCarrito.push(productoAgregado);
    }

    insertarCarritoHTML();
    guardarStorage ();
}

function guardarStorage () {
    localStorage.setItem('compra', JSON.stringify(articulosCarrito));
}

function insertarCarritoHTML() {

    limpiarCarrito ();

    articulosCarrito.forEach(producto => {

        const {imagen, nombre, precio, cantidad, id} = producto;

        const row = document.createElement ('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width=100>
            </td>

            <td>
                ${nombre}
            </td>

            <td>
                ${precio}
            </td>

            <td>
                ${cantidad}
            </td>
        
            <td>
                <a href="#" class="borrarProducto" data-id="${id}"> X </a>
            </td>
        `
    
        contenedorCarrito.appendChild(row);
    })
}

function limpiarCarrito (){
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
