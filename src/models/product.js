require("dotenv").config();
const connection = require("../configs/db");

module.exports = {
  getProduct: (page, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product_nama LIMIT ${page},6`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  Product: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM product_nama`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  productDetail: id_product => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM product_nama where id =?",
        id_product,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  insertProduct: data => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO product_nama SET ?",
        data,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  updateProduct: (id_product, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE product_nama SET ? WHERE id = ?",
        [data, id_product],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  deleteProduct: id_product => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM product_nama WHERE id = ?",
        id_product,
        (err, result) => {
          if (!err) {
            resolve(result);
            connection.query("ALTER TABLE product_nama DROP id");
            connection.query(
              "ALTER TABLE `product_nama` ADD `id` INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`id`)"
            );
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  updateStock: id_Pembeli => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT (product_nama.stock-items.qty) as stock FROM product_nama RIGHT JOIN items ON product_nama.id=items.id_item where id_Pembeli=?",
        id_Pembeli,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  updateStockfinal: (stock, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE product_nama SET stock=? where id=?",
        [stock, id],
        (err, final) => {
          if (!err) {
            resolve(final);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  sortBy: (sortby, mode) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product_nama ORDER BY ${sortby} ${mode}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  deletefile: id_product => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT Image FROM product_nama WHERE id=?`,
        id_product,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};
