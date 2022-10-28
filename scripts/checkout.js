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

function testt(almacen){
    let carritoActual = JSON.parse(localStorage.getItem('carritoCompras'))
    let carritoFinal = almacen.filter(x => carritoActual.includes(x.nombre));
    carritoFinal.map((e) => (e.cantidad = 1));

    const newArr = carritoFinal.map(object => {
      return {...object, stock: object.stock-1 };
    });

    localStorage.setItem('carritoFinal', JSON.stringify(newArr))
    testing929($modal)
    total()
  }

function total() {
   let carrito = JSON.parse(localStorage.getItem('carritoFinal'))
   let totalCarrito = document.getElementById(`totalCarrito`)

    let stats = carrito.reduce((e1, e2) => e1 + e2.precio, 0)
   totalCarrito.innerHTML=`
    <b>
    Total: ${stats}
    </b> 
   ` 
    }
    


    
function testing929(contenedor){
    let array = JSON.parse(localStorage.getItem('carritoFinal'))
    array.forEach(element => {
        contenedor.innerHTML+=`
        <table class="tabla-estilo">
        <tbody>
        <tr id="borrar-${element._id}">
          <td><a onclick="borrar('${element._id}','${element.nombre}')" class="delete-item">x</a></td>
          <td>${element.nombre}</td>
          <td><p id="precio${element._id}" data-price='precio${element.precio}'></p>P/U: $${element.precio}</td>
          <td><div class='input-group'><button id="resta-${element._id}" class='minus-item btn btn-light' style='font-size:14px; border-color: #B7BCBB;'
          onclick="resta('${element._id}','${element.nombre}')"
          >-</button>
          <input id='cantidad-${element._id}' type='text' class='item-count form-control' style='box-shadow:none; text-align:center; font-size:14px;'readonly value='1'>
          <button id="suma-${element._id}" class='plus-item btn btn-light' style='border-color: #B7BCBB; font-size:14px;' onclick="adicion('${element._id}','${element.nombre}')">+</button></div></td>
          <td><p class='float-right' id='total-${element._id}'>=$${element.precio * element.cantidad}</p></td>
        </tr>
      </tbody>
    </table>
        `  
    })}

    function adicion(id, nombre){
        let carritoFinal = JSON.parse(localStorage.getItem('carritoFinal'))
        const item2Modify = carritoFinal.find(e=> e.nombre === nombre);
        if(item2Modify){
          if (item2Modify.stock > 0) {
            const newArr = carritoFinal.map(object => {
              if (object.nombre === nombre) {
                return {...object, stock: object.stock-1, cantidad: object. cantidad +1};
              }
              return object;
            });
            localStorage.setItem('carritoFinal', JSON.stringify(newArr))
            document.getElementById(`total-${id}`).innerHTML = (item2Modify.cantidad + 1) * item2Modify.precio
            let inputPrice = document.getElementById(`cantidad-${id}`)
            inputPrice.value = parseInt(inputPrice.value) + 1
            calcularSuma()
          }
        }
      }

      function resta(id, nombre){
        let carritoFinal = JSON.parse(localStorage.getItem('carritoFinal'))
        const item2Modify = carritoFinal.find(e=> e.nombre === nombre);
        if(item2Modify){
          if (item2Modify.cantidad > 0) {
            const newArr = carritoFinal.map(object => {
              if (object.nombre === nombre) {
                return {...object, stock: object.stock+1, cantidad: object. cantidad-1};
              }
              return object;
            });
            localStorage.setItem('carritoFinal', JSON.stringify(newArr))
            document.getElementById(`total-${id}`).innerHTML = (item2Modify.cantidad-1) * item2Modify.precio
            let inputPrice = document.getElementById(`cantidad-${id}`)
            inputPrice.value = parseInt(inputPrice.value) - 1
            calcularSuma()
          }
        }
      }

      function borrar(id,nombre) {
        document.getElementById('borrar-'+id).remove()
        localStorage.getItem(`carritoCompras`)
        let carritoCompras = JSON.parse(localStorage.getItem('carritoCompras'))
        carritoCompras = carritoCompras.filter(carrito => carrito !== nombre)
        localStorage.setItem('carritoCompras', JSON.stringify(carritoCompras))
        
        let carritoFinal = JSON.parse(localStorage.getItem('carritoFinal'))
        carritoFinal = carritoFinal.filter(carrito => carrito.nombre !== nombre)
        localStorage.setItem('carritoFinal', JSON.stringify(carritoFinal))
      }

      function calcularSuma(){
        let carrito = JSON.parse(localStorage.getItem('carritoFinal'))
        let stats = 0;
        carrito.forEach(element => {
          stats += element.precio * element.cantidad
        });

        let totalCarrito = document.getElementById(`totalCarrito`)
        totalCarrito.innerHTML=`
        <b>
        Total: ${stats}
        </b> 
        ` 
        document.getElementById(`total-cart`).innerHTML = stats
      }
// Tenemos el array de objetos dentro de carritoActual. | Esos objetos solo tienen su ID (Nombre).
