function getMaxLayers(number_of_buttons, MAX_PAGES) {

    let MAX_LAYERS
    if(Number.isInteger(MAX_PAGES / number_of_buttons)) {
        MAX_LAYERS = MAX_PAGES / number_of_buttons;
    }
    else {
        MAX_LAYERS = Math.floor(MAX_PAGES / number_of_buttons) + 1;
    }

    return MAX_LAYERS
}

export { getMaxLayers }