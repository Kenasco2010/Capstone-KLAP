AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/signin',
    template: 'signin',
    layoutTemplate: 'masterLayout',
    redirect: function() {
        var user = Meteor.user();
        var check_onboarding_status = user.profile.onboarded;
        if (check_onboarding_status == false) {
            Router.go("welcome-page");
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