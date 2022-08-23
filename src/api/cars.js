import apiUrl from '../apiConfig'
import axios from 'axios'

//READ => INDEX
export const getAllCars = () => {
    return axios({
        url: `${apiUrl}/cars`,
        method: 'GET'
    })
}

// READ => SHOW
export const getOneCar = (id) => {
    return axios(`${apiUrl}/cars/${id}`)
}

// CREATE
export const createCar = (user, newCar) => {

    return axios({
        url: apiUrl + '/cars',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { car: newCar }
    })
}

// UPDATE
export const updateCar = (user, updatedCar) => {

    console.log('this is updatedCar', updatedCar)

    return axios({
        url: `${apiUrl}/myCars/${updatedCar._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { car: updatedCar }
    })
}



export const updateStockCar = (car, updatedStock) => {

    console.log('this is updatedStock', updatedStock)

    return axios({
        url: `${apiUrl}/cars/stock/${car._id}`,
        method: 'PATCH',
        data: { car: updatedStock }
    })
}

// DELETE
export const removeCar = (user, carId) => {
    return axios({
        url: `${apiUrl}/myCars/${carId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}



export const setNewBid = (user, bid, car) => {


    return axios({
        url: `${apiUrl}/cars/bid/${car._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { startingbid: bid , highestbid: user._id}
    })
}