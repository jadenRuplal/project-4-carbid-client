import { useState } from 'react'
// import items from api, which is going to be added later
import{ createCar } from '../../api/cars'
import { useNavigate } from 'react-router-dom'

// import createItemSuccess and createItemFailure from '../shared/AutoDismissAlert/messages', which is going to be added later
import { createCarSuccess, createCarFailure } from '../shared/AutoDismissAlert/messages'

// import ItemForm from '../shared/ItemForm' 
import CarForm from '../shared/CarForm'


const CreateCar = (props) => {
    console.log('this is props:', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [car, setCar] = useState({
        make: '',
        model: '',
        image: '',
        year: null,
        startingbid: null,
        buyout: null,
        description: '',
        type: '',
        stock: null,
    })
    console.log('this is item in createCar', car)

    const handleChange = (e) => {
        setCar(prevCar => {
            let updatedValue = e.target.value
            const updatedName = e.target.name
            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            const updatedCar = {
                [updatedName]: updatedValue
            }

            return {
                ...prevCar,
                ...updatedCar

            }
        })
    }

     // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createCar(user, car)
            // if we're successful, navigate to the show page for the new car
            .then(res => { navigate(`/cars/${res.data.car.id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Yes!',
                    message: createCarSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'No!',
                    message: createCarFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <CarForm 
            car = { car }
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new car!"
        />
    )
}

export default CreateCar

