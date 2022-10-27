async function getData() {
  try {
    let res = await fetch("https://apipetshop.herokuapp.com/api/articulos");
    let data = await res.json();
    console.log(data);
    let dataShop = data.response;
    console.log(dataShop);
    let juguetes = dataShop.filter((e) => e.tipo === "Juguete");
    console.log(juguetes);
    createCards(juguetes);

    let menorRango = juguetes.filter((cadaJuguete) => cadaJuguete.precio <= 360);
    console.log(menorRango);
    menorRango.map((e) => (e.rango = "$0-$360"));
    let medianoRango = juguetes.filter(
      (cadaJuguete) => cadaJuguete.precio >= 360 && cadaJuguete.precio <= 800
    );
    medianoRango.map((e) => (e.rango = "$360-$800"));
    console.log(medianoRango);
    let altoRango = juguetes.filter(
      (cadaJuguete) => cadaJuguete.precio >= 800 && cadaJuguete.precio <= 1500
    );
    altoRango.map((cadaJuguete) => (cadaJuguete.rango = "$800-$1500"));
    console.log(altoRango);

    let arrayJuguetesConRangos = menorRango
      .concat(medianoRango)
      .concat(altoRango);
    console.log(arrayJuguetesConRangos);
    let arrayRangos = arrayJuguetesConRangos.map((e) => e.rango);
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
          filtradoCombinadoCyS(arrayJuguetesConRangos);
          console.log(checksSelected);
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
