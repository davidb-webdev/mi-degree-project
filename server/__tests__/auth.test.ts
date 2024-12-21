import request from "supertest";
import app from "../app";
import DatabaseConnection from "../database/DatabaseConnection";

describe("Server Endpoints", () => {
  test("should return a 200 status code", async () => {
    const res = await request(app).get("/testdb");
    expect(res.statusCode).toEqual(200);
  });
});

afterAll(async () => {
  await DatabaseConnection.getInstance().disconnect();
});
