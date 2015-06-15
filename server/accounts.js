Accounts.onCreateUser(function(options, user) {
  // We're enforcing at least an empty profile object to avoid needing to check
  // for its existence later.
  // user.profile = options.profile ? options.profile : {};
  if (user.services.facebook) {
       user.profile = options.profile;
       user.profile.username = options.profile.name;
       user.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
       user.profile.number_of_deliveries = 0;
       user.profile.onboarded = false;
  }

  else if (user.services.twitter){
        user.profile = options.profile;
        user.profile.picture= user.services.twitter.profile_image_url_https;
        user.profile.username= user.services.twitter.screenName;
        user.profile.number_of_deliveries = 0;
        user.profile.onboarded = false;
    }
  else if (user.services.google) {
         user.profile = options.profile;
         user.profile.username = options.profile.name;
         user.profile.picture = user.services.google.picture;
         user.profile.number_of_deliveries = 0;
         user.profile.onboarded = false;
      }

  else {
     user.profile = {};
     user.profile.rating = 0;
     user.profile.rating_times = 0;
     user.profile.accumulated_ratings = 0;
     user.profile.number_of_deliveries = 0;
     user.profile.onboarded = false;
  }
    return user;
});
