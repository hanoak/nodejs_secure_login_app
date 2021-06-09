exports.getIndex = (req, res, next) => {

    res.render('admin', {
        errorMessage: '',
        oldInput: {
            email: "",
            password: ""
        },
        validationErrors: []
    });

};