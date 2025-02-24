const MenuItems = require("../db/models/menuItems.js");

const getAll = async (req, res) => {
  try {
    const menu = await MenuItems.getAll();

    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const menu = await MenuItems.getOne(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const menu = await MenuItems.create(req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteOne = async (id) => {
  const menu = await MenuItems.findByIdAndDelete(id);
  return menu.id;
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await MenuItems.updateOne(id, {
      ...req.body
    });
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const searchOne = async (req, res) => {
  try {
    const query = req.query.q;

    const menu = await MenuItems.findOne(query);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAll, getOne, create, deleteOne, updateOne, searchOne };
