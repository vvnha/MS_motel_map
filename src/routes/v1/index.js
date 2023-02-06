const express = require('express');
const motelController = require('../../controllers/motels-controller');

const router = express.Router();
// router.use('/app-events', motelController.subscribeEvents);
router.post('/', motelController.createNewMotel);

module.exports = router;
