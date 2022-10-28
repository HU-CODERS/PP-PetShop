let $dom = document.getElementById("orderContainer")

function testing929(contenedor){
contenedor.innerHTML+=`
<li class="list-group-item d-flex justify-content-between align-items-center tablaLateral2">
<p>Nombre</p>
</li>
`

}
testing929($dom)


let carritoActual = JSON.parse(localStorage.getItem('carritoCompras'))
console.log(carritoActual)
let almacen;
fetch("https://apipetshop.herokuapp.com/api/articulos")
.then(data => data.json())
.then(data => {
    almacen =  data.response

})




// Tenemos el array de objetos dentro de carritoActual. | Esos objetos solo tienen su ID (Nombre).
