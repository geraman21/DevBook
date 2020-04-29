import express, { Request, Response, NextFunction } from 'express';
import { connectDB } from './config/db';
import { users_router } from './routes/api/users';
import { profiles_router } from './routes/api/profiles';
import { posts_router } from './routes/api/posts';
import { auth_router } from './routes/api/auth';
const app = express();

//COnnect DB
connectDB();

//Init middleware

app.use(express.json());

app.get('/', (req: Request, res: Response) => res.send('API Running'));

// Define routes

app.use('/api/users', users_router);
app.use('/api/posts', posts_router);
app.use('/api/profiles', profiles_router);
app.use('/api/auth', auth_router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server startedon Port ${PORT}`);
});
