import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // Exclude API routes and static assets from middleware
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};