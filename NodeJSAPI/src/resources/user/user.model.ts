import app from "../../app";
import bcrypt from "bcrypt";
import Imysql from "mysql2/typings/mysql/lib/protocol/packets";
import myIUser from "./user.interface";

class UserModel {
  constructor() {}

  public static initialiseDB = async () => {
    let sql = `CREATE TABLE IF NOT EXISTS users(
        user_id int unsigned primary key auto_increment,
        name varchar(50) not null,
        email varchar(60) not null,
        password varchar(255) not null,
        created_at date not null,
        unique(email)
      )`;

    try {
      await app.promisePool.execute(sql);
    } catch (error: any) {
      throw error;
    }
  };

  async create(name: string, email: string, password: string) {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdAtDate = `${yyyy}-${mm}-${dd}`;

    const hash = await bcrypt.hash(password, 10);

    /* users(user_id,name,email,password,created_at) */
    let sql =
      "INSERT INTO users(name,email,password,created_at) VALUES(?,?,?,?)";
    /* ?? and escapeId is used for identifiers and ? and escape() is used for values. */

    try {
      const [newUser, _]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await app.promisePool.execute(sql, [name, email, hash, createdAtDate]);
      try {
        /* https://github.com/mysqljs/mysql#getting-the-id-of-an-inserted-row */
        let sql = `SELECT name,email,created_at from users WHERE user_id=${newUser.insertId}`;
        const [created_user, _]: [
          Imysql.RowDataPacket[],
          Imysql.FieldPacket[]
        ] = await app.promisePool.execute(sql);

        return {
          /* user_id is primary key */
          user: created_user[0] as Omit<myIUser, "password">,
          user_id: newUser.insertId,
        };
      } catch (error: any) {
        throw new Error(
          "ERROR while retrieving the newly inserted user " + error.message
        );
        //throw error;
      }
    } catch (error: any) {
      throw new Error("ERROR while creating new user: " + error.message);
      //throw error;
    }
  }

  public static async isValidPassword(email: string, password: string) {
    let sql = `SELECT password FROM users WHERE email=?`;
    try {
      const [user, _]: [Imysql.RowDataPacket[], Imysql.FieldPacket[]] =
        await app.promisePool.execute(sql, [email]);
      return await bcrypt.compare(
        password,
        (user[0] as Pick<myIUser, "password">).password
      );
    } catch (error: any) {
      throw new Error("ERROR while retrieving the user to validate password");
    }
  }

  async findOne(email: string) {
    let sql = `SELECT user_id,name,email,created_at FROM users WHERE email=?`;
    try {
      const [user, _]: [Imysql.RowDataPacket[], Imysql.FieldPacket[]] =
        await app.promisePool.execute(sql, [email]);
      if (user.length == 0) {
        /* user was not found */
        return null;
      }
      /* email is unique */
      return {
        /* user_id is primary key */
        user_info: user[0] as Omit<myIUser, "password">,
        user_id: user[0].user_id as number,
      };
    } catch (error: any) {
      throw new Error("ERROR while retrieving the user to findOne ");
    }
  }

  static async findById(user_id: number) {
    let sql = `SELECT name,email,created_at FROM users WHERE user_id=?`;
    try {
      const [user, _]: [Imysql.RowDataPacket[], Imysql.FieldPacket[]] =
        await app.promisePool.execute(sql, [user_id]);
      if (user.length == 0) {
        /* user was not found */
        return null;
      }
      /* user_id is primary key */
      return user[0] as Omit<myIUser, "password">;
    } catch (error: any) {
      throw new Error("ERROR while retrieving the user to findOne ");
    }
  }
}

export default UserModel;
