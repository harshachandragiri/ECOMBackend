// import * as express from 'express';
// import { User } from './user.schema'; // Adjust path if needed

// declare namespace Express {
//   export interface Request {
//     user?: User; // ✅ Now TypeScript recognizes request.user
//   }
// }
import { User } from '../auth/user.schema'; // Adjust path as needed

declare global {
  namespace Express {
    interface Request {
      user?: User; // Now TypeScript recognizes request.user
    }
  }
}

export {};
