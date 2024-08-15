'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { registerUser } from '../services/authentication_services';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log(formData);
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // Extract user data from formData
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // Create the user
    await registerUser(email, password);
    
    // Sign in the user after successful registration
    await signIn('credentials', formData);
    
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to create an account.';
  }
}