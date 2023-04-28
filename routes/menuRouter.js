const { Router } = require("express");
const {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
  searchOne
} = require("../controllers/menuController");


const menuRouter = Router();

menuRouter.get("/", getAll);
menuRouter.get("/search", searchOne);
menuRouter.get("/:id", getOne);
menuRouter.post("/", create);
menuRouter.delete("/:id", deleteOne);
menuRouter.put("/:id", updateOne);

module.exports = menuRouter;
