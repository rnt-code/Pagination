function paintSelectedButton(page_number) {

    console.log('paint button: ', page_number)
    if(page_number != 0) {
        document.getElementById('hc-nav-buttons').hidden = false;

        const selected_button = document.querySelector('.selected');
        const button_el = document.getElementById(`${page_number}`);

        if(selected_button) {
            selected_button.style.color = 'black';
            selected_button.classList.remove('selected');
        }
        
        button_el.classList.add('selected');
        button_el.style.color = 'black';
    }
    else {
        //si page = 0, oculta nav-buttons
        document.getElementById('hc-nav-buttons').hidden = true;
    }
    return false
}

export { paintSelectedButton }