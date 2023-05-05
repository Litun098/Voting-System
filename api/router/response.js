const express = require('express');
const { vote, allPollsVotedByUser, getResultOfPoll } = require('../controller/responseController');
const { verifyToken } = require('../config/jwtAuth');
const voteRouter = express.Router();

// API to vote
voteRouter.post('/vote',verifyToken,vote);

// Get all polls voted by user
voteRouter.get('/vote',verifyToken,allPollsVotedByUser);

// Get Poll result By Poll Id
voteRouter.get('/result',verifyToken,getResultOfPoll);

module.exports = voteRouter