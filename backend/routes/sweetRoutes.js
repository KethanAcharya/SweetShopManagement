import express from "express";
import {
  getSweets, addSweet, updateSweet, deleteSweet,
  purchaseSweet, restockSweet
} from "../controllers/sweetController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", protect, getSweets);
router.post("/", protect, adminOnly, addSweet);
router.put("/:id", protect, adminOnly, updateSweet);
router.delete("/:id", protect, adminOnly, deleteSweet);
router.post("/:id/purchase", protect, purchaseSweet);
router.post("/:id/restock", protect, adminOnly, restockSweet);

export default router;
