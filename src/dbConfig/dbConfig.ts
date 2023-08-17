import mongoose from "mongoose";

export async function connect() {

	try {
		mongoose.connect(process.env.MONGO_URI!);
		const connection = mongoose.connection;

		connection.on('connected', () => {
			console.log('MongoDB successfully connected.');
		});

		connection.on('error', (error) => {
			console.log('MongoDB connect error. Please make sure MongoDB is running', error);
			process.exit();
		});

	} catch (error) {
		console.log('Something went wrong!', error);
	}

}