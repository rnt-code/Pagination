function getLimitsOfButtonsToDraw(page_number, MAX_PAGES, number_of_buttons) {

    let page_starting_at
    let page_ending_in

    if(number_of_buttons >= MAX_PAGES) {
        page_starting_at = page_number; //page_number =  1
        page_ending_in = MAX_PAGES;
    }
    else {
        page_starting_at = page_number;
        page_ending_in = number_of_buttons;
    }

    let res = [page_starting_at, page_ending_in]
    return res
}

export { getLimitsOfButtonsToDraw }