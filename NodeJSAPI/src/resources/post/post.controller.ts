import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/post/post.validation";
import PostService from "@/resources/post/post.service";

class PostController implements Controller {
  public path = "/posts";
  public router = Router();
  private postService;

  constructor() {
    this.initialiseRoutes();

    /* PostModel.initialiseDB(); inside PostService will throw error which will stop execution,since we 
    do not catch it here */
    this.postService = new PostService();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { title, body } = req.body;

      const post = await this.postService.create(title, body);

      res.status(201).json({ post });
    } catch (error: any) {
      /* catching `throw new Error("Unable to create post");` */
      next(new HttpException(400, error.message));
    }
  };
}

export default PostController;
