// 1. Should return response code 200
// 2. Should return token
// 3. Should return object user = {email: String, subscription: String}

require("dotenv").config();

const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const { User } = require("../models/user");

mongoose.set("strictQuery", false);
const { DB_HOST_TEST } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
  });

  beforeEach(async () => {
    await User.deleteMany();
    await supertest(app).post("/api/auth/register").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_HOST_TEST);
  });

  it("Should return response code 200", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(200);
  });

  it("Should return token", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });
    expect(response.body.token).toBeDefined();
  });

  it("Should return object user = {email: String, subscription: String}", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });
    console.log(response.body.user);
    expect(response.body.user).toMatchObject({
      email: "testUser1@gmail.com",
      suscription: "starter",
    });
  });
});
