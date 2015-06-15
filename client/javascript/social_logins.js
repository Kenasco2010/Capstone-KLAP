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
    var user = Meteor.user();
    var check_first_name = user.profile.first_name;
    var check_onboarding_status = user.profile.onboarded;
    if ( typeof(check_first_name) == "undefined") {
        Router.go("create_profile");
    }
    else if (check_first_name && check_onboarding_status == false) {
        Router.go("welcome-page");
    }
    else {
        Router.go("listings");
    }
    /*if ( typeof(check_first_name) == "undefined") {
        Router.go("create_profile");
    }

    else {
      Router.go("listings");
    }*/
  
});