const { Item } = require("../models");

const sellItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(401).json({
        message: "Image is required",
      });
    }

    const user_id = req.userId;
    const { name, description, price } = req.body;
    const img_url = req.file.path;

    await Item.create({
      user_id,
      name,
      img_url,
      description,
      price,
    });
    res.status(201).json({ message: "Item successfully created!" });
  } catch (error) {
    res.status(500).json(error)
  }
};

const onsell = async (req, res) => {
  const ItemsOnSell = await Item.findAll({
    where: {
      sold: false,
    },
  });

  res.json(ItemsOnSell);
};

const onsellPage = async (req, res) => {
  try {
    const page = Number.parseInt(req.params.page);
    const pageSize = 15;
    const offset = (page - 1) * 15;
    const limit = pageSize;

    const ItemsOnSell = await Item.findAll({
      where: {
        sold: false,
      },
      offset,
      limit,
    });

    res.json(ItemsOnSell);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  sellItem,
  onsell,
  onsellPage,
};
