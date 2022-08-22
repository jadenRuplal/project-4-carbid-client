import CarIndex from "./cars/CarIndex"

const Home = (props) => {
	const { msgAlert, user } = props
	// const { msgAlert, user } = prop
	console.log('props in home', props)

	return (
		<>
			
			<h2>All Cars</h2>
			<CarIndex 
				msgAlert={msgAlert}
			/>

		</>
	)
}

export default Home
