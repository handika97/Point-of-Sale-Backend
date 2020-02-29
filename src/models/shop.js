require("dotenv").config();
const connection = require("../configs/db");

module.exports = {
  addShop: (data, id, user) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO items SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
          //connection.query('INSERT IGNORE INTO status (id, statusNow, price) VALUES (?,0,0,user) ',[id,user])

          // connection.query("UPDATE status SET price=(SELECT SUM(items.qty*product_nama.price) FROM product_nama INNER JOIN items ON items.id_item = product_nama.id where id_Pembeli=?) WHERE id=? ", id,id)
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  deleteShop: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE items SET qty=? WHERE id_Pembeli=? && id_item=?",
        [data.qty, id, data.id_item],
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
  finish: (id_status, id_Pembeli) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE status SET statusNow=1, price=(SELECT SUM(items.qty*product_nama.price+(10/100*items.qty*product_nama.price)) FROM product_nama INNER JOIN items ON items.id_item = product_nama.id where id_Pembeli=?) WHERE id=? ",
        [id_Pembeli, id_Pembeli],
        (err, result) => {
          if (!err) {
            resolve(result);
            //connection.query("UPDATE product_nama SET stock=(stock-items.qty) FROM product_nama INNER JOIN items ON product_nama.id=items.id_item WHERE items.id_Pembeli=?",id_Pembeli)
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  showItem: id_Pembeli => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user.nama as buyer, status.id as No_Pembeli, product_nama.nama as belanja, items.id_item as code_item, items.qty as jumlah, product_nama.price as harga, category.name_category as category, (product_nama.price*items.qty) as harga_total FROM items INNER JOIN status ON items.id_Pembeli = status.id INNER JOIN product_nama ON items.id_item = product_nama.id INNER JOIN user on status.user=user.id INNER JOIN category on product_nama.id_category=category.id where id_Pembeli=?",
        id_Pembeli,
        (err, result) => {
          if (!err) {
            // connection.query("UPDATE status SET price=(SELECT SUM(items.qty*product_nama.price+(10/100*items.qty*product_nama.price)) FROM product_nama INNER JOIN items ON items.id_item = product_nama.id where id_Pembeli=?) WHERE id=? ", [id_Pembeli, id_Pembeli])

            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  show: (id_Pembeli, id_item, user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT IGNORE INTO status (id, statusNow, price, user) VALUES (?,0,0,?) ",
        [id_Pembeli, user]
      );
      connection.query(
        "UPDATE status SET price=(SELECT SUM(items.qty*product_nama.price+(10/100*items.qty*product_nama.price)) FROM product_nama INNER JOIN items ON items.id_item = product_nama.id where id_Pembeli=?) WHERE id=? ",
        [id_Pembeli, id_Pembeli]
      );
      connection.query(
        "SELECT  status.price as price, items.id_Pembeli as id, status.statusNow as statusNow, items.id_item as item FROM items INNER JOIN status ON items.id_pembeli=status.id where status.id=? and items.id_item=?",
        [id_Pembeli, id_item],
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

  showStatus: (id_Pembeli, id_item) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE status SET price=(SELECT SUM(items.qty*product_nama.price+(10/100*items.qty*product_nama.price)) FROM product_nama INNER JOIN items ON items.id_item = product_nama.id where id_Pembeli=?) WHERE id=? ",
        [id_Pembeli, id_Pembeli]
      );
      connection.query(
        "SELECT * FROM status where id=?",
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
  search: item => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product_nama WHERE nama LIKE '${item}%'`,
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
  dataOfitems: No_Pembeli => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT id_item FROM items WHERE id_Pembeli=?",
        No_Pembeli,
        (err, items) => {
          if (!err) {
            resolve(items);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  record: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT (SELECT SUM(price) FROM status WHERE YEAR(timeFinal)=YEAR(NOW()) and statusNow=1 GROUP BY YEAR(timeFinal)) AS year_omzet, (SELECT sum(price) FROM status WHERE timeFinal=CURRENT_DATE and statusNow=1) as income_today, (SELECT COUNT(id) FROM status WHERE YEARWEEK(timeFinal)=YEARWEEK(NOW()) and statusNow=1 GROUP BY YEARWEEK(timeFinal)) AS order_week,((((SELECT COUNT(id) FROM status WHERE YEARWEEK(timeFinal)=YEARWEEK(NOW()) and statusNow=1 GROUP BY YEARWEEK(timeFinal))-(SELECT COUNT(id) FROM status WHERE YEARWEEK(timeFinal)=(YEARWEEK(NOW())-1) and statusNow=1 GROUP BY YEARWEEK(timeFinal)))/(SELECT COUNT(id) FROM status WHERE YEARWEEK(timeFinal)=(YEARWEEK(NOW())-1) and statusNow=1 GROUP BY YEARWEEK(timeFinal)))*100) as persentaseWeek_order,((((SELECT SUM(price) FROM status WHERE timeFinal=CURRENT_DATE and statusNow=1)-(SELECT SUM(price) FROM status WHERE timeFinal=(CURRENT_DATE-1) and statusNow=1))/(SELECT SUM(price) FROM status WHERE timeFinal=(CURRENT_DATE-1) and statusNow=1))*100) as persentaseDay_omzet",
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
  updateStatus: id => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE status SET statusNow=(-1) WHERE timefinal<=CURRENT_DATE-1 and status.statusNow!=1",
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
  history: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * from status where statusNow=1 ORDER BY id desc",
        (err, result) => {
          if (!err) {
            resolve(result);
            console.log(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  history_buy: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT MAX(id)+1 as last_id from status where statusNow=1",
        (err, result) => {
          if (!err) {
            resolve(result);
            console.log(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  historyBuyer: id => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT items.id_Pembeli as name, items.qty as qty, product_nama.Image FROM items INNER JOIN product_nama ON items.id_item=product_nama.id WHERE items.id_Pembeli=?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
            console.log(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};
