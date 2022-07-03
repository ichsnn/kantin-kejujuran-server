const { Item } = require("../models");

const sellItem = async (req, res) => {  
  if(!req.file) {
    return res.status(401).json({
      message: "Image is required",
    });
  }
  
  const {user_id, name, description, price} = req.body
  const img_url = req.file.path;

  await Item.create(
    {
      user_id,
      name,
      img_url,
      description,
      price,
    },
  )
  res.status(201).json({message: "Item successfully created!"})
}

module.exports = {
  sellItem
}