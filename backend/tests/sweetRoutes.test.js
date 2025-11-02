import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import dotenv from "dotenv";

dotenv.config();

let token;
let sweetId;

beforeAll(async () => {
  // ✅ Connect to DB
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // ✅ Register admin (ignore if already exists)
  await request(app)
    .post("/api/auth/register")
    .send({ username: "testadmin", password: "admin123", role: "admin" });

  // ✅ Login admin to get JWT
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ username: "testadmin", password: "admin123" });

  token = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("🍬 Sweet Routes", () => {
  test("POST /api/sweets → should create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gulab Jamun",
        category: "Dessert",
        price: 15,
        quantity: 10,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name || res.body.sweet?.name).toBe("Gulab Jamun");

    // ✅ Store the sweet ID for next tests
    sweetId = res.body._id || res.body.sweet?._id;
    expect(sweetId).toBeDefined();
  });

  test("GET /api/sweets → should return all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("PUT /api/sweets/:id → should update a sweet", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ price: 20 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(20);
  });

  test("POST /api/sweets/:id/purchase → should reduce quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(8);
  });

  test("DELETE /api/sweets/:id → should delete the sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message || res.body._id).toBeDefined();
  });
});
