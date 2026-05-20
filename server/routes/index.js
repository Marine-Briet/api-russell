var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const catwaysRoute = require('../routes/catways');
const reservationsRoute = require('../routes/reservations');
const login = require('../services/users');


router.get('/', async (req, res) => {
    res.status(200).json({ message: 'Bienvenue sur l\'API Russell!' })
});

router.post('/login', login.authenticate);
router.get('/logout', (req, res) => {
    return res.status(200).json('logout_success');
});

router.use('/users', userRoute);
router.use('/catways', catwaysRoute);
router.use('/catways/:id/reservations', reservationsRoute);

module.exports = router;
