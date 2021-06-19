exports.get404 = (req, res, next) => {

    res.status(404).render('404', {
        pageTitle: "Page not found",
        path: '/404',
        isAthenticated: req.session.isloggedIn
    });
};

exports.get500 = (req, res, next) => {

    res.status(500).render('500', {
        pageTitle: "Error",
        path : '/500',
        isAthenticated: req.session.isloggedIn
    });
};
