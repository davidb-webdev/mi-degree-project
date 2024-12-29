import request from "supertest";
import app from "../app";
import DatabaseConnection from "../database/DatabaseConnection";
import { User } from "../models/User";
import { hash } from "bcrypt";
import { Project, ProjectStatuses } from "../models/Project";
import { ObjectId, WithId } from "mongodb";

jest.mock("mongodb");

describe("Projects endpoints", () => {
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
  // ========== Get projects ==========
  //

  test("getting projects, signed in, expect success", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };
    const project1 = {
      _id: "1",
      title: "Project 1",
      description: "Project description 1",
      status: ProjectStatuses.InProgress,
      owner: "user",
      createdAt: 1,
      editedAt: 1
    };
    const project2 = {
      _id: "2",
      title: "Project 2",
      description: "Project description 2",
      status: ProjectStatuses.Finished,
      owner: "user",
      createdAt: 2,
      editedAt: 2
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockProjectCollection = {
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue([project1, project2])
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
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

    const res = await request(app).get("/projects").set("Cookie", cookies);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(project1),
        expect.objectContaining(project2)
      ])
    );
  });

  test("getting projects, not signed in, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };
    const project1 = {
      _id: "1",
      title: "Project 1",
      description: "Project description 1",
      status: ProjectStatuses.InProgress,
      owner: "user",
      createdAt: 1,
      editedAt: 1
    };
    const project2 = {
      _id: "2",
      title: "Project 2",
      description: "Project description 2",
      status: ProjectStatuses.Finished,
      owner: "user",
      createdAt: 2,
      editedAt: 2
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockProjectCollection = {
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue([project1, project2])
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
      }
      return null;
    });

    const res = await request(app).get("/projects");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });

  //
  // ========== Get project ==========
  //

  test("getting a project, signed in, expect success", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };
    const project1 = {
      _id: "1",
      title: "Project 1",
      description: "Project description 1",
      status: ProjectStatuses.InProgress,
      owner: "user",
      createdAt: 1,
      editedAt: 1
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockProjectCollection = {
      findOne: jest.fn().mockResolvedValue(project1)
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
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

    const res = await request(app).get("/project/1").set("Cookie", cookies);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(project1);
  });

  test("getting a project, signed in, incorrect id, expect failure", async () => {
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
    const mockProjectCollection = {
      findOne: jest.fn().mockResolvedValue(null)
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
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

    const res = await request(app).get("/project/3").set("Cookie", cookies);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: "Project not found", statusCode: 400 });
  });

  test("getting a project, not signed in, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };
    const project1 = {
      _id: "1",
      title: "Project 1",
      description: "Project description 1",
      status: ProjectStatuses.InProgress,
      owner: "user",
      createdAt: 1,
      editedAt: 1
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockProjectCollection = {
      findOne: jest.fn().mockResolvedValue(project1)
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const res = await request(app).get("/project/1");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });

  //
  // ========== Create project ==========
  //

  test("creating a project, signed in, expect success", async () => {
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
    const mockProjectCollection = {
      insertOne: jest.fn().mockResolvedValue({
        insertedId: "1"
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
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

    const res = await request(app).post("/project").set("Cookie", cookies);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ id: "1" });
  });

  test("creating a project, not signed in, expect failure", async () => {
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
    const mockProjectCollection = {
      insertOne: jest.fn().mockResolvedValue({
        insertedId: "1"
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
      }
      return null;
    });

    const res = await request(app).post("/project");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });

  //
  // ========== Update project ==========
  //

  test("updating a project, signed in, expect success", async () => {
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
    const mockProjectCollection = {
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const patchProjectPayload = {
      title: "New title",
      description: "New description",
      status: "InProgress"
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
      .patch("/project/1")
      .send(patchProjectPayload)
      .set("Cookie", cookies)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ success: true });
  });

  test("updating a project, signed in, incorrect project id, expect failure", async () => {
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
    const mockProjectCollection = {
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 0 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const patchProjectPayload = {
      title: "New title",
      description: "New description",
      status: "InProgress"
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
      .patch("/project/1")
      .send(patchProjectPayload)
      .set("Cookie", cookies)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: "Project not found, no changes were made", statusCode: 400 });
  });

  test("updating a project, signed in, incorrect input data, expect failure", async () => {
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
    const mockProjectCollection = {
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const patchProjectPayload = {
      title: "New title",
      description: "New description",
      status: null
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
      .patch("/project/1")
      .send(patchProjectPayload)
      .set("Cookie", cookies)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message:
        'Validation error: "status" must be one of [Draft, InProgress, Finished],"status" must be a string',
      statusCode: 400
    });
  });

  test("updating a project, not signed in, expect failure", async () => {
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
    const mockProjectCollection = {
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
      }
      return null;
    });

    const patchProjectPayload = {
      title: "New title",
      description: "New description",
      status: null
    };

    const res = await request(app)
      .patch("/project/1")
      .send(patchProjectPayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });

  //
  // ========== Delete project ==========
  //

  test("deleting a project, signed in, expect success", async () => {
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
    const mockProjectCollection = {
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
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

    const res = await request(app).delete("/project/1").set("Cookie", cookies);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ success: true });
  });

  test("deleting a project, signed in, incorrect project id, expect failure", async () => {
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
    const mockProjectCollection = {
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 0 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
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

    const res = await request(app).delete("/project/1").set("Cookie", cookies);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: "Project not found, no changes were made", statusCode: 400 });
  });

  test("deleting a project, not signed in, expect failure", async () => {
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
    const mockProjectCollection = {
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "projects") {
        return mockProjectCollection;
      }
      return null;
    });

    const res = await request(app).delete("/project/1");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({ message: "You are not signed in", statusCode: 401 });
  });
});
