const { Router } = require("express");
const {
  getAll,
  getOne,
  create,
  updateOne
  
} = require("../controllers/menuController");
// const Menu = require("../db/models/menuItems");
// const { MenuItems } = require("../db/models/menuItems");

const menuRouter = Router();

menuRouter.get("/", getAll);
menuRouter.get("/:id", getOne);
menuRouter.post("/", create);

menuRouter.put("/:id", updateOne);


module.exports = menuRouter;
