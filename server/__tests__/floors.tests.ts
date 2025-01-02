import request from "supertest";
import app from "../app";
import DatabaseConnection from "../database/DatabaseConnection";
import { hash } from "bcrypt";

jest.mock("mongodb");

describe("Floors endpoints", () => {
  let mockGetCollection: jest.Mock;
  let mockConnect: jest.Mock;

  beforeEach(() => {
    mockGetCollection = jest.fn();
    mockConnect = jest.fn();

    jest
      .spyOn(DatabaseConnection.prototype, "connect")
      .mockImplementation(mockConnect);
    jest
      .spyOn(DatabaseConnection.prototype, "getCollection")
      .mockImplementation(mockGetCollection);

    const mockInstance = new DatabaseConnection();
    jest.spyOn(DatabaseConnection, "getInstance").mockReturnValue(mockInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //
  // ========== Get floors ==========
  //

  test("getting floors, signed in, expect success", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };
    const floor1 = {
      _id: "f1",
      projectId: "p1",
      floorPlanPath: "",
      title: "Floor 1",
      createdAt: 1,
      editedAt: 1
    };
    const floor2 = {
      _id: "f2",
      projectId: "p1",
      floorPlanPath: "",
      title: "Floor 2",
      createdAt: 1,
      editedAt: 1
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue([floor1, floor2])
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const signInRes = await request(app)
      .post("/signin")
      .send(signInPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(signInRes.statusCode).toEqual(200);
    expect(signInRes.body).toEqual({ success: true });

    const cookies = signInRes.headers["set-cookie"];

    const res = await request(app).get("/floors/p1").set("Cookie", cookies);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(floor1),
        expect.objectContaining(floor2)
      ])
    );
  });

  test("getting floors, not signed in, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };
    const floor1 = {
      _id: "f1",
      projectId: "p1",
      floorPlanPath: "",
      title: "Floor 1",
      createdAt: 1,
      editedAt: 1
    };
    const floor2 = {
      _id: "f2",
      projectId: "p1",
      floorPlanPath: "",
      title: "Floor 2",
      createdAt: 1,
      editedAt: 1
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue([floor1, floor2])
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const res = await request(app).get("/floors/p1");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });

  //
  // ========== Get floor ==========
  //

  test("getting a floor, signed in, expect success", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };
    const floor1 = {
      _id: "f1",
      projectId: "p1",
      floorPlanPath: "",
      title: "Floor 1",
      createdAt: 1,
      editedAt: 1
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      findOne: jest.fn().mockResolvedValue(floor1)
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const signInRes = await request(app)
      .post("/signin")
      .send(signInPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(signInRes.statusCode).toEqual(200);
    expect(signInRes.body).toEqual({ success: true });

    const cookies = signInRes.headers["set-cookie"];

    const res = await request(app).get("/floor/1").set("Cookie", cookies);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(floor1);
  });

  test("getting a floor, signed in, incorrect id, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      findOne: jest.fn().mockResolvedValue(null)
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const signInRes = await request(app)
      .post("/signin")
      .send(signInPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(signInRes.statusCode).toEqual(200);
    expect(signInRes.body).toEqual({ success: true });

    const cookies = signInRes.headers["set-cookie"];

    const res = await request(app).get("/floor/3").set("Cookie", cookies);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: "Floor not found", statusCode: 400 });
  });

  test("getting a floor, not signed in, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };
    const floor1 = {
      _id: "f1",
      projectId: "p1",
      floorPlanPath: "",
      title: "Floor 1",
      createdAt: 1,
      editedAt: 1
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      findOne: jest.fn().mockResolvedValue(floor1)
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const res = await request(app).get("/floor/1");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });

  //
  // ========== Create floor ==========
  //

  test("creating a floor, signed in, expect success", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      insertOne: jest.fn().mockResolvedValue({
        insertedId: "1"
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const signInRes = await request(app)
      .post("/signin")
      .send(signInPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(signInRes.statusCode).toEqual(200);
    expect(signInRes.body).toEqual({ success: true });

    const cookies = signInRes.headers["set-cookie"];

    const res = await request(app)
      .post("/floor")
      .set("Cookie", cookies)
      .send({ title: "Draft", projectId: "p1" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ id: "1" });
  });

  test("creating a floor, signed in, incorrect input data, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      insertOne: jest.fn().mockResolvedValue({
        insertedId: "1"
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const signInRes = await request(app)
      .post("/signin")
      .send(signInPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(signInRes.statusCode).toEqual(200);
    expect(signInRes.body).toEqual({ success: true });

    const cookies = signInRes.headers["set-cookie"];

    const res = await request(app)
      .post("/floor")
      .set("Cookie", cookies)
      .send({ projectId: "p1" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'Validation error: "title" is required',
      statusCode: 400
    });
  });

  test("creating a floor, not signed in, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      insertOne: jest.fn().mockResolvedValue({
        insertedId: "1"
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const res = await request(app)
      .post("/floor")
      .send({ title: "Draft" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });

  //
  // ========== Update floor ==========
  //

  test("updating a floor, signed in, expect success", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const patchFloorPayload = {
      title: "New title",
      floorPlanPath: ""
    };

    const signInRes = await request(app)
      .post("/signin")
      .send(signInPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(signInRes.statusCode).toEqual(200);
    expect(signInRes.body).toEqual({ success: true });

    const cookies = signInRes.headers["set-cookie"];

    const res = await request(app)
      .patch("/floor/1")
      .send(patchFloorPayload)
      .set("Cookie", cookies)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ success: true });
  });

  test("updating a floor, signed in, incorrect floor id, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 0 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const patchFloorPayload = {
      title: "New title",
      floorPlanPath: ""
    };

    const signInRes = await request(app)
      .post("/signin")
      .send(signInPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(signInRes.statusCode).toEqual(200);
    expect(signInRes.body).toEqual({ success: true });

    const cookies = signInRes.headers["set-cookie"];

    const res = await request(app)
      .patch("/floor/1")
      .send(patchFloorPayload)
      .set("Cookie", cookies)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "Floor not found, no changes were made",
      statusCode: 400
    });
  });

  test("updating a floor, signed in, incorrect input data, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const patchFloorPayload = {
      title: "New title"
    };

    const signInRes = await request(app)
      .post("/signin")
      .send(signInPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(signInRes.statusCode).toEqual(200);
    expect(signInRes.body).toEqual({ success: true });

    const cookies = signInRes.headers["set-cookie"];

    const res = await request(app)
      .patch("/floor/1")
      .send(patchFloorPayload)
      .set("Cookie", cookies)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'Validation error: "floorPlanPath" is required',
      statusCode: 400
    });
  });

  test("updating a floor, not signed in, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const patchFloorPayload = {
      title: "New title",
      floorPlanPath: ""
    };

    const res = await request(app)
      .patch("/floor/1")
      .send(patchFloorPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });

  //
  // ========== Delete floor ==========
  //

  test("deleting a floor, signed in, expect success", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const signInRes = await request(app)
      .post("/signin")
      .send(signInPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(signInRes.statusCode).toEqual(200);
    expect(signInRes.body).toEqual({ success: true });

    const cookies = signInRes.headers["set-cookie"];

    const res = await request(app).delete("/floor/1").set("Cookie", cookies);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ success: true });
  });

  test("deleting a floor, signed in, incorrect floor id, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 0 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const signInRes = await request(app)
      .post("/signin")
      .send(signInPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(signInRes.statusCode).toEqual(200);
    expect(signInRes.body).toEqual({ success: true });

    const cookies = signInRes.headers["set-cookie"];

    const res = await request(app).delete("/floor/1").set("Cookie", cookies);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "Floor not found, no changes were made",
      statusCode: 400
    });
  });

  test("deleting a floor, not signed in, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockFloorCollection = {
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "floors") {
        return mockFloorCollection;
      }
      return null;
    });

    const res = await request(app).delete("/floor/1");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });
});
