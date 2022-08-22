import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getMyCars } from '../../api/listing'
import messages from '../shared/AutoDismissAlert/messages'

//card container style
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ListingIndex = (props) => {
    const [car, setCars] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert, user } = props

    //console.log('Props in ItemIndex', props)

    useEffect(() => {

        getMyCars()
            .then(res => setCars(res.data.car))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting carts',
                    message: messages.getCarsFailure,
                    variant: 'danger',
                })
                console.log(err)
                setError(true)
            })
    }, [])

   
    if (error) {
        return <p>Error!</p>
    }

    // If carts haven't loaded yet
    if (!car) {
        return <LoadingScreen />
    } else if (car.length === 0) {
        return <p>Sorry, looks like you haven't listed anything yet.</p>
    }

    const myCars = car.map((car, index) => (
        <Card style={{ width: '30%', margin: 5 }} key={index}>
           <Card.Header>
                 Car: {index + 1}
           </Card.Header>
            <Card.Body>
                <h1>{car.make}   {car.model}</h1>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
        </Card >
    ))

    
}

export default ListingIndex