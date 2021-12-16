import IPost from "./post.interface";
import app from "../../app";
import Imysql from "mysql2/typings/mysql/lib/protocol/packets";

class PostModel {
  constructor() {}
  /* export class MyClass {
   private constructor(
      private readonly mSomething: Something,
      private readonly mSomethingElse: SomethingElse
   ) {
   }

   public static CreateAsync = async () => {
      const something = await SomeFunctionAsync();
      const somethingElse = await SomeOtherFunctionAsync();

      return new MyClass(something, somethingElse);
   };
} */
  public static initialiseDB = async () => {
    let sql = `CREATE TABLE IF NOT EXISTS posts(
        post_id int unsigned primary key auto_increment,
        title varchar(200) not null,
        body varchar(2000) not null,
        created_at date not null
      )`;

    try {
      await app.promisePool.execute(sql);
    } catch (error: any) {
      throw error;
    }
  };

  async create(title: string, body: string) {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdAtDate = `${yyyy}-${mm}-${dd}`;

    /* posts(post_id,user_id,title,body,created_at) */
    let sql = "INSERT INTO posts(title,body,created_at) VALUES(?,?,?)";
    /* ?? and escapeId is used for identifiers and ? and escape() is used for values. */

    try {
      const [newPost, _]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await app.promisePool.execute(sql, [title, body, createdAtDate]);
      try {
        /* https://github.com/mysqljs/mysql#getting-the-id-of-an-inserted-row */
        let sql = `SELECT * from posts WHERE post_id=${newPost.insertId}`;
        const [created_post, _]: [
          Imysql.RowDataPacket[],
          Imysql.FieldPacket[]
        ] = await app.promisePool.execute(sql);

        /* post_id is primary key */
        return created_post[0];
      } catch (error: any) {
        throw new Error("ERROR while retrieving the newly inserted post");
        //throw error;
      }
    } catch (error: any) {
      throw new Error("ERROR while creating new post");
      //throw error;
    }
  }
}

export default PostModel;
