import apiUrl from '../apiConfig'
import axios from 'axios'

//READ => INDEX
export const getMyCars = (user) => {
   console.log(user)
    return axios({
        url: `${apiUrl}/myCars`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
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