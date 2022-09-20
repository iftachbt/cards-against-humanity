import { Character, closeConnection, connectDB } from "../mongoDB/DB.js";

export const dbMockInit = (beforeAll, beforeEach, afterEach, afterAll) => {
  let mg = null;
  beforeAll(async () => {
    mg = await connectDB(process.env.DB_URL_TEST);
  });

  beforeEach(() => {});
  afterEach(async () => {
    await Character.deleteMany({});
  });
  afterAll(async () => {
    await closeConnection(mg);
  });
};

export const randomString = () => (Math.random() + 1).toString(36).substring(7);
export const randomNumber = () => Math.round(Math.random() * 20);
