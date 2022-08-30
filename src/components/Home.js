import CarIndex from "./cars/CarIndex"

const homestyle = {
 textAlign: 'center',
 fontWeight: 'bold',
 fontSize: '40px'
}

const Home = (props) => {
	const { msgAlert, user } = props
	// const { msgAlert, user } = prop
	console.log('props in home', props)

	return (
		<>
			
			<h2 style={homestyle}>All Cars</h2>
			<CarIndex 
				msgAlert={msgAlert}
			/>

		</>
	)
}

export default Home
