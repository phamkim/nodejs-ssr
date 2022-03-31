"use strict";
const sql = require("./db");
class BangDia {
  constructor(bangDia) {
    this.tenBangDia = bangDia?.tenBangDia;
    this.theLoai = bangDia?.theLoai;
    this.nhaSX = bangDia?.nhaSX;
    this.noiDung = bangDia?.noiDung;
  }
  getProperties() {
    return {
      tenBangDia: this.tenBangDia,
      theLoai: this.theLoai,
      nhaSX: this.nhaSX,
      noiDung: this.noiDung,
    };
  }
  insert(result) {
    const data = this.getProperties();
    sql.query("INSERT INTO bangdia SET ?", data, (err, res) => {
      if (err) {
        console.log("err", err);
        result(err, null);
        return;
      }
      console.log("inserted:", { id: res.insertId });
      result(null, {
        id: res.insertId,
        ...data,
      });
    });
  }
  getById(id, result) {
    sql.query(`SELECT * FROM bangdia WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("err", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found with the id
      result({ kind: "not_found" }, null);
    });
  }
  getAll(tenBangDia, result) {
    let query = "SELECT * FROM bangdia";
    if (tenBangDia) {
      query += ` WHERE tenBangDia LIKE '%${tenBangDia}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("bangDia: ", res);
      result(null, res);
    });
  }
  update(id, result) {
    const data = this.getProperties();
    sql.query("UPDATE bangdia SET ? WHERE id = ?", [data, id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found  with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated : ", { id: id, ...data });
      result(null, { id: id, ...data });
    });
  }

  delete(id, result) {
    sql.query("DELETE FROM bangdia WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted with id: ", id);
      result(null, res);
    });
  }
}

module.exports = BangDia;
