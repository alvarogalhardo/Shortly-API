import connection from "../database/shortly.js";

export async function verifyDelete(req, res, next) {
  const { id } = req.params;
  const { userId } = res.locals;
  try {
    const { rows } = await connection.query(
      `SELECT "userId" FROM urls WHERE id=$1`,
      [id]
    );
    const selectedId = rows[0].userId;
    if (rows.length === 0) return res.sendStatus(404);
    if (selectedId !== userId) return res.sendStatus(401);
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function checkShortUrl(req,res,next){
  const {shortUrl} = req.params;
  try{
    const {rows} = await connection.query(`SELECT * FROM urls WHERE "shortUrl"=$1`,[shortUrl]);
    console.log(rows.length);
    if (rows.length===0) return res.sendStatus(404);
    const {id,userId,url} = rows[0];
    res.locals.userId = userId;
    res.locals.url = url;
    res.locals.id = id;
    next();
  } catch(err){
    console.log(err);
    res.sendStatus(500)
  }
}

export async function addVisit(req,res,next){
  const {userId,id,url} = res.locals;
  try{
    await connection.query(`INSERT INTO visits ("userId", "urlId") VALUES ($1, $2)`,[userId,id])
    next();
  }catch(err){
    console.log(err);
    res.sendStatus(500);
  }
}