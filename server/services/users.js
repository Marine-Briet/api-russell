//READ - Récupérer tous les user
const User = require('../models/user');

exports.getAll = async (req, res, next) => {

    try {
        let users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//READ - Récupérer un user par son id
exports.getByEmail = async (req, res, next) => {
    const email = req.params.email;
    
    try {
        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(500).json(error);
    }
}

//CREATE - Ajouter un user
exports.add = async (req, res, next) => {
    try {
        const temp = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };

        let user = await User.create(temp);
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

// UPDATE - Modifier un user
exports.update = async (req, res, next) => {
    const email = req.params.email;
    const temp = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password 
    };

    try {
        let user = await User.findOne({ email: email });

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });
            await user.save();
            return res.status(200).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(500).json(error);
    }
}

// DELETE - Supprimer un user
exports.delete = async (req, res, next) => {
    const email = req.params.email;

    try {
        await User.deleteOne({ email: email });
        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(500).json(error);
    }
}