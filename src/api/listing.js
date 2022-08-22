import apiUrl from '../apiConfig'
import axios from 'axios'

//READ => INDEX
export const getMyCars = () => {
    return axios({
        url: `${apiUrl}/myCars`,
        method: 'GET'
    })
}

// READ => SHOW
export const getMyCar = (user,id) => {
    return axios({url: apiUrl + `/myCars/${id}`,
    headers: {
        Authorization: `Token token=${user.token}`,
    },
    })
}