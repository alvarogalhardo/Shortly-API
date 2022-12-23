import { nanoid } from "nanoid";
import connection from "../database/shortly.js";

export async function postUrl(req, res) {
  const { url } = req.body;
  req.body = nanoid(6);
  const shortUrl = req.body;
  const { userId } = res.locals;
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

export function redirectToUrl(req, res) {
  const { url } = res.locals;
  res.redirect(url);
}

export async function getUser(req, res) {
  const { userId } = res.locals;
  console.log(userId);
  try {
    const user = await connection.query(
      `SELECT users.id, users.name, COUNT(visits."userId") AS "visitCount" FROM users JOIN visits ON users.id = visits."userId" WHERE users.id = $1 GROUP BY users.id`,
      [userId]
    );
    const urls = await connection.query(`SELECT json_agg(json_build_object('id',urls.id,'shortUrl',urls."shortUrl",'url',urls.url,'visitCount',(SELECT COUNT(visits."urlId") FROM visits WHERE visits."urlId" = urls.id))) AS "shortenedUrls" FROM urls  WHERE urls."userId" = $1`,[userId])
    const {shortenedUrls} = urls.rows[0]
    const obj = {...user.rows[0],shortenedUrls};
    res.status(200).send(obj);
    // const {rows} = await connection.query(`SELECT users.id, users.name, COUNT(visits."userId") AS "visitCount", json_agg(json_build_object('id',urls.id,'shortUrl',urls."shortUrl",'url',urls.url,'visitCount',(SELECT COUNT(visits."urlId") FROM visits WHERE visits."urlId" = urls.id))) AS "shortenedUrls" FROM users JOIN visits ON users.id = visits."userId" JOIN urls ON urls.id = visits."urlId" WHERE users.id = 1 GROUP BY users.id`)
    // console.log(rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getRanking(req,res){
  try{
    const {rows} = await connection.query(`SELECT users.id, users.name, COUNT(urls."userId") AS "linksCount", COUNT(visits."urlId") AS "visitsCount" FROM users LEFT JOIN urls ON users.id = urls."userId" LEFT JOIN visits ON urls.id = visits."urlId" GROUP BY users.id ORDER BY "visitsCount" DESC LIMIT 10`)
    res.status(200).send(rows)
  }catch(err){
    console.log(err);
    res.sendStatus(500)
  }
}
