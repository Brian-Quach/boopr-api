const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

const credentials = (req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", true);
  next();
};

module.exports = {
  corsOptions,
  credentials,
};
