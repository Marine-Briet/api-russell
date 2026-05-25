const express = require('express');
const router = express.Router({ mergeParams: true }); // pour accéder à l'id

const service = require('../services/reservations');
const privateMiddleware = require('../middlewares/private');

router.get('/', privateMiddleware.checkJWT, service.getAll);
router.get('/:idReservation', privateMiddleware.checkJWT, service.getById);
router.post('/', service.add);
router.put('/:idReservation', privateMiddleware.checkJWT, service.update);
router.delete('/:idReservation', privateMiddleware.checkJWT, service.delete);

module.exports = router;