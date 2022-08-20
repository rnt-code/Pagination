function tablecontainer() {

    const item3_el = document.getElementById("item3");

    const head_controls = document.createElement('div');
    head_controls.classList.add("container");
    head_controls.id = 'head-controls';
    item3_el.appendChild(head_controls);

    const table_container = document.createElement('div');
    table_container.classList.add("container");
    table_container.id = 'datatable';
    item3_el.appendChild(table_container);

    const foot_controls = document.createElement('div');
    foot_controls.classList.add("container");
    foot_controls.id = 'foot-controls';
    item3_el.appendChild(foot_controls);

    renderhead();
    renderfoot();
    
    function renderhead() {
        head_controls.innerHTML = `
            <div class="dataTables_length" id="example_length">
                <label>Mostrando 
                    <select id="count">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20" selected>20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="300">300</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                    </select> registros
                </label>
            </div>
            <div id="example_filter" class="dataTables_filter">
                <label class="">Buscar:<input type="search" placeholder="" aria-controls="example"></label>
                
            </div>
        `
    }

    function renderfoot() {
        foot_controls.innerHTML = `
            <div id="info"></div>
            <div id="nav-buttons"></div>
        `
    }
}

export { tablecontainer }