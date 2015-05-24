AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/signin',
    template: 'signin',
    layoutTemplate: 'masterLayout',
    redirect: function() {
        var user = Meteor.user();
        if (user) {
            Router.go("sender-post");
        }
    }
});

AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    path: '/signup',
    template: 'signup',
    layoutTemplate: 'masterLayout',
    redirect: '/create-profile',
});