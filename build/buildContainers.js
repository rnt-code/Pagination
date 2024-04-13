import { cleanUpAppContainer } from '../utility/cleanUpAppContainer.js';

function buildContainers() {

    cleanUpAppContainer();

    const place_for_list = document.getElementById('place-for-list');
    
    //build head-controls container
    const head_controls = document.createElement('div');
    head_controls.id = 'head-controls';
    place_for_list.appendChild(head_controls);
    head_controls.innerHTML =
                            `
                            <div id="hc-records-selector">
                            </div><div id="hc-nav-buttons"></div>
                            `
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
    foot_controls.innerHTML =
                            `
                            <div id="fc-info"></div>
                            <div id="fc-nav-buttons"></div>
                            `
    return false
}

export { buildContainers }