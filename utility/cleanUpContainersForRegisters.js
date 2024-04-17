function cleanUpContainersForRegisters() {

    //limpio el contendor de botones
    const pagei_el = document.querySelector(".pagination-keys");
    while(pagei_el.firstChild){
        pagei_el.removeChild(pagei_el.firstChild);
    }

    const top_info_el = document.getElementById("top-info");
    while(top_info_el.firstChild){
        top_info_el.removeChild(top_info_el.firstChild);
    }

    const table_body_el = document.getElementById("table-body");
    while(table_body_el.firstChild){
        table_body_el.removeChild(table_body_el.firstChild);
    }
    const bottom_info_el = document.getElementById("bottom-info");
    while(bottom_info_el.firstChild){
        bottom_info_el.removeChild(bottom_info_el.firstChild);
    }

    return false
}

export { cleanUpContainersForRegisters }