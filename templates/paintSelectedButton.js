function paintSelectedButton(page_number) {

    if(page_number != 0) {
        document.getElementById('hc-nav-buttons').hidden = false;

        const selected_buttton_el = document.querySelector('.selected');
        const button_el = document.getElementById(`${page_number}`);

        if(selected_buttton_el) {
            selected_buttton_el.style.color = 'black';
            selected_buttton_el.classList.remove('selected');
        }
        
        button_el.style.color = 'black';
        button_el.classList.add('selected');
    }
}

export { paintSelectedButton }