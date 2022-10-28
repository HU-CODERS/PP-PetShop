let $dom = document.getElementById("orderContainer")
let $modal = document.getElementById("tablaModal")

let almacen;
fetch("https://apipetshop.herokuapp.com/api/articulos")
.then(data => data.json())
.then(data => {
    almacen =   data.response
    
    testt(almacen)
    let carritoActual = JSON.parse(localStorage.getItem('carritoCompras'))
    carritoActual.filter()
})

let carritoFinal = []
function testt(almacen){
    let carritoActual = JSON.parse(localStorage.getItem('carritoCompras'))
    carritoFinal = []
    for(let i=0; i < carritoActual.length; i++){
        carritoFinal.push(almacen.filter(e=> e.nombre == carritoActual[i]))
    }

    testing929($modal, carritoFinal)
    
}



function testing929(contenedor, array){
    console.log(array);
    array.forEach(element => {
        contenedor.innerHTML+=`
        <table class="tabla-estilo">
        <tbody>
        <tr>
          <td><a class="delete-item">x</a></td>
          <td>${element[0].nombre}</td>
          <td><p class='d-none d-lg-inline'>P/U: $2</p></td>
          <td><div class='input-group'><button class='minus-item btn btn-light' style='font-size:14px; border-color: #B7BCBB;'>-</button>
          <input type='text' class='item-count form-control' style='box-shadow:none; text-align:center; font-size:14px;'readonly>
          <button class='plus-item btn btn-light' style='border-color: #B7BCBB; font-size:14px;'>+</button></div></td>
          <td><p class='float-right'>= $total</p></td>
        </tr>
      </tbody>
    </table>
    <div class="float-right">
      <b>
          Total: $20</span>
      </b>
    </div>
   
        `  
    })}



// Tenemos el array de objetos dentro de carritoActual. | Esos objetos solo tienen su ID (Nombre).