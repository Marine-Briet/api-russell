const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const User = require('../models/users');

//READ - Récupérer tous les user
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

// AUTHENTIFICATION - Se connecter
exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email }, '-__v -createdAt -updatedAt');

        if (user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc.password;

                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign({
                        user: user
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });

                    res.header('Authorization', 'Bearer ' + token); // ✅ espace après Bearer

                    return res.status(200).json('authenticate_succeed');
                }

                return res.status(403).json('wrong_credentials'); // ✅ 403
            });
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}