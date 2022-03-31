const router = require("express").Router();
const bangDiaCtrl = require("../controllers/bangDia.controller");

module.exports = (app) => {
  router.get("/", bangDiaCtrl.getAll);
  router.get("/create", bangDiaCtrl.create);
  router.post("/", bangDiaCtrl.save);
  router.get("/delete/:id", bangDiaCtrl.delete);
  router.put("/:id", bangDiaCtrl.update);
  router.get("/edit/:id",bangDiaCtrl.edit);

  app.use("/bangDia", router);
};
