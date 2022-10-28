let jugueteId= new URL(window.location.href).searchParams.get('id')

let container18 = document.getElementById("container18");

async function getDatos() {
  try {
    let id = location.search.slice(4);
    console.log(id);
    let res = await fetch("https://apipetshop.herokuapp.com/api/articulos");
    let data = await res.json();
    console.log(data);
    let dataShop= data.response
    console.log(dataShop);
    // let juguetes= dataShop.filter(e => e.tipo === "Juguete")
    // console.log(juguetes);
    let juegueteDetail = dataShop.find(object => object._id == jugueteId)
    createCardDetails(juegueteDetail)
  } catch (error) {
    console.log(error);
  }
}
getDatos();

function createCardDetails(event) {
  let div = document.createElement("div");
  div.className = "row g-0";
  div.innerHTML = `
                     <div class="col-md-5">
                      <img
                        src="${event.imagen}"
                        class="img-fluid rounded-start"
                        style="height: 100%; object-fit: cover; width: 100%"
                        alt="${event.descripcion}"
                      />
                    </div>
                    <div class="col-md-7 card-body">
                        <h5 class="card-title">${event.nombre}</h5>
                        <p>Date: ${event.precio}</p>

                    </div>`
                            ;
  container18.appendChild(div);
}
let objetoPrincipal;