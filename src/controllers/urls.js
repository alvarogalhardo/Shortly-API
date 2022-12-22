import { nanoid } from "nanoid";
import connection from "../database/shortly.js";

export async function postUrl(req, res) {
  const { url } = req.body;
  req.body = nanoid(6);
  const shortUrl = req.body;
  const { userId } = res.locals;
  console.log(userId);
  try {
    await connection.query(
      `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`,
      [userId, url, shortUrl]
    );
    res.status(201).send({ shortUrl });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await connection.query(
      `SELECT id, url, "shortUrl" FROM urls WHERE id=$1`,
      [id]
    );
    if (rows.length === 0) return res.sendStatus(404);
    res.status(200).send(rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  try {
    await connection.query(`DELETE FROM urls WHERE id=$1`, [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export function redirectToUrl(req,res){
  const {url} = res.locals;
  res.redirect(url);
}