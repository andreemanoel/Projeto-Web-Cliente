import  Carrinho from './carrinho.js';
import  Formulario from './formulario.js';

const loadClassEvent = (className, type, callback) => {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(type, callback, false);
    }
}

const loadIdEvent = (idName, type, callback) => {
    var element = document.getElementById(idName);
    if(element){
        element.addEventListener(type, callback, false);
    }
}

window.onload = function(){ 
    Formulario.onlyNumberInput('txtCEP');
    Formulario.onlyNumberInput('txtCPF');

    var verifyPassword;
    var verifyEmail;

    loadIdEvent('txtPassword', 'input', function(e) {
        let errPassword = document.getElementById('errorPassword');
        if(this.value.length < 8) {
            errPassword.style.display = 'block';
            verifyPassword = false;
        }else {
            errPassword.style.display = 'none';
            verifyPassword = true;
        }
    })

    loadIdEvent('txtCEP', 'input', function(e) {
        var xhr = new XMLHttpRequest();
        if(this.value.length >= 8){
            try {
                xhr.open("GET", `https://viacep.com.br/ws/${this.value}/json`, true);

                xhr.onload = function (e) {
                    if (xhr.readyState === 4) {
                      if (xhr.status === 200) {
                        let data = JSON.parse(xhr.response);

                        if(data.erro != "true") {
                            Formulario.setEnderecoEndDisabled(data);
                        }else {
                            Formulario.setEndereco({});
                        }
                      }
                    }
                  };
                  xhr.send(null);
                } catch (e) {
                console.log(e);
            }
        }else {
            Formulario.setEndereco({});
        }
    })

    loadIdEvent('txtEmail', 'input', function(e) {
        console.log(this.value)
        let errorEmail = document.getElementById('errorEmail');
        verifyEmail = Formulario.validateEmail(this.value);
        if(!verifyEmail) {
            errorEmail.style.display = 'block';
        }else {
            errorEmail.style.display = 'none';
        }
    })

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
                valor: newCar.price,
                img: e.path[2].children[0].children[0].src,
                qtd: 1,
            });
        }
    });

    loadClassEvent('enviar-form', 'click', (e) => {
        let validate = Formulario.validate(['txtNome', 'txtUf', 'txtDateNascimento', 'txtCPF', 'txtEmail', 'txtPassword', 'txtCEP', 'txtCidade', 'txtBairro', 'txtRua', 'txtNumero']);
        let valueCpf = document.getElementById('txtCPF').value;
        let errCpf = document.getElementById('errorCPF');
        let errData = document.getElementById('errorData');
        let data_nascimento = document.getElementById('txtDateNascimento').value;
        let success = document.getElementById('success');

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

        if(!validate || !verify || !verifyData || !verifyPassword || !verifyEmail) {
            console.log('nao pode enviar')
        }else {
            document.getElementById('txtNome').value = '';
            document.getElementById('txtDateNascimento').value = '';
            document.getElementById('txtEmail').value = '';
            document.getElementById('txtCPF').value = '';
            document.getElementById('txtPassword').value = '';
            document.getElementById('txtCEP').value = '';
            document.getElementById('txtCidade').value = '';
            document.getElementById('txtBairro').value = '';
            document.getElementById('txtRua').value = '';
            document.getElementById('txtNumero').value = '';
            success.style.display = 'block';
        }

    });
}