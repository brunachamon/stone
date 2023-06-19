const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userCreate } = require("./user");
const User = require("../models/User");
const { HTTP_STATUS_CODES } = require("../utils/httpStatusCodes");
const validationMessages = require("../utils/validationMessages");

const req = {
  body: {},
};

const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};

describe("userCreate", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new user and return a token", async () => {
    req.body = {
      name: "John Snow",
      email: "john.snow@bruna.com",
      password: "bruna",
    };

    User.findOne = jest.fn().mockResolvedValue(null);

    bcrypt.genSalt = jest.fn().mockResolvedValue("salt");
    bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");

    const savedUser = {
      _id: "user-id",
      name: "Aurora",
      email: "aurora@bruna.com",
    };
    User.prototype.save = jest.fn().mockResolvedValue(savedUser);

    await userCreate(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith("bruna", "salt");
    expect(User.prototype.save).toHaveBeenCalled();
  });

  test("should return a bad request error if the email is already taken", async () => {
    req.body = {
      name: "Sansa Stark",
      email: "sansa@bruna.com",
      password: "bruna",
    };

    const existingUser = { name: "Sansa Stark", email: "sansa@bruna.com" };
    User.findOne = jest.fn().mockResolvedValue(existingUser);

    await userCreate(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODES.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      message: "Já existe um usuário usando o email fornecido.",
    });
  });

  test("should handle errors and send an internal server error response", async () => {
    req.body = {
      name: "John Snow",
      email: "john@bruna.com",
      password: "bruna",
    };

    const errorMessage = "Random error";
    User.findOne = jest.fn().mockRejectedValue(new Error(errorMessage));

    await userCreate(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
    );
    expect(res.send).toHaveBeenCalledWith(validationMessages.INTERNAL_ERROR);
  });
});
