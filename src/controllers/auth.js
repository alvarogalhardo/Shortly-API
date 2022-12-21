import connection from "../database/shortly.js";
import {v4 as uuid} from 'uuid';

export async function signUp(req, res) {
  const { user } = res.locals;
  const { email, name, password } = user;
  try {
    await connection.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, password]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res, next) {
  const { user } = res.locals;
  const token = uuid();
  try {
    await connection.query(
      `INSERT INTO sessions ("userId", token) VALUES ($1, $2)`,
      [user.id, token]
    );
    res.status(200).send({token});
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
