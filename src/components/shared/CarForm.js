import {
    Form,
    Button,
    Container
} from 'react-bootstrap'


const CarForm = (props) => {
    const { car, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="make">Make</Form.Label>
                <Form.Control
                    placeholder="What is this cars make?"
                    name="make"
                    id="make"
                    value={car.make}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="model">Model</Form.Label>
                <Form.Control
                    placeholder="What is the cars name?"
                    name="model"
                    id="model"
                    value={car.model}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="year">Year</Form.Label>
                <Form.Control
                    placeholder="Enter the cars year"
                    type="number"
                    name="year"
                    id="year"
                    value={car.year}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="image">Image</Form.Label>
                <Form.Control
                    placeholder="Image URL"
                    name="image"
                    id="image"
                    value={car.image}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="type">Type</Form.Label>
                <Form.Control
                    placeholder="Whats the class of the car? EX(sedan)"
                    name="type"
                    id="type"
                    value={car.type}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    placeholder="Give a brief description"
                    name="description"
                    id="description"
                    value={car.description}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="starting price">Starting price</Form.Label>
                <Form.Control
                    placeholder="Enter the cars starting bid"
                    type="number"
                    name="startingbid"
                    id="startingbid"
                    value={car.startingbid}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="buyout">Buynow</Form.Label>
                <Form.Control
                    placeholder="Enter the cars max price"
                    type="number"
                    name="buyout"
                    id="buyout"
                    value={car.buyout}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="stock">Stock</Form.Label>
                <Form.Control
                    placeholder="How many you got?"
                    name="stock"
                    id="stock"
                    value={car.stock}
                    onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CarForm