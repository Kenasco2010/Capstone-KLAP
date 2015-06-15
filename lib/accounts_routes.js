AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/signin',
    template: 'signin',
    layoutTemplate: 'masterLayout',
    redirect: function() {
        var user = Meteor.user();
        var check_first_name = user.profile.first_name;
        if ( typeof(check_first_name) == "undefined") {
            Router.go("create_profile");
        }
        else {
            Router.go("listings");
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