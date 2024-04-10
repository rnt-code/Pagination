function paintSelectedButton(page_number) {

    if(page_number != 0) {

        document.getElementById('nav-buttons').hidden = false;

        const selected_button = document.querySelector('.selected');
        const button = document.getElementById(page_number);

        if(selected_button) {
            selected_button.style.color = 'black';
            selected_button.classList.remove('selected');
        }
        
        button.classList.add('selected');
        button.style.color = 'black';
    }
    else {
        //si page = 0, oculta nav-buttons
        document.getElementById('nav-buttons').hidden = true;
    }
}

export { paintSelectedButton }