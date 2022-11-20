module.exports = {
  "/": {
    target: "https://parseapi.back4app.com",
    secure: true,
    debug: true,
    changeOrigin: true,
    bypass: function (req, res, opts) {
      res.setHeader("x-parse-request-id", "value");
    },
  },
};
