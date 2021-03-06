'use strict';

module.exports = function(_, passport, User){
    return {
        SetRouting: function(router) {
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);

            router.post('/', User.LoginValidation, this.postLogIn);
            router.post('/signup', User.SignUpValidation, this.postSignUp);
        },

        indexPage: function(req, res){
            const errors = req.flash('error');
            return res.render('index', { title: 'Footballkik | Login', messages: errors, hasErrors: errors.length > 0});
        },

        postLogIn: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),

        getSignUp: function(req, res){
            const errors = req.flash('error');
            return res.render('signup', { title: 'Footballkik | SignUp', messages: errors, hasErrors: errors.length > 0});
        },

        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true
        })
    }
}