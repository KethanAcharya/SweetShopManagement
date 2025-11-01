import Sweet from "../models/Sweet.js";

export const getSweets = async (_, res) => res.json(await Sweet.find());
export const addSweet = async (req, res) => res.json(await Sweet.create(req.body));
export const updateSweet = async (req, res) => res.json(await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true }));
export const deleteSweet = async (req, res) => res.json(await Sweet.findByIdAndDelete(req.params.id));
export const purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) return res.status(404).json({ error: "Not found" });
  if (sweet.quantity <= 0) return res.status(400).json({ error: "Out of stock" });
  sweet.quantity -= 1; await sweet.save(); res.json(sweet);
};
export const restockSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  sweet.quantity += 1; await sweet.save(); res.json(sweet);
};
