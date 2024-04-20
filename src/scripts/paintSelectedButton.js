function paintSelectedButton(page_number) {

    if(page_number != 0) {
        document.getElementById('hc-nav-buttons').hidden = false;

        const selected_buttton_el = document.querySelector('.selected');
        const button_el = document.getElementById(`${page_number}`);

        if(selected_buttton_el) {
            selected_buttton_el.style.color = 'black';
            selected_buttton_el.classList.remove('selected');
        }
        
        button_el.classList.add('selected');
        button_el.style.color = 'black';
    }
    // else {
    //     //si page = 0, oculta hc-nav-buttons
    //     console.log('estoy paando por acá')
    //     document.getElementById('hc-nav-buttons').hidden = true;
    // }
    return false
}

export { paintSelectedButton }