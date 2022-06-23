import  Carrinho from './carrinho.js';
import  Formulario from './formulario.js';

const loadClassEvent = (className, type, callback) => {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(type, callback, false);
    }
}

window.onload = function(){ 
    Formulario.onlyNumberInput('txtCEP');
    Formulario.onlyNumberInput('txtCPF');

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

    loadClassEvent('btn-danger', 'click', (e) => {
        var validate = Formulario.validate(['txtNome', 'txtDateNascimento', 'txtCPF', 'txtEmail', 'txtPassword', 'txtCEP', 'txtCidade', 'txtBairro', 'txtRua', 'txtNumero']);
        var valueCpf = document.getElementById('txtCPF').value;
        let errCpf = document.getElementById('errorCPF');
        let errData = document.getElementById('errorData');
        let data_nascimento = document.getElementById('txtDateNascimento').value;

        let verifyData = Formulario.calcularIdade(data_nascimento);

        if(!verifyData) {
            errData.style.display = 'Block';
        }else{
            errData.style.display = 'none';
        }

        if(!validate) {
            let modal = document.getElementById('myModal');
            let close = document.getElementById('fechar_modal');
            modal.style.display = 'Block';
            close.addEventListener('click', function(){
                modal.style.display = 'none';
            });
        }
        let verify = Formulario.verifyCpf(valueCpf);

        if(!verify) {
            errCpf.style.display = 'Block';
        }else{
            errCpf.style.display = 'none';
        }

        !validate || !verify || !verifyData ? console.log('nao pode enviar') : console.log('envioooo');

    });
}