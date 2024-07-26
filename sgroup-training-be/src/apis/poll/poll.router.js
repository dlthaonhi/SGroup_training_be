import express from 'express';
import PollController from './poll.controller.js';
import MiddlewareVerify from '../../middleware/middleware.auth.js'

const routers = express.Router();

routers.get('/', MiddlewareVerify.checkAuth, PollController.getPolls)
routers.post('/create-poll', MiddlewareVerify.checkAuth, PollController.createPoll);
routers.put('/update-poll/:pollId', MiddlewareVerify.checkAuth, PollController.updatePoll);
routers.delete('/delete-poll/:pollId', MiddlewareVerify.checkAuth, PollController.deletePoll);
routers.get('/:pollId',MiddlewareVerify.checkAuth, PollController.getPollWithDetails);

routers.post('/create-option/:pollId', MiddlewareVerify.checkAuth, PollController.createOptions);
routers.put('/update-option/:pollId/:optionId', MiddlewareVerify.checkAuth, PollController.updateOption);
routers.delete('/delete-option/:pollId/:optionId', MiddlewareVerify.checkAuth, PollController.deleteOption);

routers.get('/get-vote/:pollId/:optionId',MiddlewareVerify.checkAuth, PollController.getOptionlWithDetails)

routers.post('/vote/:pollId', MiddlewareVerify.checkAuth, PollController.voteOptions);
routers.post('/unvote/:pollId', MiddlewareVerify.checkAuth, PollController.unvoteOptions);

export default routers;