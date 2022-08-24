import apiUrl from '../apiConfig'
import axios from 'axios'

//READ => INDEX
export const getMyBids = (user) => {
   console.log(user)
    return axios({
        url: `${apiUrl}/bids`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
    })
}

// READ => SHOW
export const getMyBid = (user,id) => {
    return axios({url: apiUrl + `/bids/${id}`,
    headers: {
        Authorization: `Token token=${user.token}`,
    },
    })
}