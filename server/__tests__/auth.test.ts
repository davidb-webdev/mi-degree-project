const request = require("supertest");
import app from "../app";

describe("Server Endpoints", () => {
  test("should return a 200 status code", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });
});
