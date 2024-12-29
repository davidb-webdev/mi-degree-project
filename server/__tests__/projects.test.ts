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
});
