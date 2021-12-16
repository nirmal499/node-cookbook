import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/user/user.validation";
import UserService from "@/resources/user/user.service";
import authenticated from "@/middleware/authenticated.middleware";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private userService;

  constructor() {
    this.initialiseRoutes();

    /* PostModel.initialiseDB(); inside PostService will throw error which will stop execution,since we 
    do not catch it here */
    this.userService = new UserService();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );
    this.router.get(`${this.path}`, authenticated, this.getUser);
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, password } = req.body;

      const token = await this.userService.register(name, email, password);

      res.status(201).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const token = await this.userService.login(email, password);

      res.status(200).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }

    res.status(200).send({ data: req.user });
  };
}

export default UserController;
