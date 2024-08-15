import { User } from "../definitions/User";


export async function authenticateUser(email: string, password: string): Promise<User | undefined> {
    try {
        const response = await fetch('https://localhost:3001/authenticate', {
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

export async function registerUser(email: string, password: string): Promise<User | undefined> {
    try {
        const response = await fetch('https://localhost:3001/register', {
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
        throw new Error('An error occurred while creating the user');
    }
}