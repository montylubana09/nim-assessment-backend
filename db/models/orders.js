const mongoose = require("../db.js");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  items: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuItems"
      },

      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
orderSchema.set("toJSON", {
  virtuals: true
});
orderSchema.statics.calcTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

// order model
const Order = mongoose.model("Order", orderSchema);

const getAll = async () => {
  // populate each item
  const orders = await Order.find().populate("items.item");

  return orders;
};

const getOne = async (id) => {
  const order = await Order.findById(id).populate("items.item");
  return order;
};

const create = async (body) => {
  const order = await Order.create(body);
  return order;
};

const update = async (id, body) => {
  const order = await Order.findByIdAndUpdate(id, body, { new: true });
  return order;
};

const remove = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order.id;
};

const getTotalSales = async (fromDate, toDate) => {
  const startDate = fromDate ? new Date(fromDate) : new Date("2020-01-01");
  const endDate = toDate ? new Date(toDate) : new Date();

  const orders = await Order.find({
    updatedAt: { $gte: startDate, $lte: endDate }
  }).populate("items.item");

  const finalTotal = await orders.reduce((total, order) => {
    const itemsTotal = order.items.reduce(
      (total1, item) => total1 + item.item.price * item.quantity,
      0
    );
    return total + itemsTotal;
  }, 0);
  return JSON.stringify({ TotalSales: `$${finalTotal}` });
};

const getByStatus = async (status, fromDate, toDate) => {
  const startDate = fromDate ? new Date(fromDate) : new Date("2020-01-01");
  const endDate = toDate ? new Date(toDate) : new Date();
  const orders = await Order.find({
    $and: [{ updatedAt: { $gte: startDate, $lte: endDate } }, { status }]
  }).populate("items.item");
  return orders;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getTotalSales,
  Order,
  getByStatus
};
