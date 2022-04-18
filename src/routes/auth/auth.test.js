const request = require("supertest");

const app = require("../../app");
const {
  connectToDatabase,
  disconnectFromDatabase,
} = require("../../services/mongo.db");

describe("Authenticate User", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  const userCred = {
    email: "user1@gmail.com",
    password: "12121212",
  };

  describe("Login User", () => {
    test("It should respond with 200 success", async () => {
      await request(app)
        .post("/api/auth/login")
        .send(userCred)
        .expect(200)
        .expect("Content-Type", /json/);
    });

    test("It should respond with 404 not found", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "user1",
          password: "561151",
        })
        .expect(404)
        .expect("Content-Type", /json/);

      expect(response.body).toStrictEqual({
        error: { message: "Invalid email or password" },
      });
    });
  });
});
