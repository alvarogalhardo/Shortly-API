import { hashSync, compareSync } from "bcrypt";
import connection from "../database/shortly.js";

export async function userExistsSignUp(req, res, next) {
  const { email } = req.body;
  try {
    const exists = await connection.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );
    if (exists.rowCount !== 0) {
      return res.sendStatus(409);
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
    const hashPassword = hashSync(user.password, 10);
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
    const exists = await connection.query(
      `SELECT * FROM users WHERE email=$1`,
      [email]
    );
    if (exists.rowCount > 0 && compareSync(password, exists.rows[0].password)) {
      const sessionExists = await connection.query(
        `SELECT * FROM sessions WHERE "userId"=$1`,
        [exists.rows[0].id]
      );
      if (sessionExists.rowCount > 0) {
        const { token } = sessionExists.rows[0];
        return res.status(200).send({ token });
      }
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

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);
  try {
    const session = await connection.query(
      `SELECT * FROM sessions WHERE token=$1`,
      [token]
    );
    if (session.rowCount === 0) return res.sendStatus(401);
    res.locals.userId = session.rows[0].userId;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
