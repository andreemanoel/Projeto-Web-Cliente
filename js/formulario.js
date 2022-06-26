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

const converterEstados = (val) => {
	var data;

	switch (val.toUpperCase()) {
		/* UFs */
		case "AC" :	data = "Acre";					break;
		case "AL" :	data = "Alagoas";				break;
		case "AM" :	data = "Amazonas";				break;
		case "AP" :	data = "Amapá";					break;
		case "BA" :	data = "Bahia";					break;
		case "CE" :	data = "Ceará";					break;
		case "DF" :	data = "Distrito Federal";		break;
		case "ES" :	data = "Espírito Santo";		break;
		case "GO" :	data = "Goiás";					break;
		case "MA" :	data = "Maranhão";				break;
		case "MG" :	data = "Minas Gerais";			break;
		case "MS" :	data = "Mato Grosso do Sul";	break;
		case "MT" :	data = "Mato Grosso";			break;
		case "PA" :	data = "Pará";					break;
		case "PB" :	data = "Paraíba";				break;
		case "PE" :	data = "Pernambuco";			break;
		case "PI" :	data = "Piauí";					break;
		case "PR" :	data = "Paraná";				break;
		case "RJ" :	data = "Rio de Janeiro";		break;
		case "RN" :	data = "Rio Grande do Norte";	break;
		case "RO" :	data = "Rondônia";				break;
		case "RR" :	data = "Roraima";				break;
		case "RS" :	data = "Rio Grande do Sul";		break;
		case "SC" :	data = "Santa Catarina";		break;
		case "SE" :	data = "Sergipe";				break;
		case "SP" :	data = "São Paulo";				break;
		case "TO" :	data = "Tocantíns";				break;
		
		/* Estados */
		case "ACRE" :					data = "AC";	break;
		case "ALAGOAS" :				data = "AL";	break;
		case "AMAZONAS" :				data = "AM";	break;
		case "AMAPÁ" :					data = "AP";	break;
		case "BAHIA" :					data = "BA";	break;
		case "CEARÁ" :					data = "CE";	break;
		case "DISTRITO FEDERAL" :		data = "DF";	break;
		case "ESPÍRITO SANTO" :			data = "ES";	break;
		case "GOIÁS" :					data = "GO";	break;
		case "MARANHÃO" :				data = "MA";	break;
		case "MINAS GERAIS" :			data = "MG";	break;
		case "MATO GROSSO DO SUL" :		data = "MS";	break;
		case "MATO GROSSO" :			data = "MT";	break;
		case "PARÁ" :					data = "PA";	break;
		case "PARAÍBA" :				data = "PB";	break;
		case "PERNAMBUCO" :				data = "PE";	break;
		case "PIAUÍ" :					data = "PI";	break;
		case "PARANÁ" :					data = "PR";	break;
		case "RIO DE JANEIRO" :			data = "RJ";	break;
		case "RIO GRANDE DO NORTE" :	data = "RN";	break;
		case "RONDÔNIA" : 				data = "RO";	break;
		case "RORAIMA" :				data = "RR";	break;
		case "RIO GRANDE DO SUL" :		data = "RS";	break;
		case "SANTA CATARINA" :			data = "SC";	break;
		case "SERGIPE" :				data = "SE";	break;
		case "SÃO PAULO" :				data = "SP";	break;
		case "TOCANTÍNS" :				data = "TO";	break;
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