Template.navigation.events({
    "click [data-action='sign-out']": function () {
        Meteor.logout(function() {
          Router.go('home');
    })
}
});