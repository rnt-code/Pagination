function getLimitsOfButtonsToDraw(page_number, MAX_PAGES, number_of_buttons) {

    let starting_at
    let ending_in

    if(number_of_buttons >= MAX_PAGES) {
        starting_at = page_number;
        ending_in = MAX_PAGES;
    }
    else {
        starting_at = page_number;
        ending_in = number_of_buttons;
    }

    number_of_buttons = ending_in - starting_at + 1
    return {
        'starting_at': starting_at, 
        'ending_in': ending_in,
        'number_of_buttons': number_of_buttons
    }
}

export { getLimitsOfButtonsToDraw }