 let $order = document.getElementById("orderContainer")
async function getData() {
  try {
    let res = await fetch("https://apipetshop.herokuapp.com/api/articulos");
    let data = await res.json();
    let dataShop = data.response;
    let juguetes = dataShop.filter((e) => e.tipo === "Juguete");
    createCards(juguetes);
    let menorRango = juguetes.filter((cadaJuguete) => cadaJuguete.precio <= 360);
    menorRango.map((e) => (e.rango = "$0-$360"));
    let medianoRango = juguetes.filter(
      (cadaJuguete) => cadaJuguete.precio >= 360 && cadaJuguete.precio <= 800
    );
    
    medianoRango.map((e) => (e.rango = "$360-$800"));
    let altoRango = juguetes.filter(
      (cadaJuguete) => cadaJuguete.precio >= 800 && cadaJuguete.precio <= 1500
    );
    altoRango.map((cadaJuguete) => (cadaJuguete.rango = "$800-$1500"));
    let arrayJuguetesConRangos = menorRango
      .concat(medianoRango)
      .concat(altoRango);
    let arrayRangos = arrayJuguetesConRangos.map((e) => e.rango);
    let arrayRangosFiltrados = [...new Set(arrayRangos)];
    // testing2($order, filterModal(juguetes))
  

    // createCheckBoxes(juguetes)
    createCheckBoxes(arrayRangosFiltrados);

    const checkBoxes = document.querySelectorAll(".form-check-input");
    checkBoxes.forEach((checks) => {
      checks.addEventListener("click", (event) => {
        let checked = event.target.checked;
        console.log(checked);
        if (checked) {
          checksSelected.push(event.target.value);

          filtradoCombinadoCyS(arrayJuguetesConRangos);

        } else {
          checksSelected = checksSelected.filter(
            (uncheck) => uncheck !== event.target.value
          );
          filtradoCombinadoCyS(arrayJuguetesConRangos);
        }
      });
    });

    let inputSearch = document.getElementById("js-search");
    inputSearch.addEventListener("keyup", function (evento) {
      searchText = evento.target.value;
      filtradoCombinadoCyS(arrayJuguetesConRangos);
    });

    filtradoCombinadoCyS(arrayJuguetesConRangos);
  } catch (error) {
    console.log(error);
  }
}


getData();
let carritoCompras = []
let containerCheckBoxes = document.getElementById("js-container-check");
function createCheckBoxes(array) {
  checkContainer = "";
  array.forEach((categoria) => {
    checkContainer += `
        
                    <input
                    class="me-1 form-check-input"
                      type="checkbox" 
                      value="${categoria}"  id="${categoria}"
                    />
                    <label class="d-inline-flex p-1" for="${categoria}"
                      >${categoria}</label
                    >
                  
          `;
  });
  containerCheckBoxes.innerHTML = checkContainer;
}

let checksSelected = [];
let searchText = "";

let container18 = document.getElementById("container18");
function createCards(data) {
  container18.innerHTML = "";
  if (data.length > 0) {
    data.forEach((juguete) => {
      container18.innerHTML += `
      <div class="card">
      <div class="wrapper">
        <div class="colorProd"></div>
        <div class="imgProd"> <img src="${juguete.imagen}" class="imgcard card-img-top"  alt:"${juguete.nombre}"/></div>
        <div class="infoProd">
          <p class="nombreProd">${juguete.nombre}
          </p>
          <p class="extraInfo">${juguete.descripcion}</p>
          <div class="actions">
            <div class="preciosGrupo">
              <p class="precio precioProd">${juguete.precio}</p>
            </div>
            <div class="icono action aFavs">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <path
                  d="M47 5c-6.5 0-12.9 4.2-15 10-2.1-5.8-8.5-10-15-10A15 15 0 0 0 2 20c0 13 11 26 30 39 19-13 30-26 30-39A15 15 0 0 0 47 5z">
                </path>
              </svg>
            </div>
            <div class="icono action alCarrito">
              <button class="btn btn-secondary" id="btn-${juguete.nombre}" onclick="testing('${juguete.nombre}', 'btn-${juguete.nombre}')">Agregar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
            `;
    });
  } else {
    container18.innerHTML = ` 
    <div class=container-message><img src="${"https://cdn.boletius.com/images/v3/search.png"}" class="img-message"  alt:"${"Event not found"}"/>
    <p id="message"> Event not found, adjust search filter! </p>
    </div>`;
  }
}

function filtradoCombinadoCyS(array) {
  let datos = [];
  if (checksSelected.length > 0 && searchText !== "") {
    checksSelected.map((rangoCheck) =>
      datos.push(
        ...array.filter(
          (juguete) =>
            juguete.nombre
              .toLowerCase()
              .includes(searchText.trim().toLowerCase()) &&
            juguete.rango == rangoCheck
        )
      )
    );
  } else if (checksSelected.length > 0 && searchText == "") {
    checksSelected.map((rangoCheck) =>
      datos.push(...array.filter((juguete) => juguete.rango == rangoCheck))
    );
  } else if (checksSelected.length == 0 && searchText !== "") {
    datos.push(
      ...array.filter((juguete) =>
        juguete.nombre.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    );
  } else {
    datos.push(...array);
  }
  createCards(datos);
}
function testing(nombre, id){
  let $btn = document.getElementById(id)
  if(!carritoCompras.includes(nombre)){
    carritoCompras.push(nombre)
    console.log(carritoCompras)
    $btn.className="btn-success"
    localStorage.setItem('carritoCompras', JSON.stringify(carritoCompras))
  }else{
    carritoCompras = carritoCompras.filter(carrito => carrito !== nombre)
    console.log(carritoCompras)
    $btn.className="btn-secondary"
    localStorage.setItem('carritoCompras', JSON.stringify(carritoCompras))
  }
}

function filterModal(juguetes){
  let carritoActual = JSON.parse(localStorage.getItem('carritoCompras'))

let filtro = juguetes.filter(e=> e.nombre == carritoActual[0])
return filtro
}




// function testing2(contenedor, array){
//   array.forEach( e=>{
//  contenedor.innerHTML+=
//   `
//   <table>
//   <tbody id=>
//     <tr>
//       <td rowspan='3'><a >Borrar Todo</a></td>
//       <td>🐶Producto🐶</td>
//       <td>
//         <p >P/U: $2</p>
//       </td>
//       <td>
//        <tr>${e.nombre}</tr>
//       </td>
//       <td>
//         <p>$total</p>
//      </td>
//     </tr>
//    </tbody>
//  </table>
//   `
//   })}

// function insertModal(data){
// data.forEach(e=> {
//   $modal.innerHTML+=`
//   <table class="tabla-estilo">
//   <tbody id=>
//     <tr>
//       <td><a class="delete-item">x</a></td>
//       <td>🐶Producto🐶</td>
//       <td>
//         <p class='d-none d-lg-inline'>P/U: $2</p>
//       </td>
//       <td>
//         <div class='input-group'><button class='minus-item btn btn-light'
//             style='font-size:14px; border-color: #B7BCBB;'>-</button>
//           <input type='text' class='item-count form-control'
//             style='box-shadow:none; text-align:center; font-size:14px;' readonly>
//           <button class='plus-item btn btn-light' style='border-color: #B7BCBB; font-size:14px;'>+</button>
//         </div>
//       </td>
//       <td>
//         <p class='float-right'>= $total</p>
//       </td>
//     </tr>
//    </tbody>
//  </table>
//  <div class="float-right">
//    <b>
//    <span> Total: $20</span>
//    </b>
//  </div>
//   `

