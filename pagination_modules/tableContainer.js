function tablecontainer(datalength) {

    const item3_el = document.getElementById("item3");

    const head_controls = document.createElement('div');
    head_controls.classList.add("container"); //Bootstrap class
    head_controls.id = 'head-controls';
    item3_el.appendChild(head_controls);
    head_controls.hidden = false;

    if(datalength === 0 ) {
        head_controls.hidden = true;
    }

    const table_container = document.createElement('div');
    table_container.style = 'overflow-x:auto';
    table_container.classList.add("container"); //Bootstrap class
    table_container.id = 'datatable';
    item3_el.appendChild(table_container);

    const foot_controls = document.createElement('div');
    foot_controls.classList.add("container"); //Bootstrap class
    foot_controls.id = 'foot-controls';
    item3_el.appendChild(foot_controls);

    renderhead();
    renderfoot();
    
    function renderhead() {
        head_controls.innerHTML = `
            <div id="records-length">
                <label>Mostrando 
                    <select id="count">
                        <option value="5">5</option>
                        <option value="10" selected>10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="300">300</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                    </select> registros
                </label>
            </div>
            <div id="nav-buttons">
            <!--
            <div id="search_filter">
                <label class="">Buscar:<input type="search" placeholder="ingrese parametro" aria-controls="search"></label>
            </div>
            -->
        `
    }

    function renderfoot() {
        foot_controls.innerHTML = `
            <div id="info">foot controls</div>
            <!--<div id="nav-buttons"></div>-->
        `
    }
}

export { tablecontainer }