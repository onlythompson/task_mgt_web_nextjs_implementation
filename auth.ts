import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

async function authenticateUser(email: string, password: string) :Promise<User | undefined> {
  try{
    const response = await fetch('https://localhost:3001/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });
    if(response.ok){
      const user = await response.json();
      return user;
    }
  }catch(error){
    console.error(error);
    throw new Error('An error occurred while authenticating the user');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  //Using Credentials provider  for username and password sign in
  providers: [Credentials({
    async authorize(credentials) {
      // Use zod to validate the credentials
        const parsedCredentials = z.object({email: z.string().email(), password: z.string().min(8)}).safeParse(credentials);

        if(parsedCredentials.success){
            const { email, password} = parsedCredentials.data;
            const user = await authenticateUser(email, password);
            if(!user){
                return null;
            }
            return user;
        }
        console.log('Invalid credentials');
        return null;
    },
  })],
});