const jwt = require("jsonwebtoken");
const config = require("../config/key.js");
const User = require("../models/user.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
isExist = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    res.status(403).send({ message: "User not found" });
    return;
  }
  next();
};

const authJwt = {
  verifyToken,
  isExist,
  authorize: async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(403).send({ message: "User not found" });
      return;
    }
    const role = user.role;
    const authorizedRoutes = {
      User: ['/api/todos', '/api/todos/:id'],
      Admin: ['/api/todos', '/api/todos/:id', '/api/todos/create', '/api/todos/update', '/api/todos/delete']
    };
    const route = req.path;
    if (!authorizedRoutes[role].includes(route)) {
      res.status(403).send({ message: "Vous n'êtes pas autorisé à accéder à cette ressource" });
      return;
    }
    next();
  }
};


module.exports = authJwt;
