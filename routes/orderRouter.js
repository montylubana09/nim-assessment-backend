const { Router } = require("express");
const orderController = require("../controllers/orderController");

const orderRouter = Router();

orderRouter.get("/", orderController.getAll);
// orderRouter.get("/:id", orderController.getOne);
orderRouter.get("/status", orderController.getByStatus);
orderRouter.post("/", orderController.create);
orderRouter.put("/:id", orderController.update);
orderRouter.delete("/:id", orderController.remove);
orderRouter.get("/total-sales", orderController.getTotalSales);

module.exports = orderRouter;
