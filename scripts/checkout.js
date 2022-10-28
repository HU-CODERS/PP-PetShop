let $dom = document.getElementById("orderContainer")
let $modal = document.getElementById("tablaModal")

let almacen;
fetch("https://apipetshop.herokuapp.com/api/articulos")
.then(data => data.json())
.then(data => {
    almacen =   data.response
    
    testt(almacen)
    let carritoActual = JSON.parse(localStorage.getItem('carritoCompras'))
})

let carritoFinal = []
function testt(almacen){
    let carritoActual = JSON.parse(localStorage.getItem('carritoCompras'))
    carritoFinal = []
    for(let i=0; i < carritoActual.length; i++){
        carritoFinal.push(almacen.filter(e=> e.nombre == carritoActual[i]))
    }
    carritoFinal = almacen.filter(x => carritoActual.includes(x.nombre));
    testing929($modal, carritoFinal)
    total(carritoFinal)
    console.log(carritoFinal);
}

function total(carrito) {
   let totalCarrito = document.getElementById(`totalCarrito`)

    let starterValue = {
      precio: 0
    }
    let stats = carrito.reduce((e1, e2) => {
      return {
        total: e1 + e2.precio
      }
    }, starterValue)
   totalCarrito.innerHTML=`
    <b>
    Total: ${stats.total}
    </b> 
   ` 
    }
    



function testing929(contenedor, array){
    console.log(array);
    array.forEach(element => {
        let elemento = document.getElementById(`precio${element._id}`)
        contenedor.innerHTML+=`
        <table class="tabla-estilo">
        <tbody>
        <tr id="borrar-${element._id}">
          <td><a  onclick="borrar('${element._id}','${element.nombre}')" class="delete-item">x</a></td>
          <td>${element.nombre}</td>
          <td><p id="precio${element._id}" data-price='precio${element.precio}'></p>$</td>
          <td><div class='input-group'><button id="resta-${element._id}" class='minus-item btn btn-light' style='font-size:14px; border-color: #B7BCBB;'>-</button>
          <input type='text' class='item-count form-control' style='box-shadow:none; text-align:center; font-size:14px;'readonly>
          <button id="suma-${element._id}" class='plus-item btn btn-light' style='border-color: #B7BCBB; font-size:14px;'>+</button></div></td>
          <td><p class='float-right'>= $total</p></td>
        </tr>
      </tbody>
    </table>
        `  
        console.log(elemento);
    })}

    function adicion(nombre, id){
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

      function borrar(id,nombre) {
        console.log(id);
        document.getElementById('borrar-'+id).remove()
        localStorage.getItem(`carritoCompras`)
        let carritoCompras = JSON.parse(localStorage.getItem('carritoCompras'))
        carritoCompras = carritoCompras.filter(carrito => carrito !== nombre)
        localStorage.setItem('carritoCompras', JSON.stringify(carritoCompras))
        
      }


// Tenemos el array de objetos dentro de carritoActual. | Esos objetos solo tienen su ID (Nombre).
