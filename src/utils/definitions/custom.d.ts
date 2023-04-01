/**
 * Declaration file for the Express namespace and Request interface.
 */

import { IUser } from '@/resources/user/user.interface';

// Declare a global namespace called "Express".
declare global {
  // Extend the "Request" interface from Express.
  namespace Express {
    export interface Request {
      user: IUser; // Declare the "user" property of type IUser.
    }
  }
}
