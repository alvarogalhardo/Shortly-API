import connection from "../database/shortly.js";
import dayjs from "dayjs";

export async function signUp(req, res) {
  const { user } = res.locals;
  const { email, name, password } = user;
  const date = dayjs().format();
  try {
    await connection.query(
      `INSERT INTO users (name, email, password, "createdAt") VALUES ($1, $2, $3, $4)`,
      [name, email, password, date]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
