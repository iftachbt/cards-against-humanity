const whitelist = ["http://localhost:3000", "http://localhost"];
export const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};
