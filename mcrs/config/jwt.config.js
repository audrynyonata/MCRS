const expressJwt = require("express-jwt");
const config = require("./config.json");

module.exports = jwt;

function jwt() {
  const { secret } = config;
  return expressJwt({
    secret: secret,
    getToken: function fromHeaderOrCookie(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.cookies && req.cookies.token) {
        return req.cookies.token;
      }
      return null;
    }
  }).unless({
    path: [
      // public routes that don't require authentication
      "/",
      "/authenticate",
      "/register",
      { url: "/dimensions", methods: ["GET"] },
      { url: "/industries", methods: ["GET"] },
      { url: "/types", methods: ["GET"] },
      { url: "/providers", methods: ["GET"] },
      { url: /^\/providers\/.*/, methods: ["GET"] },
      { url: "/method-chunks", methods: ["GET"] },
      { url: /^\/method-chunks\/.*/, methods: ["GET"] },
      { url: "/characteristics", methods: ["GET"] },
      { url: /^\/characteristics\/.*/, methods: ["GET"] },
      { url: "/projects", methods: ["GET"] },
      { url: /^\/projects\/.*/, methods: ["GET"] }
    ]
  });
}
