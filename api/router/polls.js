const express = require("express");
const pollRouter = express.Router();
const {
  create,
  destroy,
  update,
  getAllPolls,
  getPoll,
} = require("../controller/pollController");
const { verifyToken } = require("../config/jwtAuth");

pollRouter.post("/poll",verifyToken, create);
pollRouter.delete("/poll",verifyToken, destroy);
pollRouter.put("/poll",verifyToken, update);
pollRouter.get("/poll/:id",verifyToken, getPoll);
pollRouter.get("/poll",verifyToken, getAllPolls);

module.exports = pollRouter;

