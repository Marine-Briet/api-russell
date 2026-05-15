const express = require('express');
const router = express.Router();

const service = require('../services/users');
const privateMiddleware = require('../middlewares/private');

router.get('/', privateMiddleware.checkJWT, service.getAll);
router.get('/:email', privateMiddleware.checkJWT, service.getById);
router.post('/', service.add);
router.put('/:email', privateMiddleware.checkJWT, service.update);
router.delete('/:email', privateMiddleware.checkJWT, service.delete);

module.exports = router;