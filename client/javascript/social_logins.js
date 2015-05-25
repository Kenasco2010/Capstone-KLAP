Template.signup.events({
  'click #at-facebook': function() {
    return Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  },
  "click #at-google": function() {
      return Meteor.loginWithGoogle(function(error) {
        if (error) {
          return console.log(error.reason);
        }
      });
  },
  "click #at-linkedin": function() {
        return Meteor.loginWithLinkedIn(function(error) {
          if (error) {
            return console.log(error.reason);
          }
        });
  }
});

Accounts.onLogin(function() {
    var userId = Meteor.userId();
    var user = Meteor.users.findOne(userId);
    var check_first_name = user.profile.first_name;
    
    if ( typeof(check_first_name) == "undefined") {
        Router.go("create_profile");
    }

    else {
      Router.go("sender-post");
    }
  
});