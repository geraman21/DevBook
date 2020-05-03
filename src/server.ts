import express, { Request, Response, NextFunction } from 'express';
import { connectDB } from './config/db';
import { users_router } from './routes/api/users';
import { profiles_router } from './routes/api/profiles';
import { posts_router } from './routes/api/posts';
import { auth_router } from './routes/api/auth';
import path from 'path';
const app = express();

//COnnect DB
connectDB();

//Init middleware

app.use(express.json());

// Define routes

app.use('/api/users', users_router);
app.use('/api/posts', posts_router);
app.use('/api/profiles', profiles_router);
app.use('/api/auth', auth_router);

//Serve static assets in production
app.use(express.static('client/build'));

app.get('*', (req: Request, res: Response) => {
	res.sendFile(path.resolve(__dirname, 'cleint', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on Port ${PORT}`);
});
