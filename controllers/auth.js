const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { validationResult } = require('express-validator/check');

exports.getLogin = (req, res, next) => {

    res.render('login', {
        errorMessage: '',
        oldInput: {
            email: "",
            password: ""
        },
        validationErrors: []
    });

};

exports.postLogin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if(! errors.isEmpty()) {
        return res.status(422).render('login', {
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password
            },
            validationErrors: errors.array()
        });

    }

    User.findOne({email: email})
    .then(user => {
        if(! user) {
            return res.status(422).render('login', {
                errorMessage: 'Invalid email or password',
                oldInput: {
                    email: email,
                    password: password
                },
                validationErrors: []
            });
        }

        bcrypt.compare(password, user.password)
        .then(matched => {
            if(!matched) {

                return res.status(422).render('login', {
                    errorMessage: 'Invalid email or password',
                    oldInput: {
                        email: email,
                        password: password
                    },
                    validationErrors: []
                });
            }

            req.session.isLoggedIn = true;
            return req.session.save(err => {
                res.redirect('/admin');
            });
        })
        .catch(err => {
            res.redirect('/');
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });

};

exports.postLogout = (req, res, next) => {

    req.session.destroy(err => {
        res.redirect('/');
    });
};