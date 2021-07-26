export const variable = {
  PORT: process.env.PORT || 5000,

  DATABASE_URL:
    process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/TrelloClone",

  SECRET_KEY: process.env.SECRET_KEY || "helloworld",

  ROLE: {
    USER: "user",
    ADMIN: "admin",
  },
};
