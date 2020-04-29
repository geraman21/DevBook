import { JwtHeader } from 'jsonwebtoken';

export interface Payload {
	user: {
		id: string;
	};
}
