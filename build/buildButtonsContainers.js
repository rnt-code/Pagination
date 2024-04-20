function buildButtonsContainer() {

    //container para los botones
    const hc_nav_buttons = document.getElementById('hc-nav-buttons');

    //borro lo que haya en el contenedor nav_buttons
    const isbuttons = !!hc_nav_buttons.children[0];
    if(isbuttons) {
        hc_nav_buttons.children[0].remove();
    }
    
    //creo la lista desordenada (unordered list), class='pagination-keys'
    const ul = document.createElement('ul');
    ul.classList.add('pagination-keys');
    hc_nav_buttons.appendChild(ul);

    const pagination_keys = document.querySelector('.pagination-keys');

    /**-------------contenedor botón layer down------------------- */
    const li_layd = document.createElement('li');
    li_layd.classList.add('layer-down');
    pagination_keys.appendChild(li_layd);
    /**-------------fin contenedor botón layer down--------------- */

    /**---------------contenedor botón page down------------------ */
    //creo el list item contenedor del link
    const li_prev = document.createElement('li');
    li_prev.classList.add('page-down');
    pagination_keys.appendChild(li_prev);
    /**--------------fin contenedor botón page down--------------- */
    
    /**----------------contenedor botón page up------------------- */
    //creo el último list item
    const li_nxt = document.createElement('li');
    li_nxt.classList.add('page-up');
    pagination_keys.appendChild(li_nxt);

    //creo el boton de avance a la derecha '>'
    const a_nxt = document.createElement('a');
    a_nxt.classList.add('pagelink');
    /**--------------------fin botón page up---------------------- */

    /**----------------contenedor botón layer up------------------ */
    const li_layu = document.createElement('li');
    li_layu.classList.add('layer-up');
    pagination_keys.appendChild(li_layu);
    /**---------------fin contenedor botón layer up--------------- */
    return false
}
export { buildButtonsContainer }