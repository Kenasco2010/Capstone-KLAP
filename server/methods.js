Meteor.methods({
  updateUserProfile: function(doc) {
    // Important server-side check for security and data integrity
    check(doc, Schema.updateProfile);
    var dob = doc.day +  " " + doc.month + " " + doc.year;
    var date_of_birth = dob.replace(/\s/g,"-");

    if (Meteor.user()) {
        Meteor.users.update({
            _id: Meteor.user()._id}, 
            {
                $set: {"profile.first_name": doc.first_name, 
                        "profile.last_name": doc.last_name,
                        "profile.country": doc.country,
                        "profile.city": doc.city,
                        "profile.date_of_birth": date_of_birth
        }
        });
    }
    else {
        console.log("user not logged in");
    }
  },
  updateRatings: function(userId, value){

        var user = Meteor.users.findOne(userId);
        console.log(user);
        
        Meteor.users.update({_id: userId},
        {
                    $inc: {"profile.rating": value, 
                    "profile.rating_times": 1, 
                    "profile.accumulated_ratings": value}
        })
  },
  postItem: function(doc){
    Items.insert(doc, function(err, id){
  });
  },
  postTrip: function(doc){
    Travels.insert(doc, function(err, id){
  });
  }

});