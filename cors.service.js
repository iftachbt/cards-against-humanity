const whitelist = [
  "http://localhost:4000",
  "http://localhost:3000",
  "http://localhost",
  "https://peaceful-sierra-66868.herokuapp.com/",
  "https://peaceful-sierra-66868.herokuapp.com",
  "http://peaceful-sierra-66868.herokuapp.com/",
  "http://peaceful-sierra-66868.herokuapp.com",
  "*",
];
export const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};
