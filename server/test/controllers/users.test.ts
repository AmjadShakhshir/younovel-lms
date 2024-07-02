import request from "supertest";
import connect, { MongoHelper } from "../dp-helper";
import app from "../../app";
import usersService from "../../services/usersService";
import { createActivationToken } from "../../utils/manageTokens";
import sendEmail from "../../utils/sendEmail";

jest.mock("../../services/usersService");
jest.mock("../../utils/manageTokens");
jest.mock("../../utils/sendEmail");

describe("Users Controller", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  afterAll(async () => {
    await mongoHelper.closeDatabase();
    await delay(100); // Small delay to ensure all async operations complete
    console.log("All resources have been cleaned up");
  });

  beforeEach(async () => {
    await mongoHelper.clearDatabase();
  });

  it("should return 400 if email already exists", async () => {
    (usersService.findByEmail as jest.Mock).mockResolvedValue(true);

    const response = await request(app).post("/api/v1/users/signup").send({
      name: "John Doe",
      email: "john@mail.com",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Email already exists" });
  });

  it("should return 201 and send an email if signup is successful", async () => {
    (usersService.findByEmail as jest.Mock).mockResolvedValue(false);
    (createActivationToken as jest.Mock).mockReturnValue({ activationCode: "123456", token: "token" });
    (sendEmail as jest.Mock).mockResolvedValue(true);

    const response = await request(app).post("/api/v1/users/signup").send({
      name: "John Doe",
      email: "john@mail.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: `Please check your email: john@mail.com for activation link`,
      success: true,
      activationToken: "token",
    });
  });

  it("should return 500 if there is an error sending the email", async () => {
    (usersService.findByEmail as jest.Mock).mockResolvedValue(false);
    (createActivationToken as jest.Mock).mockReturnValue({ activationCode: "123456", token: "token" });
    (sendEmail as jest.Mock).mockRejectedValue(new Error());

    const response = await request(app).post("/api/v1/users/signup").send({
      name: "John Doe",
      email: "john@mail.com",
      password: "123456",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Error sending email" });
  });
});
