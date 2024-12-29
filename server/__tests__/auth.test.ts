import request from "supertest";
import app from "../app";
import DatabaseConnection from "../database/DatabaseConnection";
import { User } from "../models/User";
import { hash } from "bcrypt";

jest.mock("mongodb");

describe("Auth endpoints", () => {
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
  // ========== Sign in ==========
  //

  test("signing in, expect success", async () => {
    const hashedPassword = await hash("1234567890", 10);
    const mockCollection = {
      findOne: jest.fn().mockResolvedValue({
        _id: "12345",
        name: "existing user",
        email: "email@example.com",
        password: hashedPassword
      })
    };
    mockGetCollection.mockReturnValue(mockCollection);

    const payload = {
      email: "email@example.com",
      password: "1234567890"
    };

    const res = await request(app)
      .post("/signin")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ success: true });
  });

  test("signing in, incorrect input data, expect failure", async () => {
    const hashedPassword = await hash("1234567890", 10);
    const mockCollection = {
      findOne: jest.fn().mockResolvedValue({
        _id: "12345",
        name: "existing user",
        email: "email@example.com",
        password: hashedPassword
      })
    };
    mockGetCollection.mockReturnValue(mockCollection);

    const payload = {
      email: "email",
      password: "wrongpassword"
    };

    const res = await request(app)
      .post("/signin")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'Validation error: "email" must be a valid email',
      statusCode: 400
    });
  });

  test("signing in, incorrect password, expect failure", async () => {
    const hashedPassword = await hash("1234567890", 10);
    const mockCollection = {
      findOne: jest.fn().mockResolvedValue({
        _id: "12345",
        name: "existing user",
        email: "email@example.com",
        password: hashedPassword
      })
    };
    mockGetCollection.mockReturnValue(mockCollection);

    const payload = {
      email: "email@example.com",
      password: "wrongpassword"
    };

    const res = await request(app)
      .post("/signin")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "Wrong username or password",
      statusCode: 400
    });
  });

  //
  // ========== Sign out ==========
  //

  test("signing out while signed in, expect success", async () => {
    const hashedPassword = await hash("1234567890", 10);
    const mockCollection = {
      findOne: jest.fn().mockResolvedValue({
        _id: "12345",
        name: "existing user",
        email: "email@example.com",
        password: hashedPassword
      })
    };
    mockGetCollection.mockReturnValue(mockCollection);

    const payload = {
      email: "email@example.com",
      password: "1234567890"
    };

    const signInRes = await request(app)
      .post("/signin")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(signInRes.statusCode).toEqual(200);
    expect(signInRes.body).toEqual({ success: true });

    const cookies = signInRes.headers["set-cookie"];

    const res = await request(app).get("/signout").set("Cookie", cookies);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ success: true });
  });

  test("signing out while signed out, expect success", async () => {
    const res = await request(app).get("/signout");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ success: true });
  });

  //
  // ========== Auth ==========
  //

  test("authenticating while signed in, expect success", async () => {
    const hashedPassword = await hash("1234567890", 10);
    const mockCollection = {
      findOne: jest.fn().mockResolvedValue({
        _id: "12345",
        name: "existing user",
        email: "email@example.com",
        password: hashedPassword
      })
    };
    mockGetCollection.mockReturnValue(mockCollection);

    const payload = {
      email: "email@example.com",
      password: "1234567890"
    };

    const signInRes = await request(app)
      .post("/signin")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(signInRes.statusCode).toEqual(200);
    expect(signInRes.body).toEqual({ success: true });

    const cookies = signInRes.headers["set-cookie"];

    const authRes = await request(app).get("/auth").set("Cookie", cookies);

    expect(authRes.statusCode).toEqual(200);
    expect(authRes.body).toEqual({ success: true });
  });

  test("authenticating without signing in, expect failure", async () => {
    const res = await request(app).get("/auth");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "You are not signed in",
      statusCode: 401
    });
  });

  //
  // ========== Register ==========
  //

  test("registering a new user, expect success", async () => {
    const mockCollection = {
      findOne: jest.fn().mockResolvedValue(null),
      insertOne: jest.fn().mockResolvedValue({ insertedId: "12345" })
    };
    mockGetCollection.mockReturnValue(mockCollection);

    const payload: User = {
      name: "name lastname",
      email: "email@example.com",
      password: "1234567890"
    };

    const res = await request(app)
      .post("/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ success: true });
  });

  test("registering a new user, email already used, expect failure", async () => {
    const mockCollection = {
      findOne: jest.fn().mockResolvedValue({
        _id: "12345",
        name: "existing user",
        email: "email@example.com",
        password: "hashed1234567890"
      }),
      insertOne: jest.fn().mockResolvedValue({ insertedId: "12345" })
    };
    mockGetCollection.mockReturnValue(mockCollection);

    const payload: User = {
      name: "name lastname",
      email: "email@example.com",
      password: "1234567890"
    };

    const res = await request(app)
      .post("/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: "E-mail address already used",
      statusCode: 400
    });
  });

  test("registering a new user, incorrect input data, expect failure", async () => {
    const mockCollection = {
      findOne: jest.fn().mockResolvedValue(null),
      insertOne: jest.fn().mockResolvedValue({ insertedId: "12345" })
    };
    mockGetCollection.mockReturnValue(mockCollection);

    const payload = {
      name: "name lastname",
      email: "email@example.com"
    };

    const res = await request(app)
      .post("/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      message: 'Validation error: "password" is required',
      statusCode: 400
    });
  });
});
