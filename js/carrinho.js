// http-server

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
    var html = ``
    for(let car of carros){
        html += `
        <li class="list-group-item py-3">
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
                    <div class="input-group">
                        <button class="btn btn-outline-dark btn-sm" type="button">
                            -
                        </button>
                        <input type="text" class="form-control text-center border-dark" disabled value="1">
                        <button class="btn btn-outline-dark btn-sm" type="button">
                            +
                        </button>
                    </div>
                    <div class="text-end mt-2">
                        <span class="text-dark">Valor: R$ ${car.valor}</span>
                    </div>
                </div>
            </div>
        </li>`
    }

    document.getElementById('contentCarros').innerHTML = html + document.getElementById('contentCarros').innerHTML;
}

export default {
    getCars,
    addCar,
    renderCarrinho,
};