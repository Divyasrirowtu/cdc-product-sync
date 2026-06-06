const pool = require("../db/db");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  const { name, price, category, stock } = req.body;

  const result = await pool.query(
    `INSERT INTO products (name, price, category, stock)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, price, category, stock]
  );

  res.status(201).json(result.rows[0]);
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, stock } = req.body;

  const result = await pool.query(
    `UPDATE products
     SET name=$1, price=$2, category=$3, stock=$4, updated_at=NOW()
     WHERE id=$5
     RETURNING *`,
    [name, price, category, stock, id]
  );

  res.status(200).json(result.rows[0]);
};

// SOFT DELETE
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  await pool.query(
    `UPDATE products
     SET deleted_at = NOW()
     WHERE id=$1`,
    [id]
  );

  res.status(204).send();
};