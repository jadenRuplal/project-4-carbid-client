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
    const [cars, setCars] = useState()
    const [error, setError] = useState(false)

    const { msgAlert, user } = props

    //console.log('Props in ItemIndex', props)

    useEffect(() => {

        getMyCars(user)
            .then(res => 
                {console.log(res.data)
                setCars(res.data.car)})
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
    if (!cars) {
        return <LoadingScreen />
    } else if (cars.length === 0) {
        return <p>Sorry, looks like you haven't listed anything yet.</p>
    }
    console.log("this is cars", cars)
    const myCars = cars.map((car, index) => (
        <Card style={{ width: '30%', margin: 5 }} key={index}>
           <Card.Header style={{textAlign:'center'}}>
                 {car.make} {car.model}
           </Card.Header>
            <Card.Body>
            <Link to={`/myCars/${car._id}`}><img src={car.image} alt={car.model}></img></Link>
            </Card.Body>
        </Card >
    ))
    return(myCars)

    
}

export default ListingIndex