import express from 'express';
import videoController from '../controller/video-controller.js';

const videoRouter = express.Router();

videoRouter.post('/join-room', videoController.joinRoom);
videoRouter.post('/signal', videoController.handleSignal);

export default videoRouter;
