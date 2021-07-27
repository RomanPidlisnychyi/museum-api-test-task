const { Router } = require('express');
const { main } = require('../controllers/mainController');
const { asyncWrapper } = require('../helpers/asyncWrapper');

const router = Router();

router.get('/', asyncWrapper(main));

module.exports = router;
