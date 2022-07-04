const { Item, User, BalanceTransaction, ItemTranscation } = require("../models");

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
    res.status(500).json(error);
  }
};

const buyItem = async (req, res) => {
  const { id } = req.body;
  const user_id = req.userId;
  // get item price
  const item = await Item.findOne({
    where: {
      id,
    },
  });
  const price = item.price;
  // update item to sold
  await Item.update(
    {
      sold: true,
    },
    {
      where: {
        id,
      },
    }
  );
  // add balance to seller
  const seller = await User.findOne({
    where: {
      id: item.user_id,
    },
  });
  const newSellerBalance = parseInt(seller.balance) + parseInt(price);
  await User.update(
    {
      balance: newSellerBalance,
    },
    {
      where: {
        id: item.user_id,
      },
    }
  );

  // update user balance
  const user = await User.findOne({
    where: {
      id: user_id,
    },
  });
  const newBalance = parseInt(user.balance) - parseInt(price);
  await User.update(
    {
      balance: newBalance,
    },
    {
      where: {
        id: user_id,
      },
    }
  );
  // item transaction
  await ItemTranscation.create({
    item_id: id,
    user_id,
  });

  res.status(200).json({ message: "Item successfully bought!" });
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
  buyItem,
};
