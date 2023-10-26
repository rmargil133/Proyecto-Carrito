//Variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBTN = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

// Cargar carrito desde localStorage si existe
cargarCarrito();

//Listeners
cargarEventsListeners();
function cargarEventsListeners(){
  listaCursos.addEventListener("click", añadirCurso);
  carrito.addEventListener("click", eliminarCurso);

  vaciarCarritoBTN.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML();
  })
}

//Funciones
function añadirCurso(e){
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")){
    const curso = e.target.parentElement.parentElement
    leerDatosCurso(curso);
  }
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML(articulosCarrito);
     // Guardar el carrito en localStorage después de eliminar un curso
    guardarCarrito();
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  carritoHTML(articulosCarrito);
   // Guardar el carrito en localStorage después de añadir un curso
   guardarCarrito();
}

function carritoHTML(){
  limpiarHTML()
  articulosCarrito.forEach((curso) => {
    const {imagen, titulo, precio, cantidad, id} = curso
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
            `
    contenedorCarrito.appendChild(row)
  })
}

//Funcion para guardar una cadena JSON con la clave 'carrito'. 

function guardarCarrito() {
//  El método JSON.stringify se utiliza para convertir el array articulosCarrito en una cadena JSON.
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Funcion para verificar y cargar el carrito desde el localStorage al cargar la página.
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    articulosCarrito = JSON.parse(carritoGuardado);
    carritoHTML();
  }
}

function limpiarHTML() {

  while (contenedorCarrito.firstChild){
    contenedorCarrito.firstChild.remove()
  }
}


//Vaciar el localStorage en funcion se eliminen cursos del carrito
function vaciarCarrito() {
  articulosCarrito = [];
  limpiarHTML();
  localStorage.removeItem('carrito'); // Limpiar el carrito en localStorage
}