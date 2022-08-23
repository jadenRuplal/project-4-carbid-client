import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllCars } from '../../api/cars'
import messages from '../shared/AutoDismissAlert/messages'
import Countdown from 'react-countdown'

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

    //console.log('Props in ItemIndex', props)

    useEffect(() => {

        getAllCars()
            .then(res => setCars(res.data.cars))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Items',
                    message: messages.getCarsFailure,
                    variant: 'danger',
                })
                // console.log("here is get all items", getAllCars())
                console.log(err)
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If items haven't loaded yet
    if (!cars) {
        return <LoadingScreen />
    } else if (cars.length === 0) {
        return <p>Sorry, no cars available for listing</p>
    }

    const carCards = cars.map((car, index) => (
        <Card style={{ width: '30%', margin: 5 }} key={index}>
            <Link to={`/cars/${car._id}`} style={{ textDecoration: 'none', color: 'black'}}><Card.Header>{car.year}  {car.make}  {car.model}</Card.Header></Link>
            <Card.Body>
                <Link to={`/cars/${car._id}`}><img src={car.image} alt={car.model}></img></Link>
            </Card.Body>
            <Card.Footer>
                <div>
                    <p>
                        bid: ${car.startingbid}
                    </p>
                    <p>
                        buynow: {car.buyout}
                    </p>
                </div>
                <div>Time left: <Countdown date={Date.now() + 100000}/></div>
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