const express = require('express');
const { vote, allPollsVotedByUser } = require('../controller/responseController');
const { verifyToken } = require('../config/jwtAuth');
const voteRouter = express.Router();

// API to vote
voteRouter.post('/vote',verifyToken,vote);

// Get all polls voted by user
voteRouter.get('/vote/:userId',verifyToken,allPollsVotedByUser);

module.exports = voteRouter