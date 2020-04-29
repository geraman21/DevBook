import { Express } from 'express-serve-static-core';
import { Payload } from '../src/models/Token';

declare module 'express-serve-static-core' {
	interface Request extends Payload {}
}
