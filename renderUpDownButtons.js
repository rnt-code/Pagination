function renderupdownbuttons() {

    //container para los botones
    const paginate = document.getElementById('paginate');

    //borro lo que haya en el contenedor nav_buttons
    const isbuttons = !!paginate.children[0];
    if(isbuttons) {
        paginate.children[0].remove();
    }

    //creo el botón de avance a la izquierda <<
    const a_down = document.createElement('a');
    a_down.id = 'page-down';
    a_down.innerText = '<<';
    a_down.href = '#';
    paginate.appendChild(a_down);

    //creo el boton de avance a la derecha >>
    const a_up = document.createElement('a');
    a_up.id = 'page-up';
    a_up.innerText = '>>';
    a_up.href = '#';
    paginate.appendChild(a_up);

}
export { renderupdownbuttons }