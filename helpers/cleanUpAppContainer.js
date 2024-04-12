function cleanUpAppContainer() {

    const place_for_list = document.getElementById('place-for-list')
    const exist = !!place_for_list

    if(exist) {
        const place_for_list = document.getElementById("place-for-list");
        while(place_for_list.firstChild){
            place_for_list.removeChild(place_for_list.firstChild);
        }
    }
    else {
        //**No se pudo limpiar el esqueleto para la app */
        console.error('No existe el elemento html para desplegar la lista. Ver documentación')
    }

}

export { cleanUpAppContainer }