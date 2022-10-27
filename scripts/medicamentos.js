async function getData() {
  try {
    let res = await fetch("https://apipetshop.herokuapp.com/api/articulos");
    let data = await res.json();
    console.log(data);
    let dataShop = data.response;
    console.log(dataShop);
    let medicamentos = dataShop.filter((e) => e.tipo === "Medicamento");
    console.log(medicamentos);
    createCards(medicamentos);

    let menorRango = medicamentos.filter(
      (cadaMedicamento) => cadaMedicamento.precio <= 360
    );
    console.log(menorRango);
    menorRango.map((e) => (e.rango = "$0-$360"));
    let medianoRango = medicamentos.filter(
      (cadaMedicamento) =>
        cadaMedicamento.precio >= 360 && cadaMedicamento.precio <= 800
    );
    medianoRango.map((e) => (e.rango = "$360-$800"));
    console.log(medianoRango);
    let altoRango = medicamentos.filter(
      (cadaMedicamento) =>
        cadaMedicamento.precio >= 800 && cadaMedicamento.precio <= 1500
    );
    altoRango.map((cadaMedicamento) => (cadaMedicamento.rango = "$800-$1500"));
    console.log(altoRango);

    let arrayMedicamentosConRangos = menorRango
      .concat(medianoRango)
      .concat(altoRango);
    console.log(arrayMedicamentosConRangos);
    let arrayRangos = arrayMedicamentosConRangos.map((e) => e.rango);
    console.log(arrayRangos);
    let arrayRangosFiltrados = [...new Set(arrayRangos)];

    console.log(arrayRangosFiltrados);

    // createCheckBoxes(juguetes)
    createCheckBoxes(arrayRangosFiltrados);

    const checkBoxes = document.querySelectorAll(".form-check-input");
    checkBoxes.forEach((checks) => {
      checks.addEventListener("click", (event) => {
        let checked = event.target.checked;
        console.log(checked);
        if (checked) {
          checksSelected.push(event.target.value);
          console.log(checksSelected);
          filtradoCombinadoCyS(arrayMedicamentosConRangos);
          console.log(checksSelected);
        } else {
          checksSelected = checksSelected.filter(
            (uncheck) => uncheck !== event.target.value
          );
          filtradoCombinadoCyS(arrayMedicamentosConRangos);
        }
      });
    });

    let inputSearch = document.getElementById("js-searchText");
    inputSearch.addEventListener("keyup", function (evento) {
      searchText = evento.target.value;
      filtradoCombinadoCyS(arrayMedicamentosConRangos);
    });

    filtradoCombinadoCyS(arrayMedicamentosConRangos);
  } catch (error) {
    console.log(error);
  }
}

getData();
let contenedorCheckboxes = document.getElementById("js-contenedorCheckboxes");
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
  contenedorCheckboxes.innerHTML = checkContainer;
}

let checksSelected = [];
let searchText = "";

let contenedorCardsMed = document.getElementById("js-contenedorCardsMed");
function createCards(data) {
  contenedorCardsMed.innerHTML = "";
  if (data.length > 0) {
    data.forEach((medicamento) => {
      contenedorCardsMed.innerHTML += `
        <div class="card">
        <div class="wrapper">
          <div class="colorProd"></div>
          <div class="imgProd"> <img src="${medicamento.imagen}" class="imgcard card-img-top"  alt:"${medicamento.nombre}"/></div>
          <div class="infoProd">
            <p class="nombreProd">${medicamento.nombre}
            </p>
            <p class="extraInfo">${medicamento.descripcion}</p>
            <div class="actions">
              <div class="preciosGrupo">
                <p class="precio precioProd">${medicamento.precio}</p>
              </div>
              <div class="icono action aFavs">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <path
                    d="M47 5c-6.5 0-12.9 4.2-15 10-2.1-5.8-8.5-10-15-10A15 15 0 0 0 2 20c0 13 11 26 30 39 19-13 30-26 30-39A15 15 0 0 0 47 5z">
                  </path>
                </svg>
              </div>
              <div class="icono action alCarrito">
                <svg class="inCart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <title>Quitar del carrito</title>
                  <path d="M30 22H12M2 6h6l10 40h32l3.2-9.7"></path>
                  <circle cx="20" cy="54" r="4"></circle>
                  <circle cx="46" cy="54" r="4"></circle>
                  <circle cx="46" cy="22" r="16"></circle>
                  <path d="M53 18l-8 9-5-5"></path>
                </svg>
                <svg class="outCart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <title>Agregar al carrito</title>
                  <path d="M2 6h10l10 40h32l8-24H16"></path>
                  <circle cx="23" cy="54" r="4"></circle>
                  <circle cx="49" cy="54" r="4"></circle>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
              `;
    });
  } else {
    contenedorCardsMed.innerHTML = ` 
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
          (medicamento) =>
            medicamento.nombre
              .toLowerCase()
              .includes(searchText.trim().toLowerCase()) &&
            medicamento.rango == rangoCheck
        )
      )
    );
  } else if (checksSelected.length > 0 && searchText == "") {
    checksSelected.map((rangoCheck) =>
      datos.push(
        ...array.filter((medicamento) => medicamento.rango == rangoCheck)
      )
    );
  } else if (checksSelected.length == 0 && searchText !== "") {
    datos.push(
      ...array.filter((medicamento) =>
        medicamento.nombre
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
      )
    );
  } else {
    datos.push(...array);
  }
  createCards(datos);
}
