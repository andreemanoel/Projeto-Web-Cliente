import  Carrinho from './carrinho.js';

const loadClassEvent = (className, type, callback) => {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(type, callback, false);
    }
}

window.onload = function(){ 
    console.log('oie')
    loadClassEvent('add-car', 'click', (e) => {
        let newCar = e.srcElement.dataset;
        let cars   = Carrinho.getCars();
        let exists = false;
        for(let car of cars){
            if(car.name == newCar.name){
                exists = true;    
            }
        }
        if(!exists){
            Carrinho.addCar({
                name: newCar.name,
                valor: newCar.price
            });
        }
    });
}