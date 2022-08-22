import apiUrl from '../apiConfig'
import axios from 'axios'


// READ => SHOW
export const getComments = (id) => {
    return axios(`${apiUrl}/comments/${id}`)
}

// CREATE
export const createComment = (user, newComment) => {

    return axios({
        url: apiUrl + 'cars/comments',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { comments: newComment }
    })
}

// UPDATE
// export const updateComment = (user, updatedComment) => {

//     console.log('this is updatedComments', updatedComment)

//     return axios({
//         url: `${apiUrl}/cars/${car._id}`,
//         method: 'PATCH',
//         headers: {
//             Authorization: `Token token=${user.token}`,
//         },
//         data: { car: updatedComment }
//     })
// }

// DELETE
// export const removeComments = (user, carId) => {
//     return axios({
//         url: `${apiUrl}/cars/${carId}`,
//         method: 'DELETE',
//         headers: {
//             Authorization: `Token token=${user.token}`,
//         }
//     })
// }

