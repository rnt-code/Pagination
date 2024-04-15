function buildRecordsToShowContainer() {

    const hc_records_selector_el = document.getElementById('hc-records');
    const label = document.createElement('label');
    hc_records_selector_el.appendChild(label)
    label.id = 'hc-records-selector'
}

export { buildRecordsToShowContainer }