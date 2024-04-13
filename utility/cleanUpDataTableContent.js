function cleanUpDataTableContent() {

    const dataTable = document.getElementById("datatable");
    while(dataTable.firstChild){
        dataTable.removeChild(dataTable.firstChild);
    }
}

export { cleanUpDataTableContent }