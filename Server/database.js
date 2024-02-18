import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getItemByI(id) {
  const [rows] = await pool.query(
    `
    SELECT item.*, shared_item.shared_with_id
    FROM item
    LEFT JOIN shared_todos On item.id = shared_item.item_id
    WHERE item.user_id= ? OR shared_item.shared_with_id = ?
    `,
    [id, id]
  );
  return rows;
}

export async function getItem() {
  const [rows] = await pool.query(
    `
    SELECT * FROM item WHERE id = ?`,
    [id]
  );
  return rows[0];
}

export async function getSharedItemByI(id) {
  const [rows] = await pool.query(
    `SELECT * FROM shared_item WHERE item_id = ?`,
    [id]
  );
  return rows[0];
}

export async function getUserByID(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}

export async function getUserByEmail(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return rows[0];
}

export async function createItem(user_id, title) {
  const [result] = await pool.query(
    `INSERT INTO item (user_id, title) VALUES (?, ?)`,
    [user_id, title]
  );
  const itemID = result.insertId;
  return getItem(itemID);
}

export async function deleteItem(id) {
  const [result] = await pool.query(`DELETE FROM item WHERE id = ?;`, [id]);
  return result;
}

export async function toggleCompleted(id, value) {
  const newValue = value === true ? "TRUE" : "FALSE";
  const [result] = await pool.query(
    `UPDATE item SET completed = ${newValue} WHERE id = ?;`,
    [id]
  );
  return result;
}

export async function sharedItem(todo_id, user_id, shared_with_id) {
  const [result] = await pool.query(
    `INSERT INTO shared_item (todo_id, user_id, shared_with_id) VALUES (?, ?, ?);`,
    [todo_id, user_id, shared_with_id]
  );
  return result.insertId;
}

export async function getItemById(id) {
  const [row] = await pool.query(`SELECT * FROM item WHERE id = ?`, [id]);
  console.log(row);
  return row[0];
}

getItemById(1);
