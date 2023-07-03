const express = require('express');
const router = express.Router();
const personController = require('./../controller/personController');

router.post('/people', personController.addPerson);
router.get("/people", personController.getPeople);

router.get("/people/:id", personController.getPersonById);

module.exports = router;