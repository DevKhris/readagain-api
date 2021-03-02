const config = {
  production: {
    API_SECRET: process.env.API_SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    API_SECRET: "yetanothertestkey",
    DATABASE: "mongodb://localhost:27017/readagain",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
