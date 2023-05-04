const express = require("express");
const pollRouter = express.Router();
const {
  create,
  destroy,
  update,
  getAllPolls,
} = require("../controller/pollController");
const { verifyToken } = require("../config/jwtAuth");

pollRouter.post("/poll",verifyToken, create);
pollRouter.delete("/poll/:id",verifyToken, destroy);
pollRouter.patch("/poll/:id",verifyToken, update);
pollRouter.get("/poll/:id",verifyToken, update);
pollRouter.get("/poll", getAllPolls);

module.exports = pollRouter;
