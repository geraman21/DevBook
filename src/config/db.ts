import mongoose from 'mongoose';
import config from 'config';
const db = config.get('mongoURI') as string;

export const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log('mongodb connected');
	} catch (err) {
		console.error(err.message);

		//Exit process with failure
		process.exit(1);
	}
};
