const request = require("supertest");
const app = require("../../app");
const {
  connectToDatabase,
  disconnectFromDatabase,
} = require("../../services/mongo.db");
const { use } = require("./tasks.route");

async function loginUser() {
  const userCred = {
    email: "user1@gmail.com",
    password: "12121212",
  };

  const user = await request(app).post("/api/auth/login").send(userCred);

  return user;
}

describe("Task API", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  // Test GET requests
  describe("Test GET /tasks", () => {
    test("It should respond with 200 success", async () => {
      const user = await loginUser();

      await request(app)
        .get("/api/tasks")
        .set({ "x-auth-token": user.body.token })
        .expect(200)
        .expect("Content-Type", /json/);
    });

    test("It should respond with 403 forbiden", async () => {
      await request(app)
        .get("/api/tasks")
        .expect(403)
        .expect("Content-Type", /json/);
    });
  });

  // Test POST requests
  describe("Test POST /tasks", () => {
    const taskDate = new Date().getTime() + 1000 * 60 * 60;

    const newValidTask = {
      name: "New Task",
      description: "New Task Description",
      timeOfTask: new Date(taskDate).toISOString(),
    };

    const newInvalidTask = {
      name: "New",
      timeOfTask: new Date(taskDate).toISOString(),
    };

    test("It should respond with 201 created", async () => {
      const user = await loginUser();
      await request(app)
        .post("/api/tasks")
        .set({ "x-auth-token": user.body.token })
        .send(newValidTask)
        .expect(201)
        .expect("Content-Type", /json/);
    });

    test("It should respond with 400 bad request", async () => {
      const user = await loginUser();
      await request(app)
        .post("/api/tasks")
        .set({ "x-auth-token": user.body.token })
        .send(newInvalidTask)
        .expect(400)
        .expect("Content-Type", /json/);
    });

    test("It should respond with 403 forbiden", async () => {
      await request(app)
        .post("/api/tasks")
        .send(newInvalidTask)
        .expect(403)
        .expect("Content-Type", /json/);
    });
  });

  // Test PUT requests
  describe("Test PUT /tasks", () => {
    const taskUpdateCreds = {
      name: "New Task Updated",
    };

    test("It should respond with 200 success", async () => {
      const user = await loginUser();

      const { body: tasks } = await request(app)
        .get("/api/tasks")
        .set({ "x-auth-token": user.body.token });

      const task = tasks.find((task) => task.name === "New Task");

      const response = await request(app)
        .put(`/api/tasks/${task["_id"]}`)
        .set({ "x-auth-token": user.body.token })
        .send(taskUpdateCreds)
        .expect(200)
        .expect("Content-Type", /json/);

      expect(response.body.name).toStrictEqual("New Task Updated");
    });

    test("It should respond with 404 not found", async () => {
      const user = await loginUser();

      await request(app)
        .put("/api/tasks/625c5479a59ea97865b53e12") // Non existent objectId //
        .set({ "x-auth-token": user.body.token })
        .send(taskUpdateCreds)
        .expect(404)
        .expect("Content-Type", /json/);
    });

    test("It should respond with 403 forbiden", async () => {
      const user = await loginUser();

      const { body: tasks } = await request(app)
        .get("/api/tasks")
        .set({ "x-auth-token": user.body.token });

      const task = tasks[0];
      await request(app)
        .put(`/api/tasks/${task["_id"]}`)
        .send(taskUpdateCreds)
        .expect(403)
        .expect("Content-Type", /json/);
    });
  });

  // Test DELETE requests
  describe("Test DELETE /tasks", () => {
    test("It should respond with 404 not found", async () => {
      const user = await loginUser();

      await request(app)
        .delete("/api/tasks/625c5479a59ea97865b53e12")
        .set({ "x-auth-token": user.body.token })
        .expect(404)
        .expect("Content-Type", /json/);
    });

    test("It should respond with 403 forbiden", async () => {
      const user = await loginUser();

      const { body: tasks } = await request(app)
        .get("/api/tasks")
        .set({ "x-auth-token": user.body.token });

      const task = tasks[0];

      await request(app)
        .delete(`/api/tasks/${task["_id"]}`)
        .expect(403)
        .expect("Content-Type", /json/);
    });

    test("It should respond with 200 success", async () => {
      const user = await loginUser();

      const { body: tasks } = await request(app)
        .get("/api/tasks")
        .set({ "x-auth-token": user.body.token });

      const task = tasks[0];

      await request(app)
        .delete(`/api/tasks/${task["_id"]}`)
        .set({ "x-auth-token": user.body.token })
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });
});
