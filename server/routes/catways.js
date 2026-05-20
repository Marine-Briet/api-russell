const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const privateMiddleware = require('../middlewares/private');

router.get('/', privateMiddleware.checkJWT, service.getAll);
router.get('/:id', privateMiddleware.checkJWT, service.getByNumber);
router.post('/', service.add);
router.put('/:id', privateMiddleware.checkJWT, service.update);
router.delete('/:id', privateMiddleware.checkJWT, service.delete);

module.exports = router;