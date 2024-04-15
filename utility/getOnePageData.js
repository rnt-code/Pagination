function getOnePageData(data, page_number, records_to_show) {

    const start = (page_number - 1) * records_to_show;
    const end = start + records_to_show;
    const one_page_data = data.slice(start, end);

    return one_page_data
}

export { getOnePageData }