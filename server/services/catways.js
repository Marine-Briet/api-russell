const Catways = require('../models/catways');

//READ - Récupérer tous les catways

exports.getAll = async (req, res, next) => {

    try {
        let catways = await Catways.find({});
        return res.status(200).json(catways);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//READ - Récupérer un catway par son numéro de catway
exports.getByNumber = async (req, res, next) => {
    const catwayNumber = req.params.catwayNumber;
    
    try {
        let catways = await Catways.findOne({ catwayNumber: catwayNumber });

        if (catways) {
            return res.status(200).json(catways);
        }

        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(500).json(error);
    }
}

//CREATE - Ajouter un catway
exports.add = async (req, res, next) => {
    try {
        const temp = {
            catwayNumber: req.body.catwayNumber,
            catwayType: req.body.catwayType,
            catwayState: req.body.catwayState
        };

        let catways = await Catways.create(temp);
        return res.status(201).json(catways);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

// UPDATE - Modifier un catway
exports.update = async (req, res, next) => {
    const catwayNumber = req.params.id;
    const temp = {
        catwayState: req.body.catwayState
    };

    try {
        let catways = await Catways.findOne({ catwayNumber: catwayNumber });

        if (catways) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catways[key] = temp[key];
                }
            });
            await catways.save();
            return res.status(200).json(catways);
        }

        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(500).json(error);
    }
}

// DELETE - Supprimer un catway
exports.delete = async (req, res, next) => {
    const catwayNumber = req.params.catwayNumber;

    try {
        await Catways.deleteOne({ catwayNumber: catwayNumber });
        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(500).json(error);
    }
}