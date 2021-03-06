const getusers = () => {
  if(localStorage.getItem('users') == null ){
      localStorage.setItem('users', JSON.stringify([]))
  }

  return JSON.parse(localStorage.getItem('users'));
}

const addUser = (user) => {   
  if(localStorage.getItem('users') == null ){
      localStorage.setItem('users', JSON.stringify([]))
  }
  if(user != null){
      let users = JSON.parse(localStorage.getItem('users'));
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users))
  }
};

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
  if(input){
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
}

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const calcularIdade = (data_nascimento) => {
  var nascimento = data_nascimento.split('-').map(Number);
  // nascimento[1] = String(parseInt(nascimento[1]) - 1);
  // nascimento[0] = String(parseInt(nascimento[0]) + 18);
  var actualDate = new Date();
  var birthDate = new Date(nascimento[0] + 18, nascimento[1] - 1, nascimento[2], "0", "0", "0");

  if(birthDate <= actualDate){
    return true;
  }else {
    return false;
  }

}

const verifyCpf = (strCPF) => {
  var Soma;
  var Resto;
  Soma = 0;
  if (['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'].includes(strCPF)) return false;

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

const converterEstados = (val) => {
	var data;

	switch (val.toUpperCase()) {
		/* UFs */
		case "AC" :	data = "Acre";					break;
		case "AL" :	data = "Alagoas";				break;
		case "AM" :	data = "Amazonas";				break;
		case "AP" :	data = "Amap??";					break;
		case "BA" :	data = "Bahia";					break;
		case "CE" :	data = "Cear??";					break;
		case "DF" :	data = "Distrito Federal";		break;
		case "ES" :	data = "Esp??rito Santo";		break;
		case "GO" :	data = "Goi??s";					break;
		case "MA" :	data = "Maranh??o";				break;
		case "MG" :	data = "Minas Gerais";			break;
		case "MS" :	data = "Mato Grosso do Sul";	break;
		case "MT" :	data = "Mato Grosso";			break;
		case "PA" :	data = "Par??";					break;
		case "PB" :	data = "Para??ba";				break;
		case "PE" :	data = "Pernambuco";			break;
		case "PI" :	data = "Piau??";					break;
		case "PR" :	data = "Paran??";				break;
		case "RJ" :	data = "Rio de Janeiro";		break;
		case "RN" :	data = "Rio Grande do Norte";	break;
		case "RO" :	data = "Rond??nia";				break;
		case "RR" :	data = "Roraima";				break;
		case "RS" :	data = "Rio Grande do Sul";		break;
		case "SC" :	data = "Santa Catarina";		break;
		case "SE" :	data = "Sergipe";				break;
		case "SP" :	data = "S??o Paulo";				break;
		case "TO" :	data = "Tocant??ns";				break;
		
		/* Estados */
		case "ACRE" :					data = "AC";	break;
		case "ALAGOAS" :				data = "AL";	break;
		case "AMAZONAS" :				data = "AM";	break;
		case "AMAP??" :					data = "AP";	break;
		case "BAHIA" :					data = "BA";	break;
		case "CEAR??" :					data = "CE";	break;
		case "DISTRITO FEDERAL" :		data = "DF";	break;
		case "ESP??RITO SANTO" :			data = "ES";	break;
		case "GOI??S" :					data = "GO";	break;
		case "MARANH??O" :				data = "MA";	break;
		case "MINAS GERAIS" :			data = "MG";	break;
		case "MATO GROSSO DO SUL" :		data = "MS";	break;
		case "MATO GROSSO" :			data = "MT";	break;
		case "PAR??" :					data = "PA";	break;
		case "PARA??BA" :				data = "PB";	break;
		case "PERNAMBUCO" :				data = "PE";	break;
		case "PIAU??" :					data = "PI";	break;
		case "PARAN??" :					data = "PR";	break;
		case "RIO DE JANEIRO" :			data = "RJ";	break;
		case "RIO GRANDE DO NORTE" :	data = "RN";	break;
		case "ROND??NIA" : 				data = "RO";	break;
		case "RORAIMA" :				data = "RR";	break;
		case "RIO GRANDE DO SUL" :		data = "RS";	break;
		case "SANTA CATARINA" :			data = "SC";	break;
		case "SERGIPE" :				data = "SE";	break;
		case "S??O PAULO" :				data = "SP";	break;
		case "TOCANT??NS" :				data = "TO";	break;
	}

	return data;
};

const setEndereco = (data) => {
  document.getElementById('txtRua').disabled = false;
  document.getElementById('txtUf').disabled = false;
  document.getElementById('txtBairro').disabled = false;
  document.getElementById('txtCidade').disabled = false;

  document.getElementById('txtRua').value = data.logradouro || '';
  document.getElementById('txtUf').value = data.uf ? converterEstados(data.uf) : '';
  
  document.getElementById('txtBairro').value = data.bairro || '';
  document.getElementById('txtCidade').value = data.localidade || '';
}

const setEnderecoEndDisabled = (data) => {
  setEndereco(data);

  document.getElementById('txtRua').disabled = data.logradouro ?? true;
  document.getElementById('txtUf').disabled = data.uf ?? true;
  document.getElementById('txtBairro').disabled = data.bairro ?? true;
  document.getElementById('txtCidade').disabled = data.cidade ?? true;

}

export default {
  validate,
  onlyNumberInput,
  verifyCpf,
  calcularIdade,
  validateEmail,
  converterEstados,
  setEndereco,
  setEnderecoEndDisabled,
  getusers,
  addUser,
};