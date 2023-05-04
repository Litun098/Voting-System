const express = require('express');
const { verify } = require('jsonwebtoken');
const { vote, allPollsVotedByUser } = require('../controller/responseController');
const voteRouter = express.Router();

// API to vote
voteRouter.post('/vote/:userId/poll/:pollId/vote/:votedFor',verify,vote);

// Get all polls voted by user
voteRouter.get('/vote/:userId',verify,allPollsVotedByUser);

module.exports = voteRouter