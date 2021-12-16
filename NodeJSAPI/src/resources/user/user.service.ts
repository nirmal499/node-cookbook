import UserModel from "./user.model";
import token from "@/utils/token";
import { log } from "console";

class UserService {
  private user;

  constructor() {
    try {
      UserModel.initialiseDB();
    } catch (error: any) {
      /* This is not catched so, it will stop execution */
      throw new Error("Unable to create table users");
    }
    this.user = new UserModel();
  }
  /**
   * Register a new user
   */
  public async register(name: string, email: string, password: string) {
    try {
      const { user, user_id } = await this.user.create(name, email, password);
      //console.log(user_id);
      const accessToken = token.createToken(user_id);
      //console.log(accessToken);

      return accessToken;
    } catch (error: any) {
      throw new Error("Unable to create user: " + error.message);
    }
  }

  /**
   * Attempt to login a user
   */
  public async login(email: string, password: string) {
    try {
      const user = await this.user.findOne(email);

      if (!user) {
        throw new Error("Unable to find user with that email address");
      }

      if (await UserModel.isValidPassword(email, password)) {
        return token.createToken(user.user_id);
      } else {
        throw new Error("Wrong credentials given");
      }
    } catch (error: any) {
      throw new Error("Unable to do login user " + error.message);
    }
  }
}

export default UserService;
