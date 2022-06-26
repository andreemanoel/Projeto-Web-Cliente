const getCars = () => {
    if(localStorage.getItem('carros') == null ){
        localStorage.setItem('carros', JSON.stringify([]))
    }

    return JSON.parse(localStorage.getItem('carros'));
}

const addCar = (car) => {   
    if(localStorage.getItem('carros') == null ){
        localStorage.setItem('carros', JSON.stringify([]))
    }
    if(car != null){
        let cars = JSON.parse(localStorage.getItem('carros'));
        cars.push(car);
        localStorage.setItem('carros', JSON.stringify(cars))
    }
};

const renderCarrinho = () => {
    const carros = getCars();
    let total = 0;
    var html = ``
    for(let car of carros){
        total += parseFloat(car.valor.replace(/[^0-9,]*/g, '').replace(',', '.'));
        html += `
        <li class="list-group-item py-3 carros">
            <div class="row g-3">
                <div class="col-4 col-md-3 col-lg-2">
                    <a href="#">
                        <img src="${car.img}" class="img-thumbnail">
                    </a>
                </div>
                <div class="col-8 col-md-9 col-lg-7 col-xl-8 text-left align-self-center">
                    <h4>
                        <b><a href="#" class="text-decoration-none text-danger">
                            ${car.name}</a></b>
                    </h4>
                </div>
                <div
                    class="col-6 offset-6 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-0 col-xl-2 align-self-center mt-3">
                    <div class="input-group" data-id="${car.id}">
                        <button class="btn btn-outline-dark btn-sm sub" type="button">
                            -
                        </button>
                        <input type="number" class="form-control text-center border-dark inputQtd" disabled value="1">
                        <button class="btn btn-outline-dark btn-sm add" type="button">
                            +
                        </button>
                    </div>
                    <div class="text-end mt-2">
                        <span class="text-dark valor">Valor: R$ ${car.valor}</span>
                    </div>
                </div>
            </div>
        </li>`
    }

    document.getElementById('contentCarros').innerHTML = html + document.getElementById('contentCarros').innerHTML;
    document.getElementById('contentTotal').innerHTML = `Valor Total: R$ ${total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;

    let adds = document.getElementsByClassName('add');
    let subs = document.getElementsByClassName('sub');

    for(var i=0; i<adds.length; i++) {
		adds[i].addEventListener("click", function() {
            calculoTotal(this.parentNode, '+');
        });
    }

    for(var i=0; i<subs.length; i++) {
		subs[i].addEventListener("click", function() {
            calculoTotal(this.parentNode, '-');
        });
    }
}

const resetValorTotal = () => {
    let valorTotal = document.getElementById("contentTotal").textContent;
    document.getElementById('contentTotal').innerHTML = valorTotal;
    let btn = document.getElementById('btnCupom');
    let valorDesconto = document.getElementById('contentDesconto');
    valorDesconto.style.display = 'none';
    btn.disabled = false;
}

const calculoTotal = (element, operacao) => {
    resetValorTotal();
    let valorProduto = (element.parentNode.getElementsByClassName('valor')[0].innerText).replace(/[^0-9,]*/g, '').replace(',', '.');
            
    let qtd = parseInt(element.getElementsByClassName('inputQtd')[0].value);

    let valorTotalParcial = (document.getElementById('contentTotal').innerHTML).replace(/[^0-9,]*/g, '').replace(',', '.');

    if(operacao == '+'){
        element.getElementsByClassName('inputQtd')[0].value = qtd+1;
        var valorFinal = parseFloat(valorTotalParcial) + parseFloat(valorProduto);
    }else if (operacao == '-'){
        if(qtd == 1){
            let novoCars = JSON.parse(localStorage.getItem('carros')).filter(data => {
                return data.id != element.dataset.id;
            })
            localStorage.setItem('carros', JSON.stringify(novoCars));
            let node = element.parentNode.parentNode.parentNode;
            node.parentNode.removeChild(node);
        }
        element.getElementsByClassName('inputQtd')[0].value = qtd-1;
        var valorFinal = parseFloat(valorTotalParcial) - parseFloat(valorProduto);
    }
    
    document.getElementById('contentTotal').innerHTML = `Valor Total: R$ ${valorFinal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;

}

export default {
    getCars,
    addCar,
    renderCarrinho,
    resetValorTotal
};