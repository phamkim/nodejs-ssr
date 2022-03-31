"use strict";
const BangDia = require("../models/BangDia");

class BangDiaCtrl {
  getAll(req, res) {
    res.locals.deleted = req.query.deleted;
    const tenBangDia = req.query.tenBangDia;
    const bangDias = new BangDia();
    bangDias.getAll(tenBangDia, (err, data) => {
      if (err) res.redirect("/500");
      else res.render("bangDia/index", { bangDias: data });
    });
  }

  // show form create bang dia
  create(req, res) {
    res.locals.status = req.query.status;
    res.render("bangDia/create");
  }

  save(req, res) {
    if (!req.body) {
      res.redirect("bangDia/create?status=error");
    }
    const newBangDia = new BangDia(req.body);
    newBangDia.insert((err, result) => {
      if (err) res.redirect("/bangDia/create?status=error");
      else {
        console.log(result);
        res.redirect("/bangDia");
      }
    });
  }

  edit(req, res) {
    res.locals.status = req.query.status;
    const newBangDia = new BangDia();
    newBangDia.getById(req.params.id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.redirect("/404");
        } else {
          res.redirect("/500");
        }
      } else res.render("bangDia/edit", { bangDia: result });
    });
  }

  update(req, res) {
    const newBangDia = new BangDia(req.body);
    newBangDia.update(req.params.id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.redirect("/404");
        } else {
          res.redirect("/500");
        }
      } else {
        res.redirect("/bangDia");
      }
    });

  }

  delete(req, res) {
    const bangDia = new BangDia();
    bangDia.delete(req.params.id, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.redirect("/404");
        } else {
          res.redirect("/500");
        }
      } else res.redirect("/bangDia?deleted=true");
    });
  }
}

module.exports = new BangDiaCtrl();
