import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../auth/useAuth";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [role, setRole] = useState("");
  const [editSweet, setEditSweet] = useState(null);
  const [purchaseSweet, setPurchaseSweet] = useState(null);
  const [purchaseQty, setPurchaseQty] = useState("");

  const { token, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch sweets
  const loadSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error("Error fetching sweets:", err);
    }
  };

  const getUserRole = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.role) setRole(storedUser.role);
    } catch (err) {
      console.error("Error fetching user role:", err);
    }
  };

  useEffect(() => {
    if (token) {
      getUserRole();
      loadSweets();
    }
  }, [token]);

  // 🧁 Add new sweet (Admin)
  const handleAddSweet = async (e) => {
    e.preventDefault();
    if (!name || !price || !quantity) return alert("Please fill all fields");
    try {
      await api.post("/sweets", { name, category, price, quantity });
      setName("");
      setCategory("");
      setPrice("");
      setQuantity("");
      loadSweets();
      alert("Sweet added successfully!");
    } catch (err) {
      alert("Add sweet failed (Admin only)");
      console.error(err);
    }
  };

  // ✏️ Begin editing
  const handleEditClick = (sweet) => {
    setEditSweet({ ...sweet });
  };

  // 💾 Save edited sweet
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/sweets/${editSweet._id}`, {
        name: editSweet.name,
        category: editSweet.category,
        price: editSweet.price,
        quantity: editSweet.quantity,
      });
      setEditSweet(null);
      loadSweets();
      alert("Sweet updated successfully!");
    } catch (err) {
      alert("Update failed (Admin only)");
      console.error(err);
    }
  };

  const handleCancelEdit = () => setEditSweet(null);

  // 🗑️ Delete sweet
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sweet?")) return;
    try {
      await api.delete(`/sweets/${id}`);
      loadSweets();
      alert("Sweet deleted successfully!");
    } catch (err) {
      alert("Delete failed (Admin only)");
      console.error(err);
    }
  };

  // 🛒 Begin purchase
  const handlePurchaseClick = (sweet) => {
    setPurchaseSweet({ ...sweet });
    setPurchaseQty("");
  };

  // 💳 Confirm purchase
  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();
    const qty = parseInt(purchaseQty, 10);

    if (!qty || qty <= 0) return alert("Please enter a valid quantity.");
    if (qty > purchaseSweet.quantity)
      return alert("Not enough stock available.");

    try {
      await api.post(`/sweets/${purchaseSweet._id}/purchase`, { quantity: qty });
      setPurchaseSweet(null);
      setPurchaseQty("");
      loadSweets();
      alert(`Successfully purchased ${qty} sweet(s)!`);
    } catch (err) {
      console.error("Purchase failed:", err);
      alert("Purchase failed. Please try again.");
    }
  };

  const handleCancelPurchase = () => {
    setPurchaseSweet(null);
    setPurchaseQty("");
  };

  // 🚪 Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>🍬 Sweet Shop Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
      <p className="role-text">Current Role: {role || "none"}</p>

      {/* 🧁 Add Sweet (Admin only) */}
      {role === "admin" && (
        <div className="add-sweet-section">
          <h2>Add New Sweet</h2>
          <form onSubmit={handleAddSweet} className="sweet-form">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              placeholder="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button type="submit">Add Sweet</button>
          </form>
        </div>
      )}

      {/* 🍫 Sweet List */}
      <div className="sweet-list">
        {sweets.length === 0 ? (
          <p>No sweets available.</p>
        ) : (
          sweets.map((s) => {
            const isEditing = editSweet && editSweet._id === s._id;
            const isPurchasing = purchaseSweet && purchaseSweet._id === s._id;

            return (
              <div key={s._id} className="sweet-card">
                {isEditing ? (
                  <form onSubmit={handleUpdate} className="edit-form">
                    <h3>Editing: {s.name}</h3>
                    <input
                      value={editSweet.name}
                      onChange={(e) =>
                        setEditSweet({ ...editSweet, name: e.target.value })
                      }
                    />
                    <input
                      value={editSweet.category}
                      onChange={(e) =>
                        setEditSweet({ ...editSweet, category: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      value={editSweet.price}
                      onChange={(e) =>
                        setEditSweet({
                          ...editSweet,
                          price: Number(e.target.value),
                        })
                      }
                    />
                    <input
                      type="number"
                      value={editSweet.quantity}
                      onChange={(e) =>
                        setEditSweet({
                          ...editSweet,
                          quantity: Number(e.target.value),
                        })
                      }
                    />
                    <div className="action-buttons">
                      <button type="submit">💾 Save</button>
                      <button type="button" onClick={handleCancelEdit}>
                        ❌ Cancel
                      </button>
                    </div>
                  </form>
                ) : isPurchasing ? (
                  <form onSubmit={handlePurchaseSubmit} className="purchase-form">
                    <h3>Buying: {s.name}</h3>
                    <p>Available: {s.quantity}</p>
                    <input
                      type="number"
                      placeholder="Enter quantity"
                      value={purchaseQty}
                      onChange={(e) => setPurchaseQty(e.target.value)}
                    />
                    <div className="action-buttons">
                      <button type="submit">✅ Confirm</button>
                      <button type="button" onClick={handleCancelPurchase}>
                        ❌ Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3>{s.name}</h3>
                    <p>Category: {s.category}</p>
                    <p>Price: ₹{s.price}</p>
                    <p>Quantity: {s.quantity}</p>
                    <button
                      onClick={() => handlePurchaseClick(s)}
                      disabled={s.quantity <= 0}
                    >
                      {s.quantity > 0 ? "Purchase" : "Out of stock"}
                    </button>
                    {role === "admin" && (
                      <>
                        <button onClick={() => handleEditClick(s)}>✏️ Edit</button>
                        <button onClick={() => handleDelete(s._id)}>🗑️ Delete</button>
                      </>
                    )}
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
