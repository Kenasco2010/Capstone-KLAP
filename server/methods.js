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
  }
});