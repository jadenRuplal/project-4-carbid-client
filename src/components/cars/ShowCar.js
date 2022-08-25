import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button, Form, Carousel } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneCar, updateStockCar } from '../../api/cars'
import messages from '../shared/AutoDismissAlert/messages'
// import EditItemModal from './EditModal'
import CarForm from '../shared/CarForm.js'
import StripeCheckout from 'react-stripe-checkout'
import { setNewBid } from '../../api/cars'
import { createComment, deleteComment } from '../../api/comments'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import io from 'socket.io-client'
import { all } from 'q'

const socket = io.connect("http://localhost:8000")

// We need to get the item's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component


const ShowCar = (props) => {
    const [car, setCar] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [bid, setBid] = useState(null)
    const [currentBid, setCurrentBid] = useState(null)
    const [comment, setComments] = useState(null)
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [allComments, setAllComments] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert, updatedStockCar, triggerRefresh } = props
    console.log('user in props', user)
    console.log('the item in showItem', car)
    // destructuring to get the id value from our route parameters

    const setupStuff = (res) => {
        console.log("this is res.data.car", res.data.car.comments) 
        setCar(res.data.car)
        setCurrentBid(res.data.car.startingbid)
        setAllComments(res.data.car.comments)
    }

    useEffect(() => {
        getOneCar(id)
            .then(res => { 
                setupStuff(res)
                console.log('this is after get one car')
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting item',
                    message: messages.getCarsFailure,
                    variant: 'danger'
                })
                navigate('/cars')
                //navigate back to the home page if there's an error fetching
            })

            
        socket.on('connect', () => {
                setIsConnected(true)
              })
        socket.on('disconnect', () => {
                setIsConnected(false)
              })
              
        socket.on('recieve_message', (data) => {
            console.log('line 80 all comments', allComments)
            setAllComments((prevAllComments) => {
                console.log('inside set function', prevAllComments)
                return [...prevAllComments, data]
            })

        
        })
        socket.on('recieve_bid', (newBid) => {
            console.log('new bid', newBid)
            setCurrentBid(newBid.bid)
        })
            
        return () => {
                socket.off('connect')
                socket.off('disconnect')
                socket.off('pong')
              }
            
    }, [socket])

    console.log('allComments after setting from db', allComments)

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



    const changeQuantity = (car) => {
        // e.preventDefault()
        const updatedStock = car.stock - 1
        updateStockCar(car, updatedStock)
            .then(console.log('this is car and updated stock', car, updatedStock))
            // .then(() => triggerRefresh())
            .catch(() =>
                console.log('works')
            )
    }


    function handleToken(token, addresses) {
        changeQuantity(car)
        if (token) {
            msgAlert({
                heading: 'Success',
                message: messages.paymentSuccessful,
                variant: 'success'
            })
            setTimeout(() => {
                navigate('/cars')
            }, 3000)
        }
    }

    const handleBid = (e) => {
        // e equals the event
        e.preventDefault()
        
        if(bid > car.startingbid && bid < car.buyout) {
        setNewBid(user, bid, car)
        // send a success message to the user
        .then((data) => {
            console.log('this is data.startingbid', data.data.startingbid)
           setCurrentBid(data.data.startingbid)
            msgAlert({
                heading: 'Yes!',
                message: messages.createBidSuccess,
                variant: 'success'
            })
        })} else {
            msgAlert({
                heading: 'No!',
                message: messages.addBidFail,
                variant: 'danger'
            })
        }
    }

    const handleComments = (e) => {
        // e equals the event
        e.preventDefault()
        
        createComment(user, comment, car)
        // send a success message to the user
        .then((data) => {
            msgAlert({
                heading: 'Yes!',
                message: messages.createCommentSuccess,
                variant: 'success'
            })
        })
    }

    const handleCommentChange = (e) => {
        setComments(e.target.value)
    }

    const handleChange = (e) => {
        setBid(e.target.value)
    }

    // function availability() {
    //     if (item.stock = 0) {
    //         return (<p>Out of Stock Sorry</p>)
    //     } else {
    //         return (
    //             <p>hi</p>
    //         )
    //     }
    // }
    const sendComment = () => {
        socket.emit("send_message", {note: comment, email: user.email})
    }

    const sendBid = () => {
        socket.emit("send_bid", {bid})
    }

    const carComments = allComments?.map((comment, index) => (
       <Container className="fluid">
       <Card key={index}>
          <Card.Header>{comment.email}</Card.Header>
            <Card.Body>
                {comment.note}
            </Card.Body>
            <Card.Footer>
            {(user.email === comment.email ) ?
                                (<Button onClick={() => deleteComment(user, comment._id, car._id)}
                                className="m-2">
                                    Delete
                                </Button>) : null }
            </Card.Footer>
        </Card >
        </Container>
    ))


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
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }} > Current Bid: {currentBid} </p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        
                    <Form onSubmit={handleBid}>
                         <Form.Label htmlFor="startingbid">Place Bid</Form.Label>
                        <Form.Control
                            placeholder="Enter your bid"
                            type="number"
                            name="startingbid"
                            id="startingbid"
                            value={bid}
                            onChange={handleChange}
                        />
                        <Button type="submit" onClick={sendBid}>Submit</Button>
                    </Form>


                        {

                            <>
                
                                {/* <Button onClick={() => addToTheCart()} */}
                                {/* // className="m-2">
                                //     Add To Cart
                                // </Button> */}
                                {(car.stock > 0) ?
                                    (<StripeCheckout
                                        stripeKey="pk_test_51LTtnNDtEn7Sojm7iPaYEA0jfQj07zxKZ92tb1ZrdFNZuI7ecXBKHuwGmIKi6JjNwE9pAPE8b23SN6KemYzLrNb600prbjUyDe"
                                        token={handleToken}
                                        billingAddress
                                        shippingAddress
                                        amount={car.buyout * 100}
                                        label="Purchase Item"
                                        image={car.image}
                                        currency="USD"
                                    />) : (<p> Sold out</p>)}
                            </>


                        }
                    </Card.Footer>
                </Card>

     {/* <form action="comments" method="POST">
         <fieldset>
             <legend>Add comment</legend>
             <label class="form-label">Comment: </label>
             <input
                  type="text"
                 class="form-control"
                 name="note"
                 placeholder="Enter comment here"
             />
        </fieldset>
        <input type="submit" class="btn btn-success" value="Add comment" />
    </form> */}
    <Form onSubmit={handleComments}>
            <label>Comment</label>
                <Form.Control
                    placeholder="Leave a Comment"
                    name="bid"
                    id="bid"
                    value={comment}
                    onChange={handleCommentChange}
                />
            <Button type="submit" onClick={sendComment}>Submit</Button>
    </Form>

            </Container>
            
            {carComments}
        </>
       

    )
}



export default ShowCar