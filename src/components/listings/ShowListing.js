import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getOneCar, updateCar, removeCar } from '../../api/cars'
import messages from '../shared/AutoDismissAlert/messages'
// import EditItemModal from './EditModal'
import CarForm from '../shared/CarForm.js'
import EditCarModal from './EditListingModal'


// We need to get the item's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component


const MyCar = (props) => {
    const [car, setCar] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert, updatedStockCar, triggerRefresh } = props
    console.log('user in props', user)
    console.log('the item in showItem', car)
    // destructuring to get the id value from our route parameters



    useEffect(() => {
        getOneCar(id)
            .then(res => { return setCar(res.data.car), console.log("this is res.data.car", res.data.car) })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting item',
                    message: messages.getCarsFailure,
                    variant: 'danger'
                })
                navigate('/myCars')
                //navigate back to the home page if there's an error fetching
            })
    }, [])

    // here we'll declare a function that runs which will remove the item
    // this function's promise chain should send a message, and then go somewhere
    // const removeTheCar = () => {
    //     removeCar(user, car._id)
    //         // on success send a success message
    //         .then(() => {
    //             msgAlert({
    //                 heading: 'Success',
    //                 message: messages.removeCarSuccess,
    //                 variant: 'success'
    //             })
    //         })
    //         // then navigate to index
    //         .then(() => { navigate('/cars') })
    //         // on failure send a failure message
    //         .catch(err => {
    //             msgAlert({
    //                 heading: 'Error removing item',
    //                 message: messages.removeCarFailure,
    //                 variant: 'danger'
    //             })
    //         })
    // }

    const removeTheCar = () => {
        removeCar(user, car._id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeCarSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => { navigate('/myCars') })
            // on failure send a failure message
            .catch(err => {
                msgAlert({
                    heading: 'Error removing item',
                    message: messages.removeCarsFailure,
                    variant: 'danger'
                })
            })
    }
    
    if (!car) {
        return <LoadingScreen />
    }

    //changeQuantity() declaring callback function for setting state of the item quantity
    // will need the item to change the quantity of and the setter function passed through from props
    // call function before the set timeout and navigate to change quantity in state
    // do I want to make an api call to change the data in the db?
    // what kind of data do i need from the db?
    // how will i make this request from the db?
    // should this api call be inside this callback function or be a seperate function that preceeds it



    // const changeQuantity = (car) => {
    //     // e.preventDefault()
    //     const updatedStock = car.stock - 1
    //     updateStockCar(car, updatedStock)
    //         .then(console.log('this is car and updated stock', car, updatedStock))
    //         // .then(() => triggerRefresh())
    //         .catch(() =>
    //             console.log('works')
    //         )
    // }




    // function availability() {
    //     if (item.stock = 0) {
    //         return (<p>Out of Stock Sorry</p>)
    //     } else {
    //         return (
    //             <p>hi</p>
    //         )
    //     }
    // }


    return (
        <>
            <Container className="fluid">
                <Card >
                    <Card.Header >{car.make}  {car.model}</Card.Header>
                    <Card.Body >
                        <img src={car.image}/>
                        <Card.Text>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }} >Type: {car.type.toLowerCase()} </p>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }} > Description: {car.description} </p>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }} > Max price: {car.buyout} </p>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }} > Year: {car.year} </p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                                 <Button onClick={() => setEditModalShow(true)}
                                    className="m-2"
                                    variant="warning"
                                 >
                                    Edit car
                                </Button>

                                <Button onClick={() => removeTheCar()}
                                    className="m-2"
                                    variant="warning"
                                 >
                                    Delete listing
                                </Button>
                    </Card.Footer>
                </Card>

     
            </Container>
            <EditCarModal
                user={user}
                car={car}
                show={editModalShow}
                updateCar={updateCar}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
        </>
    )
}



export default MyCar