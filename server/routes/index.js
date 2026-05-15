var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const catwaysRoute = require('../routes/catways');
const reservationsRoute = require('../routes/reservations');

router.get('/', async (req, res) => {
    res.status(200).json({ message: 'Bienvenue sur l\'API Russell!' })
});


router.use('/users', userRoute);
router.use('/catways', catwaysRoute);
router.use('/catways/:id/reservations', reservationsRoute);

module.exports = router;
