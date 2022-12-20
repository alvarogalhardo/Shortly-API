import bcrypt, { hashSync } from "bcrypt";
import { v4 as uuid } from "uuid";
import connection from "../database/shortly.js";

export async function userExistsSignUp(req, res, next) {
  const { email } = req.body;
  try {
    const exists = await connection.query(
      "SELECT * FROM users WHERE email=$1",
      [`'${email}'`]
    );
    if (exists.rowCount !== 0) {
      res.sendStatus(409);
    }
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export function encryptPassword(req, res, next) {
  const { user } = res.locals;
  try {
    const hashPassword = bcrypt.hashSync(user.password, 10);
    const hashUser = { ...user, password: hashPassword };
    res.locals.user = hashUser;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function userExistsSignIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const exists = await connection.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);
    if (
      exists.rowCount > 0 &&
      bcrypt.compareSync(password, exists.rows[0].password)
    ) {
      res.locals.user = exists.rows[0];
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

