const getAllcars = () => {
  if(localStorage.getItem('allCarros') == null ){
      localStorage.setItem('allCarros', JSON.stringify([]))
  }

  return JSON.parse(localStorage.getItem('allCarros'));
}

const setAllcars = () => {
  let data = [{
    "id":"1",
    "name":"Lamborghini Huracán",
    "valor":"80.000,00",
    "img":"http://127.0.0.1:8080/img/carro_1.jpg",
    "qtd":1,
    "description": "Lamborghini Huracán é um dos melhores da categoria"
    },
    {
    "id":"2",
    "name":"Fiat 147",
    "valor":"180.000,00",
    "img":"http://127.0.0.1:8080/img/carro_2.jpg",
    "qtd":1,
    "description": "Fiat 147 é um dos carros mais potentes da categoria"
    },
    {
    "id":"3",
    "name":"Gol Quadrado 92",
    "valor":"250.000,00",
    "img":"http://127.0.0.1:8080/img/carro_3.jpg",
    "qtd":1,
    "description": "Gol Quadrado 92 é um carro super econômico"
    },
    {
    "id":"4",
    "name":"Opala",
    "valor":"13.000,00",
    "img":"http://127.0.0.1:8080/img/carro_4.jpg",
    "qtd":1,
    "description": "Opala é um carro com conforto e super econômico"
    },
    {
    "id":"5",
    "name":"Fusca",
    "valor":"30.000,00",
    "img":"http://127.0.0.1:8080/img/carro_5.jpg",
    "qtd":1,
    "description": "Fusca é um carro super seguro e econômico"
    },
    {
    "id":"6",
    "name":"Parati Surf 99",
    "valor":"15.000,00",
    "img":"http://127.0.0.1:8080/img/carro_6.jpg",
    "qtd":1,
    "description": "Parati Surf é um carro com super conforto e um dos melhores da categoria"
    },
    {
    "id":"7",
    "name":"Tipo 33 Stradale (1967-1969) - Alfa Romeo",
    "valor":"59.000,00",
    "img":"http://127.0.0.1:8080/img/carro_7.jpg",
    "qtd":1,
    "description": "Tipo 33 Stradale (1967-1969) - Alfa Romeo é um carro lindo por dentro e fora"
    },
    {
    "id":"8",
    "name":"Peugeot Não identificado",
    "valor":"9.000,00",
    "img":"http://127.0.0.1:8080/img/carro_8.jpg",
    "qtd":1,
    "description": "Peugeot Não identificado é um carro ótimo de mecânica"
    },
    {
    "id":"9",
    "name":"Caçamba car Renault",
    "valor":"25.000,00",
    "img":"http://127.0.0.1:8080/img/carro_9.jpg",
    "qtd":1,
    "description": "Caçamba car Renault é um carro super espaçoso"
    },
    {
    "id":"10",
    "name":"Uno 4 Portas - Pneu furado",
    "valor":"5.000,00",
    "img":"http://127.0.0.1:8080/img/carro_10.jpg",
    "qtd":1,
    "description": "Uno 4 Portas - Pneu furado é um carro super elegante e com ótimo conforto"
    },
    {
    "id":"11",
    "name":"Skyline - R38",
    "valor":"26.000,00",
    "img":"http://127.0.0.1:8080/img/carro_11.jpg",
    "qtd":1,
    "description": "Skyline - R38 é um dos mais lindos da categoria"
    },
    {
    "id":"12",
    "name":"350z",
    "valor":"210.000,00",
    "img":"http://127.0.0.1:8080/img/carro_12.jpg",
    "qtd":1,
    "description": "350z é um carro super potente pegando até 120km/h"
    },
    {
    "id":"13",
    "name":"Lancer Evolution",
    "valor":"45.000,00",
    "img":"http://127.0.0.1:8080/img/carro_13.jpg",
    "qtd":1,
    "description": "Lancer Evolution é um carro super rápido pegando até 450km/h"
    },
    {
    "id":"14",
    "name":"Alpha Romeo Vermelhão 2020",
    "valor":"100.000,00",
    "img":"http://127.0.0.1:8080/img/carro_14.jpg",
    "qtd":1,
    "description": "Alpha Romeo Vermelhão 2020 tem uma cor espetacular"
    },
    {
    "id":"15",
    "name":"Alpha Romeo 1990",
    "valor":"20.000,00",
    "img":"http://127.0.0.1:8080/img/carro_15.jpg",
    "qtd":1,
    "description": "Alpha Romeo 1990 carro dificil de estragar"
    }]
  localStorage.setItem('allCarros', JSON.stringify(data));
}

const renderAlfabetica = (tipo) => {
  const carros = getAllcars();
  let order;
  if(tipo == 'nome'){
    order = carros.sort(function(a,b){
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  }else if(tipo == 'menor'){
    order = carros.sort(function(a,b){
      let valUm = parseFloat((a.valor).replace(/[^0-9,]*/g, '').replace(',', '.'));
      let valDois = parseFloat((b.valor).replace(/[^0-9,]*/g, '').replace(',', '.'));
      return valUm < valDois ? -1 : valUm > valDois ? 1 : 0;
    });
  }else {
    order = carros.sort(function(a,b){
      let valUm = parseFloat((a.valor).replace(/[^0-9,]*/g, '').replace(',', '.'));
      let valDois = parseFloat((b.valor).replace(/[^0-9,]*/g, '').replace(',', '.'));
      return valDois < valUm ? -1 : valDois > valUm ? 1 : 0;
    });
  }

  var html = ``

  for(let car of order){
    html += `
      <div class="col-12 col-sm-6 col-md-4">
        <div class="card text-center bg-light">
            <a href="#" class="detalhes">
                <img width="300" height="200" src="../img/carro_${car.id}.jpg" class="card-img-top">
            </a>
            <div class="card-header">
                R$ ${car.valor}
            </div>
            <div class="card-body">
                <h5 class="card-title truncar-1l">${car.name}</h5>
            </div>
            <div class="card-footer add-car">
                <a class="btn btn-danger mt-2 d-block" data-name="${car.name}" data-price="${car.valor}" data-id="${car.id}" data-description="${car.description}">
                    Adicionar ao Carrinho
                </a>
            </div>
        </div>
      </div>
    `
  }

  let content = document.getElementById('contentAllCarros');
  if(content){
    content.innerHTML = html;
  }
}

export default {
  getAllcars,
  setAllcars,
  renderAlfabetica
};