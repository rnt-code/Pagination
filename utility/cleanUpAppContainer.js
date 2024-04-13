function cleanUpAppContainer() {

    const place_for_list = document.getElementById("place-for-list");
    while(place_for_list.firstChild){
        place_for_list.removeChild(place_for_list.firstChild);
    }
}

export { cleanUpAppContainer }