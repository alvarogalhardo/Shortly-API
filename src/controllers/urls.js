import { nanoid } from "nanoid";
import connection from "../database/shortly.js";

export async function postUrl(req, res) {
  const {url} = req.body;
  req.body = nanoid(6);
  const shortUrl = req.body;
  const { userId } = res.locals;
  console.log(userId);
  try {
    await connection.query(
      `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`,
      [userId, url, shortUrl]
    );
    res.status(201).send({shortUrl})
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
