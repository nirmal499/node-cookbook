import PostModel from "@/resources/post/post.model";
import IPost from "@/resources/post/post.interface";

class PostService {
  private post;

  constructor() {
    try {
      PostModel.initialiseDB();
    } catch (error: any) {
      /* This is not catched so, it will stop execution */
      throw new Error("Unable to create table post");
    }
    this.post = new PostModel();
  }
  /**
   * Create a new post
   */
  public async create(title: string, body: string): Promise<IPost | Error> {
    try {
      const post = await this.post.create(title, body);
      return post as IPost;
    } catch (error) {
      throw new Error("Unable to create post");
    }
  }
}

export default PostService;
