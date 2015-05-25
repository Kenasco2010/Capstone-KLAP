Template.navigation.events({
    "click [data-action='sign-out']": function () {
        Meteor.logout(function() {
          Router.go('home');
    })
}
});

Template.userPublicProfile.rendered = function () {
   // $.Metro.initAll(".rating");
 
};

Template.checkMe.rendered = function () {
   // $.Metro.initAll(".rating");
 
};



