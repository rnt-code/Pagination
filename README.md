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
Mi plug-in de momento solo ofrece el paginado, quedando para más adelante el desarrollo de la búsqueda parameétrica y la ordenación por columnas.
En la image de abajo se puede observar el resultado de la paginación para una base de datos de ejemplo.
![imagen](https://user-images.githubusercontent.com/51080618/188276244-87cf15dd-06a3-42ed-9c70-3c1701df96e2.png)






builddatatable(): 
                     Arrojará 'No data found', 
                     Se ocultará el contendor de botones, 
                     Debería ocultarse el selector de registros a listar
                     También muestrará 'Página 0 de 0. Registros totales: 0'.

builddatatable([]): 
                     Idem al anterior.

builddatatable([],0):
                     Idem al anterior.

builddatatable(data):
                     Si data = [], arrojará un resultado idem al anterior.
                     Si data no es array vacío, debería ser un array de (objetos) json de la forma siguiente: 
                     [
                          {
                              'key1': value11,
                              'key2': value12,
                              'key3': value13,
                               .
                               .
                               .
                              'keym': value1m
                          },
                          {
                              'key1': value21,
                              'key2': value22,
                              'key3': value23,
                               .
                               .
                               .
                              'keym': value2m
                          },
                          .
                          .
                          .
                          {
                              'key1': valuen1,
                              'key2': valuen2,
                              'key3': valuen3,
                               .
                               .
                               .
                              'keym': valuenm
                          }   
                     ]
                     El plug-in dibujará una tabla de la forma:
 
                     |  key1   |  key2   |  key3   | . . . |  keym   |
                     |-----------------------------------------------|
                     | value11 | value12 | value13 | . . . | value1m |
                     | value21 | value22 | value23 | . . . | value2m |
                     .         .         .         .       .         .
                     .         .         .         .       .         .
                     .         .         .         .       .         .
                     | valuen1 | valuen2 | valuen3 | . . . | valuenm |
                     |-----------------------------------------------|
                     |  key1   |  key2   |  key3   | . . . |  keym   |
                     -------------------------------------------------
 
                     Dibujará 6 botones de navegación, con botones para avanace por página y avance rápido 
                     cada 6 páginas. La teclas de izq y der del teclado también sirven para el avance por 
                     página.
                      
                     NOTA: Si data no es de la forma descripta, los resultados pueden ser inesperados.
 
builddatatable(data, number_of_buttons):
                     
                      number_of_buttons, debería ser cualquier número entero entre 1 y 10. 
                      Si no se especifica, por defecto, es 6. 
                      Si es un número negativo entre -10 y -1, tomará el valor del entero positivo correspondiente.
                      Si es 0, tomará el valor 1.
                      Si es mayor que 10, tomará el valor 10.
                      Si es un decimal mayor que cero y menor a 10, tomará el valor del entero menor.
                      Si es un decimal mayor a 10, tomará el valor 10.
                      Si es no es un número, tomará el valor por defecto.
