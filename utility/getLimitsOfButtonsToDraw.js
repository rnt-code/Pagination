function getLimitsOfButtonsToDraw(page_number, MAX_PAGES, number_of_buttons) {

    let starting_at
    let ending_in

    if(number_of_buttons >= MAX_PAGES) {
        starting_at = page_number; //page_number =  1
        ending_in = MAX_PAGES;
    }
    else {
        starting_at = page_number;
        ending_in = number_of_buttons;
    }

    return [starting_at, ending_in]
}

export { getLimitsOfButtonsToDraw }