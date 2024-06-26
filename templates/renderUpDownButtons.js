function renderUpDownButtons() {

    //container para los botones
    const hc_nav_buttons_el = document.getElementById('hc-nav-buttons');

    //borro lo que haya en el contenedor nav_buttons
    const isbuttons = !!hc_nav_buttons_el.children[0];
    if(isbuttons) {
        hc_nav_buttons_el.children[0].remove();
    }
    
    //creo la lista desordenada (unordered list), class='pagination-keys'
    const ul = document.createElement('ul');
    ul.classList.add('pagination-keys');
    hc_nav_buttons_el.appendChild(ul);

    const pagination_keys = document.querySelector('.pagination-keys');

    /**-------------contenedor botón layer down------------------- */
    const li_layd = document.createElement('li');
    li_layd.classList.add('layer-down');
    pagination_keys.appendChild(li_layd);

    //creo el botón de avance rápido a la izquierda '<<'
    const a_layd = document.createElement('a');
    a_layd.classList.add('pagelink');
    a_layd.innerText = '<<';
    a_layd.href = '#';
    li_layd.appendChild(a_layd);
    /**-------------fin contenedor botón layer down--------------- */

    /**---------------contenedor botón page down------------------ */
    //creo el list item contenedor del link
    const li_prev = document.createElement('li');
    li_prev.classList.add('page-down');
    pagination_keys.appendChild(li_prev);

    //creo el botón de avance a la izquierda '<'
    const a_prev = document.createElement('a');
    a_prev.classList.add('pagelink');
    a_prev.innerText = '<';
    a_prev.href = '#';
    li_prev.appendChild(a_prev);
    /**--------------fin contenedor botón page down--------------- */
    
    /**----------------contenedor botón page up------------------- */
    //creo el último list item
    const li_nxt = document.createElement('li');
    li_nxt.classList.add('page-up');
    pagination_keys.appendChild(li_nxt);

    //creo el boton de avance a la derecha '>'
    const a_nxt = document.createElement('a');
    a_nxt.classList.add('pagelink');
    
    a_nxt.innerText = '>';
    a_nxt.href = '#';
    li_nxt.appendChild(a_nxt);
    /**--------------------fin botón page up---------------------- */

    /**----------------contenedor botón layer up------------------ */
    const li_layu = document.createElement('li');
    li_layu.classList.add('layer-up');
    pagination_keys.appendChild(li_layu);

    //creo el botón de avance rápido a la derecha '>>'
    const a_layu = document.createElement('a');
    a_layu.classList.add('pagelink');
    a_layu.innerText = '>>';
    a_layu.href = '#';
    li_layu.appendChild(a_layu);
    /**---------------fin contenedor botón layer up--------------- */
    return false
}
export { renderUpDownButtons }