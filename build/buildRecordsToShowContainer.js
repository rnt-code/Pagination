function buildRecordsToShowContainer() {

    //container para el selector
    const hc_records_selector_el = document.getElementById('hc-records-selector');

    const pre1_el = document.createElement('pre')
    pre1_el.id = 'text1'
    hc_records_selector_el.append(pre1_el)
    //pre1.append(`Mostrando `);
    
    const select_el = document.createElement('select');
    select_el.id = 'records-to-show';
    hc_records_selector_el.append(select_el);
    document.getElementById("records-to-show").hidden = true;


    const pre2_el = document.createElement('pre')
    pre2_el.id = 'text2'
    hc_records_selector_el.append(pre2_el);
    //pre2.append(` registros`);
    
}

export { buildRecordsToShowContainer }