function cleanUpDataTableContent() {

    const dataTable = document.getElementById("datatable");
    while(dataTable.firstChild){
        dataTable.removeChild(dataTable.firstChild);
    }
    return false
}

export { cleanUpDataTableContent }