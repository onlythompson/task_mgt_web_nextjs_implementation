import { User } from "../definitions/User";


export async function authenticateUser(email: string, password: string): Promise<User | undefined> {
    try {
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            const user = await response.json();
            return user;
        }
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while authenticating the user');
    }
}

export async function registerUser(email: string, username:string, password: string): Promise<User | undefined> {
    try {
        const response = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        });
        if (response.ok) {
            const user = await response.json();
            return user;
        }
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the user');
    }
}