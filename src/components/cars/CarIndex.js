import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllCars } from '../../api/cars'
import messages from '../shared/AutoDismissAlert/messages'
import Countdown from 'react-countdown'
import '../../css/index.css'

//card container style
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const CarIndex = (props) => {
    const [cars, setCars] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    //console.log('Props in BidIndex', props)

    useEffect(() => {

        getAllCars()
            .then(res => setCars(res.data.cars))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Bids',
                    message: messages.getCarsFailure,
                    variant: 'danger',
                })
                // console.log("here is get all bids", getAllCars())
                console.log(err)
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If bids haven't loaded yet
    if (!cars) {
        return <LoadingScreen />
    } else if (cars.length === 0) {
        return <p>Sorry, no cars available for listing</p>
    }

    const carCards = cars.map((car, index) => (
        <Card style={{ width: '30%', margin: 5 }} key={index}>
            <Link to={`/cars/${car._id}`} style={{ textDecoration: 'none', color: 'black'}}><Card.Header style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px'}}>{car.year}  {car.make}  {car.model}</Card.Header></Link>
            <Card.Body >
                <Link to={`/cars/${car._id}`}><img src={car.image} alt={car.model} class="image"></img></Link>
            </Card.Body>
            <Card.Footer>
                <div>
                    <div>
                        Bid: ${car.startingbid} Buynow: ${car.buyout}
                    </div>
                   
                </div>
                <div>Time left: <Countdown date={Date.now() + 91000000}/></div>
            </Card.Footer>
        </Card >
    ))

    return (
        <div style={cardContainerStyle}>
            {carCards}
        </div>
    )
}



export default CarIndex