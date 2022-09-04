# Paginación

### Plug-in diseñado en javaScript para poder paginar un data-set, y presentarlos en una tabla.

Este plug-in ofrece paginación offset-based sobre un data-set estático, es decir, no hay una consulta a la base de datos por cada página que se muestra, se traen todos los datos (todas las páginas) de una sola vez, y es el plug-in el que se encarga de paginar sobre los datos ya obtenidos. Es al revés de lo que se hace normalmente, la paginación con la estrategia offset debe ser hecha a nivel de consulta SQL, solo se solicitan los datos de la página que se quiere mostrar (datos por partes), esta estrategia es la óptima cuando la base de datos posee una gran cantidad de información.

El proyecto al que va destinado este plug-in posee una base de datos de no más de 1000 registros, por lo que no representa una alta carga de procesamiento traer todos los datos de una sola vez. El plug-in recibe los datos disponibles en la base de datos (como un array de objetos) y opera con ellos para la paginación; si hay una actualización (de los datos) hay que hacer un re-fresh de la web para mostrarlos.

Queda claro entonces que el plug-in no hace consultas a nivel SQL, solo recibe los datos pre-procesados como un array de objetos. Podría modificarse este plug-in para que el paginado sea hecho a nivel SQL, no requiere mucho trabajo llegar a ese enfoque.

El formato del diseño se hizo estéticamente similar al ofrecido por el plug-in de DataTables© (https://datatables.net/), la idea fue desarrollar las funcionalidades básicas que se muestran en su web: **Paginación**, **Búsqueda instantánea** y **Ordenación muticolumna**.

Imagen capturada de la página web de DataTables©
![imagen](https://user-images.githubusercontent.com/51080618/188278866-4b421521-7c49-42b1-8462-20bb70597556.png)

Características básicas del paginador de DataTables©
![imagen](https://user-images.githubusercontent.com/51080618/188278634-9b507515-b5ff-42b1-8331-af2d8f0803cc.png)

# Mi paginador
Mi plug-in de momento solo ofrece el paginado básico quedando para más adelante el desarrollo de la búsqueda paramétrica y la ordenación por columnas.

En la imagen puede observarse el resultado de la paginación para una base de datos de ejemplo:

En la **parte superior** están los controles: a la izquierda: el selector para elegir la cantidad de registros a mostrar por página, a la derecha: los botones de navegación para avance rápido (<<  >>), con ellos se avanza por bloque de páginas, por ej., de 6 en 6. Los botones de avance de página en página (<  >); también se pueden vanzar de página a página con las teclas derecha e izquierda del teclado. Y los botones de página, con los que se puede elegir la página haciendo click en el botón corresponiente.

El la **parte central** está la tabla de datos mostrando la página actual, que tendrá la cantidad de registros según se haya seleccionado arriba. 

Y en la **parte inferior** están: el número de la página que se muestra, la cantidad total de páginas y la cantidad total de registros.

![imagen](https://user-images.githubusercontent.com/51080618/188276244-87cf15dd-06a3-42ed-9c70-3c1701df96e2.png)

El punto de entrada al paginador es la funcion:
```javascript 
builddatatables(data, number_of_buttons, custom_header);
```
`data` es el data-set, y es una array de objetos de la la forma:
```javascript
data = [
    {
      key_1: 'value_11',
      key_2: 'value_12',
      key_3: 'value_13',
       .
       .
       .
      key_m: 'value_1m'
    },
    {
      key_1: 'value_21',
      key_2: 'value_22',
      key_3: 'value_23',
       .
       .
       .
      key_m: 'value_2m'
    },
    .
    .
    .
    {
      key_1: 'value_n1',
      key_2: 'value_n2',
      key_3: 'value_n3',
       .
       .
       .
      key_m: 'value_nm'
    }   
]
```
`number_of_buttons` debebiera ser entero entre 1 y 10.

`custom_header` es un array con los títulos de la cabecera, tendrá la forma: `['title1', 'title2', ... 'title12']`.

, si no se especifica, por defecto, será 6. 

Si es un número negativo entre -10 y -1, tomará el valor del entero positivo correspondiente.
Si es 0, tomará el valor 1.
Si es mayor que 10, tomará el valor 10.
Si es un decimal mayor que cero y menor a 10, tomará el valor del entero menor.
Si es un decimal mayor a 10, tomará el valor 10.
Si es no es un número, tomará el valor por defecto.
Si no le paso el data-set a la función `builddatatable()`, arrojará:

![imagen](https://user-images.githubusercontent.com/51080618/188292340-f026cba8-7a4c-4432-a8aa-3b2060f2b4f7.png)

No habrá botones de navegación ni el selector de registros.

Igual efecto tendrá si le paso un array vacío: `builddatatable([])` o `builddatatable([], 0)`

El plug-in dibujará una tabla de la forma:
 
 |  key1   |  key2   |  key3   | . . . |  keym   |
 |---------|---------|---------|-------|---------|
 | value11 | value12 | value13 | . . . | value1m |
 | value21 | value22 | value23 | . . . | value2m |
 |    .    |    .    |    .    |   .   |    .    |
 |    .    |    .    |    .    |   .   |    .    |
 |    .    |    .    |    .    |   .   |    .    |
 | valuen1 | valuen2 | valuen3 | . . . | valuenm |
 |  **key1**   |  **key2**   |  **key3**   | . . . |  **keym**   |
                     
 Dibujará 6 botones de navegación, con botones para avanace por página y avance rápido 
 cada 6 páginas. La teclas de izq y der del teclado también sirven para el avance por 
 página.

 NOTA: Si data no es de la forma descripta, los resultados pueden ser inesperados.
 
builddatatable(data, number_of_buttons):
                     

