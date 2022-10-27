let juguetes
let checkbox = document.getElementById("contenedor")
fetch("https://apipetshop.herokuapp.com/api/articulos")
  .then(data => data.json())
  .then(res => {
    events = res.response
    juguetes = events.filter(e=> e.tipo == "Juguete") // Filtro Juguetes
  })
  .catch(error => console.log(error))

let menorPrecio = juguetes.filter(producto => producto.precio < 380 && producto.precio > 0)
menorPrecio.map(producto => producto.categoria="-380")
console.log(menorPrecio);
 
/*   let arrayLowPrice = juguetes.filter(e =>e.precio < 380 && e.precio > 0)
  arrayLowPrice.map(e=> e.categoria="-$380")
  console.log(arrayLowPrice);
  let arrayMidPrice = juguetes.filter(e =>e.precio > 380 && e.precio < 840)
  arrayMidPrice.map(e=>e.categoria="$380-$840")
  console.log(arrayMidPrice);
  let arrayHighPrice = juguetes.filter(e=> e.precio > 840 && e.precio < 1000)
  arrayHighPrice.map(e=>e.categoria="$840-$1000")
  console.log(arrayHighPrice);

  let arrayWithCategory= arrayLowPrice.concat(arrayMidPrice).concat(arrayHighPrice)
 */

/*   function crearCheckbox(producto) {
    let fn = (producto) => producto.precio;
    let eventsCheck = new Set(producto.filter(fn).map(fn));
    console.log(eventsCheck);
    eventsCheck.forEach((precios) => {
      checkbox.innerHTML += `
            <label class="d-inline-flex  p-1" for="${precios}">
                <input class=" m-1 checkbox" type="checkbox" id="${precios}" name="letter" value="${precios}"> ${precios}
            </label>
            `;
    });
  } */
