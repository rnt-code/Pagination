function cleanUpDataTableContent() {

    const table_body_el = document.getElementById("table-body");
    while(table_body_el.firstChild){
        table_body_el.removeChild(table_body_el.firstChild);
    }
    return false
}

export { cleanUpDataTableContent }