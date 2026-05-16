const Reservations = require('../models/reservations');

//READ - Récupérer tous les réservations

exports.getAll = async (req, res, next) => {
    const catwayNumber = req.params.id
    try {
        let reservations = await Reservations.find({catwayNumber: catwayNumber});
        return res.status(200).json(reservations);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//READ - Récupérer une réservation par son numéro de Catway par son id
exports.getById = async (req, res, next) => {
    const catwayNumber = req.params.id;
    const reservationId = req.params.idReservation;
    
    try {
        let reservations = await Reservations.findOne({ _id: reservationId, catwayNumber: catwayNumber });

        if (reservations) {
            return res.status(200).json(reservations);
        }
    
        return res.status(404).json('reservation_not_found');
    } catch (error) {
        return res.status(500).json(error);
    }
}

//CREATE - Ajouter une réservation
exports.add = async (req, res, next) => {
    try {
        const temp = {
            catwayNumber: req.body.catwayNumber,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };

        let reservations = await Reservations.create(temp);
        return res.status(201).json(reservations);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

// UPDATE - Modifier une réservation
exports.update = async (req, res, next) => {
    const reservationId = req.params.idReservation;
    const temp = {
        catwayNumber: req.body.catwayNumber,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    };
    try {
        let reservations = await Reservations.findOne({ _id: reservationId });

        if (reservations) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    reservations[key] = temp[key];
                }
            });
            await reservations.save();
            return res.status(200).json(reservations);
        }

        return res.status(404).json('reservation_not_found');
    } catch (error) {
        return res.status(500).json(error);
    }
}

// DELETE - Supprimer une réservation
exports.delete = async (req, res, next) => {
    const reservationId = req.params.idReservation;

    try {
        await Reservations.deleteOne({ _id: reservationId });
        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(500).json(error);
    }
}