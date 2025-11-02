import React from "react";

export default function SweetCard({
  sweet,
  onPurchase,
  onUpdate,
  onDelete,
  isAdmin,
}) {
  return (
    <div className="sweet-card">
      <h3>{sweet.name}</h3>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Quantity: {sweet.quantity}</p>

      <button onClick={onPurchase} disabled={sweet.quantity <= 0}>
        {sweet.quantity > 0 ? "Purchase" : "Out of stock"}
      </button>

      {isAdmin && (
        <>
          <button onClick={onUpdate}>Update</button>
          <button className="btn-delete" onClick={onDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}
