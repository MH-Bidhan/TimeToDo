const request = require("supertest");
const app = require("../../app");
const errorMessage = require("../../services/error-messages");
const {
  connectToDatabase,
  disconnectFromDatabase,
} = require("../../services/mongo.db");

async function loginUser() {
  const userCred = {
    email: "testUser@gmail.com",
    password: "12345678",
  };

  const user = await request(app).post("/api/auth/login").send(userCred);

  return user;
}

describe("User API", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  //   Test POST requests
  describe("Test POST /users", () => {
    const newValidUser = {
      userName: "Test User",
      email: "testUser@gmail.com",
      password: "12345678",
      avatar: "monkey",
    };
    const newInvalidUser = {
      userName: "Test User",
      password: "12345678",
      avatar: "monkey",
    };

    test("It should respond with 201 created", async () => {
      await request(app)
        .post("/api/users")
        .send(newValidUser)
        .expect(201)
        .expect("Content-Type", /json/);
    });
    test("It should respond with 400 bad request", async () => {
      const response = await request(app)
        .post("/api/users")
        .send(newValidUser)
        .expect(400)
        .expect("Content-Type", /json/);

      expect(response.body).toStrictEqual(errorMessage.emailAlreadyInUse);
    });
    test("It should respond with 400 bad request", async () => {
      await request(app)
        .post("/api/users")
        .send(newInvalidUser)
        .expect(400)
        .expect("Content-Type", /json/);
    });

    // Test GET requests
    describe("Test GET /users", () => {
      test("It should respond with 200 success", async () => {
        const user = await loginUser();

        await request(app)
          .get("/api/users")
          .set({ "x-auth-token": user.body.token })
          .expect(200)
          .expect("Content-Type", /json/);
      });

      test("It should respond with 403 forbiden", async () => {
        await request(app)
          .get("/api/users")
          .expect(403)
          .expect("Content-Type", /json/);
      });
    });

    // Test PUT requests
    describe("Test POST /users", () => {
      const updateCreds = {
        userName: "Test User Updated",
      };

      test("It should respond with 200 success", async () => {
        const loginResponse = await loginUser();

        const { user, token } = loginResponse.body;

        const response = await request(app)
          .put(`/api/users/${user.id}`)
          .set({ "x-auth-token": token })
          .send(updateCreds)
          .expect(200)
          .expect("Content-Type", /json/);

        expect(response.body.userName).toStrictEqual("Test User Updated");
      });

      test("It should respond with 403 forbiden", async () => {
        const loginResponse = await loginUser();

        const { user } = loginResponse.body;

        await request(app)
          .put(`/api/users/${user.id}`)
          .send(updateCreds)
          .expect(403)
          .expect("Content-Type", /json/);
      });
    });

    // Test Delete requests
    describe("Test DELETE /users", () => {
      test("It should respond with 403 forbiden", async () => {
        const response = await loginUser();

        const { user } = response.body;

        await request(app)
          .delete(`/api/users/${user.id}`)
          .expect(403)
          .expect("Content-Type", /json/);
      });

      test("It should respond with 200 success", async () => {
        const response = await loginUser();

        const { user, token } = response.body;

        await request(app)
          .delete(`/api/users/${user?.id}`)
          .set({ "x-auth-token": token })
          .expect(200)
          .expect("Content-Type", /json/);
      });
    });
  });
});
