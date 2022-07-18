//Variables

const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener() {
  //Cuando agregas un curso presionando "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);
  carrito.addEventListener("click", eliminarCurso);
  vaciarCarrito.addEventListener("click", borrarCarrito);
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    agregarCarrito();
  });
}

//Funciones
function agregarCurso(e) {
  if (e.target.classList.contains("agregar-carrito")) {
    e.preventDefault();

    const curso = e.target.parentElement.parentElement;
    const objetoCurso = {
      imagen: curso.querySelector("img").src,
      titulo: curso.querySelector("h4").textContent,
      precio: curso.querySelector("p span").textContent,
      id: curso.querySelector("a").getAttribute("data-id"),
      cantidad: 1,
    };

    const existe = articulosCarrito.some((item) => item.id === objetoCurso.id);
    if (existe) {
      const curso = articulosCarrito.map((item) => {
        if (item.id === objetoCurso.id) {
          item.cantidad++;
          return item;
        } else {
          return item;
        }
      });
      articulosCarrito = [...articulosCarrito];
    } else {
      articulosCarrito = [...articulosCarrito, objetoCurso];
    }

    console.log(articulosCarrito);
    agregarCarrito();
  }
}

//Muestra el carrito de compras en el HTML
function agregarCarrito() {
  contenedorCarrito.innerHTML = "";
  articulosCarrito.map((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="${item.imagen}" width="100"></td>
    <td>${item.titulo}</td>
    <td>${item.precio}</td>
    <td>${item.cantidad}</td>
    <td><a href="#" class="borrar-curso" data-id="${item.id}"> X </a></td>
    `;

    contenedorCarrito.appendChild(row);
  });

  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    articulosCarrito = articulosCarrito.filter((item) => item.id !== cursoId);
    agregarCarrito();
  }
}

function borrarCarrito() {
  if (articulosCarrito.length > 0) {
    articulosCarrito = [];
    agregarCarrito();
  }
}
