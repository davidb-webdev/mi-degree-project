import request from "supertest";
import app from "../app";
import DatabaseConnection from "../database/DatabaseConnection";
import { hash } from "bcrypt";

jest.mock("mongodb");

describe("Notes endpoints", () => {
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
  // ========== Get notes ==========
  //

  test("getting notes, signed in, expect success", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };
    const note1 = {
      _id: "n1",
      title: "Note 1",
      category: "BlockedEscapeRoute",
      description: "Desc",
      floorId: "f1",
      xCoordinate: 1,
      yCoordinate: 1,
      createdAt: 1,
      editedAt: 1
    };
    const note2 = {
      _id: "n2",
      title: "Note 1",
      category: "BlockedEscapeRoute",
      description: "Desc",
      floorId: "f1",
      xCoordinate: 1,
      yCoordinate: 1,
      createdAt: 1,
      editedAt: 1
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockNoteCollection = {
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue([note1, note2])
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
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

    const res = await request(app).get("/notes/f1").set("Cookie", cookies);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(note1),
        expect.objectContaining(note2)
      ])
    );
  });

  test("getting notes, not signed in, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };
    const note1 = {
      _id: "n1",
      title: "Note 1",
      category: "BlockedEscapeRoute",
      description: "Desc",
      floorId: "f1",
      xCoordinate: 1,
      yCoordinate: 1,
      createdAt: 1,
      editedAt: 1
    };
    const note2 = {
      _id: "n2",
      title: "Note 1",
      category: "BlockedEscapeRoute",
      description: "Desc",
      floorId: "f1",
      xCoordinate: 1,
      yCoordinate: 1,
      createdAt: 1,
      editedAt: 1
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockNoteCollection = {
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue([note1, note2])
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
      }
      return null;
    });

    const res = await request(app).get("/notes/f1");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });

  //
  // ========== Get note ==========
  //

  test("getting a note, signed in, expect success", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };
    const note1 = {
      _id: "n1",
      title: "Note 1",
      category: "BlockedEscapeRoute",
      description: "Desc",
      floorId: "f1",
      xCoordinate: 1,
      yCoordinate: 1,
      createdAt: 1,
      editedAt: 1
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockNoteCollection = {
      findOne: jest.fn().mockResolvedValue(note1)
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
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

    const res = await request(app).get("/note/n1").set("Cookie", cookies);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(note1);
  });

  test("getting a note, signed in, incorrect id, expect failure", async () => {
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
    const mockNoteCollection = {
      findOne: jest.fn().mockResolvedValue(null)
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
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

    const res = await request(app).get("/note/3").set("Cookie", cookies);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: "Note not found", statusCode: 400 });
  });

  test("getting a note, not signed in, expect failure", async () => {
    const password = "1234567890";
    const hashedPassword = await hash(password, 10);
    const user = {
      _id: "user",
      name: "user",
      email: "email@example.com",
      password: hashedPassword
    };
    const note1 = {
      _id: "n1",
      title: "Note 1",
      category: "BlockedEscapeRoute",
      description: "Desc",
      floorId: "f1",
      xCoordinate: 1,
      yCoordinate: 1,
      createdAt: 1,
      editedAt: 1
    };

    const mockUserCollection = {
      findOne: jest.fn().mockResolvedValue(user)
    };
    const mockNoteCollection = {
      findOne: jest.fn().mockResolvedValue(note1)
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const res = await request(app).get("/notes/1");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });

  //
  // ========== Create note ==========
  //

  test("creating a note, signed in, expect success", async () => {
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
    const mockNoteCollection = {
      insertOne: jest.fn().mockResolvedValue({
        insertedId: "1"
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
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
      .post("/note")
      .set("Cookie", cookies)
      .send({ title: "Draft", floorId: "f1" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ id: "1" });
  });

  test("creating a note, signed in, incorrect input data, expect failure", async () => {
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
    const mockNoteCollection = {
      insertOne: jest.fn().mockResolvedValue({
        insertedId: "1"
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
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
      .post("/note")
      .set("Cookie", cookies)
      .send({ floorId: "f1" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'Validation error: "title" is required',
      statusCode: 400
    });
  });

  test("creating a note, not signed in, expect failure", async () => {
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
    const mockNoteCollection = {
      insertOne: jest.fn().mockResolvedValue({
        insertedId: "1"
      })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
      }
      return null;
    });

    const res = await request(app)
      .post("/note")
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
  // ========== Update note ==========
  //

  test("updating a note, signed in, expect success", async () => {
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
    const mockNoteCollection = {
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const patchNotePayload = {
      title: "New title",
      description: "Desc",
      category: "BlockedEscapeRoute",
      xCoordinate: 1,
      yCoordinate: 1
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
      .patch("/note/1")
      .send(patchNotePayload)
      .set("Cookie", cookies)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ success: true });
  });

  test("updating a note, signed in, incorrect note id, expect failure", async () => {
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
    const mockNoteCollection = {
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 0 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const patchNotePayload = {
      title: "New title",
      description: "Desc",
      category: "BlockedEscapeRoute",
      xCoordinate: 1,
      yCoordinate: 1
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
      .patch("/note/1")
      .send(patchNotePayload)
      .set("Cookie", cookies)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "Note not found, no changes were made",
      statusCode: 400
    });
  });

  test("updating a note, signed in, incorrect input data, expect failure", async () => {
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
    const mockNoteCollection = {
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
      }
      return null;
    });

    const signInPayload = {
      email: user.email,
      password: password
    };

    const patchNotePayload = {
      title: "New title",
      description: "Desc",
      xCoordinate: 1,
      yCoordinate: 1
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
      .patch("/note/1")
      .send(patchNotePayload)
      .set("Cookie", cookies)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'Validation error: "category" is required',
      statusCode: 400
    });
  });

  test("updating a note, not signed in, expect failure", async () => {
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
    const mockNoteCollection = {
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
      }
      return null;
    });

    const patchNotePayload = {
      title: "New title",
      description: "Desc",
      category: "BlockedEscapeRoute",
      xCoordinate: 1,
      yCoordinate: 1
    };

    const res = await request(app)
      .patch("/note/1")
      .send(patchNotePayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });

  //
  // ========== Delete note ==========
  //

  test("deleting a note, signed in, expect success", async () => {
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
    const mockNoteCollection = {
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
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

    const res = await request(app).delete("/note/1").set("Cookie", cookies);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ success: true });
  });

  test("deleting a note, signed in, incorrect note id, expect failure", async () => {
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
    const mockNoteCollection = {
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 0 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
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

    const res = await request(app).delete("/note/1").set("Cookie", cookies);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "Note not found, no changes were made",
      statusCode: 400
    });
  });

  test("deleting a note, not signed in, expect failure", async () => {
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
    const mockNoteCollection = {
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 })
    };

    mockGetCollection.mockImplementation((collectionName) => {
      if (collectionName === "users") {
        return mockUserCollection;
      } else if (collectionName === "notes") {
        return mockNoteCollection;
      }
      return null;
    });

    const res = await request(app).delete("/note/1");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });
});
