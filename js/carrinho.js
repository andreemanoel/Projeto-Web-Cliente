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

export default {
    getCars,
    addCar,
};