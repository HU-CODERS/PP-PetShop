Documentacion actual sobre el funcionamiento de JS.


Dentro de la función:  testing(nombre, id)
- Se registra el location ID y se guarda como STRING con su nombre dentro de un array de objetos.

La funcion let carritoActual = JSON.parse(localStorage.getItem('carritoCompras'))
- Permite el almacenamiento en objeto de JS de esos datos del Local Storage.

La problematica es; - Al querer filtrarlo para poder tener un objeto con 3 propiedades (name, stock, price) filtra vacio.
Necesitamos: Que con base en el string generado por testing y retornado como array de objetos de JS en carritoActual, podamos asignarle a cada iteración un objeto con
3 propiedades con sus respectivas propiedades de la API. 

Podria probarse subir un objeto completo al localstorage y de ahi imprimir en pantalla sin filtrar previamente.
Seria ideal usar el Modal, porque en pago.html carecemos de botones de sumado o restado de unidades.


