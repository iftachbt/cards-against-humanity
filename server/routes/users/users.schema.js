export const usersSchema = {
  fname: {
    type: String,
    minLength: 2,
  },
  lname: {
    type: String,
    minLength: 2,
  },
  username: {
    type: String,
    minLength: 2,
  },
  email: String,

  password: String,

  id: String,
};
