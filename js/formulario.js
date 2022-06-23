const validate = (elements) => {
  for(let el of elements){
    if(['', null, undefined].includes(document.getElementById(el).value.trim())){
      return false;
    }
  }
  return true;
}

const onlyNumberInput = (id_element) => {
  var input = document.getElementById(id_element);
  input.addEventListener('keypress', (e) => {
    var key = e.keyCode || e.which;
    key = String.fromCharCode( key );
    var regex = /^[0-9.]+$/;
    if( !regex.test(key) ) {
      e.returnValue = false;
      if(e.preventDefault) e.preventDefault();
    }
  })
}

const calcularIdade = (data_nascimento) => {
  var nascimento = data_nascimento.split('-');
  nascimento[1] = String(parseInt(nascimento[1]) - 1);
  var actualDate = new Date();
  var birthDate = new Date(nascimento[0], nascimento[1], nascimento[2], "0", "0", "0");

  var actualMili = actualDate.getTime();
  var selectMili = birthDate.getTime();

  var timeToTest= 1000 * 60 * 60 * 24 * 365 * 18; 

  //faz a diferença entre as datas e o tempo calculado
  if( ( actualMili -  selectMili) >= timeToTest){
    return true
  }
  else{
    return false;
  }
}

const verifyCpf = (strCPF) => {
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
  return true;
}

export default {
  validate,
  onlyNumberInput,
  verifyCpf,
  calcularIdade
};