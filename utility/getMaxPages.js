function getMaxPages(records_quantity, records_to_show) {

    let MAX_PAGES

    if(Number.isInteger(records_quantity / records_to_show)) {
        MAX_PAGES = records_quantity / records_to_show;
    }
    else {
        MAX_PAGES = Math.floor(records_quantity / records_to_show) + 1;
    }

    return MAX_PAGES
}

export { getMaxPages }