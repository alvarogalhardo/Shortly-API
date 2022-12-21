import connection from "../database/shortly.js";

export async function verifyDelete(req, res, next) {
  const { id } = req.params;
  const { userId } = res.locals;
  console.log(typeof(parseInt(id)));
  try {
    const { rows } = await connection.query(
      `SELECT "userId" FROM urls WHERE id=$1`,
      [parseInt(id)]
    );
    const selectedId = rows[0].userId;
    if (rows.length === 0) return res.sendStatus(404);
    if (selectedId !== userId) return res.sendStatus(401);
    next();
  } catch (err) {
    console.log(err,'aq');
    res.sendStatus(500);
  }
}
