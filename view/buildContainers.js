function buildContainers() {

    const exist = !!document.getElementById("place-for-list");

    if(exist) {
        const place_for_list = document.getElementById("place-for-list");

        while(place_for_list.firstChild){
            place_for_list.removeChild(place_for_list.firstChild);
        }

        //build head-controls container
        const head_controls = document.createElement('div');
        head_controls.id = 'head-controls';
        place_for_list.appendChild(head_controls);
        head_controls.hidden = false;

        //build top-metrics container
        const top_metrics_container = document.createElement('div')
        top_metrics_container.id = 'top-info'
        const label_top = document.createElement('label')
        label_top.id = 'metrics-top'
        top_metrics_container.appendChild(label_top)
        place_for_list.appendChild(top_metrics_container)

        //build datatable container
        const table_container = document.createElement('div');
        table_container.style = 'overflow-x:auto';
        table_container.id = 'datatable';
        place_for_list.appendChild(table_container);

        //build bottom-metrics container
        const bottom_metrics_container = document.createElement('div')
        bottom_metrics_container.id = 'bottom-info'
        const label_bottom = document.createElement('label')
        label_bottom.id = 'metrics-bottom'
        bottom_metrics_container.appendChild(label_bottom)
        place_for_list.appendChild(bottom_metrics_container)

        //build foot-controls container
        const foot_controls = document.createElement('div');
        foot_controls.id = 'foot-controls';
        place_for_list.appendChild(foot_controls);
    }
    else {
        console.error('No existe el elemento html para desplegar la lista. Ver documentación')
    }
}

export { buildContainers }