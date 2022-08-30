import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getMyBids } from '../../api/bid'
import messages from '../shared/AutoDismissAlert/messages'
import '../../css/index.css'

//card container style
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const BidIndex = (props) => {
    const [cars, setCars] = useState()
    const [error, setError] = useState(false)

    const { msgAlert, user } = props

    //console.log('Props in BidIndex', props)

    useEffect(() => {

        getMyBids(user)
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
           <Card.Header style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px'}}>
           {car.make}  {car.model}
           </Card.Header>
            <Card.Body>
           <img src={car.image} alt={car.model} class="image"></img>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
        </Card >
    ))
    return(myCars)

    
}

export default BidIndex