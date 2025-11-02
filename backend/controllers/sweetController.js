import Sweet from "../models/Sweet.js";

export const getSweets = async (_, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) {
    console.error("Error fetching sweets:", err);
    res.status(500).json({ error: "Failed to fetch sweets" });
  }
};


export const addSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    console.error("Error adding sweet:", err);
    res.status(500).json({ error: "Failed to add sweet" });
  }
};

export const updateSweet = async (req, res) => {
  try {
    const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ error: "Sweet not found for update" });
    res.json(updated);
  } catch (err) {
    console.error("Error updating sweet:", err);
    res.status(500).json({ error: "Failed to update sweet" });
  }
};

export const deleteSweet = async (req, res) => {
  try {
    const deleted = await Sweet.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Sweet not found for deletion" });
    res.json({ message: "Sweet deleted successfully", sweet: deleted });
  } catch (err) {
    console.error("Error deleting sweet:", err);
    res.status(500).json({ error: "Failed to delete sweet" });
  }
};

export const purchaseSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    const qty = parseInt(quantity, 10) || 1; // default to 1 if not provided

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    if (sweet.quantity < qty)
      return res.status(400).json({ error: "Not enough stock" });

    sweet.quantity -= qty;
    const updatedSweet = await sweet.save(); // ensure you await it

    // ✅ Explicitly send updated sweet with its quantity
    res.status(200).json({
      _id: updatedSweet._id,
      name: updatedSweet.name,
      category: updatedSweet.category,
      price: updatedSweet.price,
      quantity: updatedSweet.quantity,
    });
  } catch (err) {
    console.error("Error processing purchase:", err);
    res.status(500).json({ error: "Failed to process purchase" });
  }
};


export const restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    const restockQty = parseInt(quantity, 10) || 1;

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    sweet.quantity += restockQty;
    await sweet.save();

    res.json({
      message: `Successfully restocked ${restockQty} sweet(s)`,
      newQuantity: sweet.quantity,
      sweet,
    });
  } catch (err) {
    console.error("Error restocking sweet:", err);
    res.status(500).json({ error: "Failed to restock sweet" });
  }
};
