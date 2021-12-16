import IUser from "@/resources/user/user.interface";

declare global {
  namespace Express {
    export interface Request {
      user: Omit<IUser, "password">;
    }
  }
}

/* https://stackoverflow.com/questions/35074713/extending-typescript-global-object-in-node-js */
