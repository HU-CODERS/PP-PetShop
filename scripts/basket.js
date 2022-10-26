// DOM
let $juguetes = document.getElementById("juguetesJs")
let $search = document.getElementById("searchJs")
let $prices = document.getElementById("pricesJs")
// Variables de la API
let apiData;
let juguetes;
let oferta;
let favoritos = []
fetch("https://apipetshop.herokuapp.com/api/articulos")
  .then(data => data.json())
  .then(data => {
    // Datos API nativos
    apiData = data.response; // Array de objetos
    console.log(apiData)
    // Manejo de Datos
    juguetes = apiData.filter(e=> e.tipo == "Juguete") // Filtro Juguetes
    oferta = juguetes.filter(e=> e.stock < 4)
    // Funciones a invocar.
    crearCard($juguetes, juguetes )
    handlerFav(apiData.id)
    $search.addEventListener('keyup', filtrar)
    $prices.addEventListener('change', filtrar)
  })
  .catch(error => console.log(error));

// Render Cards | PENDIENTE AGREGAR DETAILS HTML.

function crearCard(contenedor, array ) {
  array.forEach(e => {
  contenedor.innerHTML+=`
  <div class="row">
  <div class="col-xl-3 col-md-6 col-sm-12">
      <div class="card card-wide text-center" style="width: 18rem;">
          <img class="card-img-top-wide" src="${e.imagen}">
          <div class="card-body" style="text-align:left;">
              <h5 class="card-title">
                  ${e.nombre}
              </h5>
              <img src="../assets/star.png">  <img src="../assets/star.png">
              <img src="../assets/star.png">  <img src="../assets/star.png">
              <img src="../assets/star.png"> 
              <p class="card-text" style="color:#2F7661;">
                  
                  <img src="../assets/tag.png"> 
                  <b>$${e.precio}</b>
              </p>
              <a class="add-to-basket btn btn-custom zoom" href="#"
                  data-name="${e.nombre};" 
                  data-price="${e.precio}">
                  <img style="width: 25px; height: 25px" src="https://cdn-icons-png.flaticon.com/512/107/107831.png">
              </a>
          </div>   
      </div>
  </div>

    `
  })
}

function rangePrice(array, precio){
  
function filtrar() {
let checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(ele => ele.value)
let filtradosPorCategoria = past.filter(eventos => checked.includes(eventos.category) || checked.length == 0)
let filtradosPorSearch = filtradosPorCategoria.filter(value => value.name.toLowerCase().includes($search.value.toLowerCase()))
imprimirCards(filtradosPorSearch, $cards)
}
}
// function handlerFav(id) {
//   if (favoritos.includes(id)) {
//      favoritos = favoritos.filter(e => e !== id)
//      localStorage.setItem('favoritos', JSON.stringify(favoritos))}
//      else {
//      favoritos.push(id)
//      localStorage.setItem('favoritos', JSON.stringify(favoritos))}
//  }






