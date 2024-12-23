import request from "supertest";
import app from "../app";
import DatabaseConnection from "../database/DatabaseConnection";

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

  test("register a new user, expect success", async () => {
    const mockCollection = {
      findOne: jest.fn().mockResolvedValue(null),
      insertOne: jest.fn().mockResolvedValue({ insertedId: "12345" })
    };
    mockGetCollection.mockReturnValue(mockCollection);

    const payload = {
      name: "name lastname",
      email: "def@example.com",
      password: "123456"
    };

    const res = await request(app)
      .post("/register")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ userId: "12345" });
  });
});
