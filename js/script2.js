import  Formulario from './formulario.js';

const loadClassEvent = (className, type, callback) => {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(type, callback, false);
    }
}

const loadIdEvent = (idName, type, callback) => {
    var element = document.getElementById(idName);
    element.addEventListener(type, callback, false);
}

window.onload = function(){ 
    var verifyEmail;

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

    loadClassEvent('btn-danger', 'click', (e) => {
        let validate = Formulario.validate(['txtNome', 'txtEmail', 'txtMsg','assunto']);
        let success = document.getElementById('success');

        if(!validate) {
            let modal = document.getElementById('myModal');
            let close = document.getElementById('fechar_modal');
            modal.style.display = 'Block';
            close.addEventListener('click', function(){
                modal.style.display = 'none';
            });
        }
        if(!validate || !verifyEmail) {
            console.log('nao pode enviar')
        }else {
            document.getElementById('txtNome').value = '';
            document.getElementById('txtEmail').value = '';
            document.getElementById('txtMsg').value = '';
            document.getElementById('assunto').value = '';
            success.style.display = 'block';
        }
    });
}