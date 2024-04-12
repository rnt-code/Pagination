# Paginación

### Plug-in en javaScript para poder paginar un data-set y presentarlos en una tabla.

Este plug-in ofrece paginación offset-based sobre un data-set estático, es decir, no realiza una consulta a la base de datos por cada página que se muestra, se traen todos los datos (todas las páginas) de una sola vez, y es el plug-in el que se encarga de paginar sobre los datos ya obtenidos. Es al revés de lo que se hace normalmente, la paginación con la estrategia offset debe ser hecha a nivel de consulta SQL, solo se solicitan los datos de la página que se quiere mostrar (datos por partes), esta estrategia es la óptima cuando la base de datos posee una gran cantidad de información.

El proyecto al que va destinado este plug-in posee una base de datos de no más de 1000 registros, por lo que traer todos los datos de una sola vez no representa una alta carga de procesamiento. El plug-in recibe los datos disponibles en la base de datos (como un array de objetos) y opera con ellos para la paginación; si hay una actualización (de los datos) hay que hacer un re-fresh de la web para mostrarlos.

Queda claro entonces que el plug-in no hace consultas a nivel SQL, solo recibe los datos pre-procesados. Podría modificarse este plug-in para que el paginado sea hecho a nivel SQL, no requiere mucho trabajo llegar a ese enfoque.

El formato del diseño se hizo estéticamente similar al ofrecido por el plug-in de DataTables© (https://datatables.net/), la idea fue desarrollar las funcionalidades básicas que se muestran en su web: **Paginación**, **Búsqueda instantánea** y **Ordenación muticolumna**.

Imagen capturada de la página web de DataTables©
![imagen](https://user-images.githubusercontent.com/51080618/188278866-4b421521-7c49-42b1-8462-20bb70597556.png)

Características básicas del paginador de DataTables©
![imagen](https://user-images.githubusercontent.com/51080618/188278634-9b507515-b5ff-42b1-8331-af2d8f0803cc.png)

# Mi paginador
Mi plug-in de momento solo ofrece el paginado básico quedando para más adelante el desarrollo de la búsqueda paramétrica y la ordenación por columnas.

En la imagen de abajo puede observarse el resultado de la paginación para una base de datos de ejemplo.

En la **parte superior** están los controles. A la izquierda: el selector para elegir la cantidad de registros a mostrar por página, a la derecha: los botones de navegación para avance rápido (<<  >>) por bloque de páginas, por ej., de 6 en 6. Los botones de avance lento de página en página (<  >); también se pueden vanzar de página a página con las teclas derecha e izquierda del teclado. Y los botones de página, con los que se puede elegir una página en particular haciendo click en el botón corresponiente.

En la **parte central** está la tabla de datos mostrando la página actual, que tendrá la cantidad de registros según se haya seleccionado arriba. 

En la **parte inferior** están: el número de la página que se muestra, la cantidad total de páginas y la cantidad total de registros.

![imagen](https://user-images.githubusercontent.com/51080618/188276244-87cf15dd-06a3-42ed-9c70-3c1701df96e2.png)

El punto de entrada al paginador es la funcion:
```javascript 
builddatatables(data, [[number_of_buttons], [custom_header]]);
```
`data` es el data-set, y es una array de objetos de la forma:
```javascript
data = [
    {
      key 1: 'value 11',
      key 2: 'value 12',
      key 3: 'value 13',
       .
       .
       .
      key m: 'value 1m'
    },
    {
      key 1: 'value 21',
      key 2: 'value 22',
      key 3: 'value 23',
       .
       .
       .
      key m: 'value 2m'
    },
    .
    .
    .
    {
      key 1: 'value n1',
      key 2: 'value n2',
      key 3: 'value n3',
       .
       .
       .
      key m: 'value nm'
    }   
]
```
`number_of_buttons` debería ser entero entre 1 y 10.

`custom_header` debería ser un array con los títulos de la cabecera, tendrá la forma: `['title 1', 'title 2', ... , 'title m']`.

NOTA: Una vez especificado `data`, `number_of_buttons` y `custom_header` son opcionales.

El plug-in dibujará una tabla de la forma:
 
 |  key<sub>1</sub>   |  key<sub>2</sub>   |  key<sub>3</sub>   |.|.|.|  key<sub>m</sub>   |
 |---------|---------|---------|-|-|-|---------|
 | value<sub>11</sub> | value<sub>12</sub> | value<sub>13</sub> |.|.|.| value<sub>1m</sub> |
 | value<sub>21</sub> | value<sub>22</sub> | value<sub>23</sub> |.|.|.| value<sub>2m</sub> |
 |    .    |    .    |    .    |.|.|.|    .    |
 |    .    |    .    |    .    |.|.|.|    .    |
 |    .    |    .    |    .    |.|.|.|    .    |
 | value<sub>n1</sub> | value<sub>n2</sub> | value<sub>n3</sub> |.|.|.| value<sub>nm</sub> |
 |  **key<sub>1</sub>**   |  **key<sub>2</sub>**   |  **key<sub>3</sub>**   |.|.|.|  **key<sub>m</sub>**   |

`m` es el número de títulos de la cabecera de la tabla, que no debería ser mayor a 12. Podrían obtenerse resultados inesperados si `m` es mayor a 12.

`n` es la cantidad de registros a listar por página. Normalmente este valor se elige con el selector, y está limitado a unos cuantos valores por defecto: 10, 15, 20, 50, 100, 500. El listado por defecto tiene una valor de `n = 10`.

NOTA: Desde el enfoque del álgebra, la tabla sería una matriz de `n x m` (table<sub>n x m</sub>), donde `n` son las filas y `m` las columnas.

## Posibles valores de los parámetros

`data`
Arriba ya se especificó el formato para del data-set.

Si a la función `builddatatable()` no le paso el data-set, esta arrojará lo siguiente:

![imagen](https://user-images.githubusercontent.com/51080618/188292340-f026cba8-7a4c-4432-a8aa-3b2060f2b4f7.png)

No habrá botones de navegación ni el selector de registros.

Igual efecto tendrá si le paso un array vacío: `builddatatable([])` o `builddatatable([], 0)`

Si data no es de la forma descripta, los resultados pueden ser inesperados.

`number_of_buttons`
Valor por defecto: `6`.
Si es un número negativo entre -10 y -1, tomará el valor del entero positivo correspondiente.
Si es 0, tomará el valor 1.
Si es mayor que 10, tomará el valor 10.
Si es un decimal mayor que cero y menor a 10, tomará el valor del entero menor.
Si es un decimal mayor a 10, tomará el valor 10.
Si es no es un número, tomará el valor por defecto.

NOTA: De igual modo, el plug-in siempre determina automáticamente la cantidad de botones necesarios según la cantidad de registros. 

`custom_header`
Arriba se especificó el formato para los títulos, si este no se especifica, la funcion `builddatatable()` intentará obtenerlos de las cabeceras de `data`. Las cabeceras son las claves de los objetos.


```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="stylesheet" href="./css/pagination.css">
        <title>Pagination</title>
    </head>
    <body>
        <header>
            <h1>Aplicación para el paginado de datos</h1>
        </header>
        <main>
            <div id="place-for-list"></div>
        </main>
        <footer>
        </footer>
    </body>
</html>
```
