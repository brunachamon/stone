const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../");
const User = require("../models/User");
const { HTTP_STATUS_CODES } = require("../utils/httpStatusCodes");
const validationMessages = require("../utils/validationMessages");

jest.mock("../models/User");

const login = {
  email: "test@example.com",
  password: "password123",
};

describe("userLogin", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return a JWT token valid when the credentials are correct", async () => {
    User.findOne.mockResolvedValue({
      ...login,
      password: "hashedPassword",
    });

    jest.spyOn(bcrypt, "compare").mockImplementation(() => true);

    const response = await request(app).post("/login").send(login);

    expect(response.status).toBe(HTTP_STATUS_CODES.CREATED);
    expect(response.text).toContain("token");
  });

  test("should return a 400 status code and a message when the email doesnt exists", async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app).post("/login").send(login);

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
    expect(response.text).toContain("Verifique os dados do usuário.");
  });

  test("should return an error with status 400 and a message when password doesnt match", async () => {
    User.findOne.mockResolvedValue({
      email: "test@example.com",
      password: "hashedPassword",
    });

    jest.spyOn(bcrypt, "compare").mockImplementation(() => false); // simulando senha incorreta

    const response = await request(app).post("/login").send(login);

    expect(response.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
    expect(response.text).toContain("E-mail ou senha inválidos.");
  });

  test("shoudl return an error 500 with message when the system throw an error", async () => {
    User.findOne.mockRejectedValue(new Error("error"));

    const response = await request(app).post("/login").send(login);

    expect(response.statusCode).toBe(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    expect(response.text).toEqual(validationMessages.INTERNAL_ERROR);
  });
});
