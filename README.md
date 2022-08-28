# Pagination
first approach


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
