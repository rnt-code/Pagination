function getfinalNumberOfButtons(number_of_buttons) {

    //si lo que ingresa no es un número, entonces toma el valor por defecto = 6
    if(typeof(number_of_buttons) != 'number') {
        
        //valor por defecto
        number_of_buttons = 6;
    }
    else {
        //Si es un número decimal toma el valor absoluto del entero menor
        number_of_buttons = Math.abs(Math.floor(number_of_buttons));
    }

    //Si es cero queda en 1, y si es mayor de 10 queda en 10.
    if(number_of_buttons === 0) {
        number_of_buttons = 1;
    } 
    else if(number_of_buttons > 10){
        number_of_buttons = 10;
    }

    return number_of_buttons
}

export { getfinalNumberOfButtons }