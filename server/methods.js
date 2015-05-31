Meteor.methods({
  updateUserProfile: function(doc) {
    // Important server-side check for security and data integrity
    check(doc, Schemas.updateProfile);
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
        var rating_times = user.profile.rating_times;
        var accumulated_ratings = user.profile.accumulated_ratings;
        var actual_rating = accumulated_ratings/rating_times;
        var rating_whole_number = Math.round(actual_rating);
        Meteor.users.update({_id: userId},
        {
                    $set: {"profile.rating": rating_whole_number}, 
                    $inc: {"profile.rating_times": 1, 
                    "profile.accumulated_ratings": value}
        })
  },
  postItem: function(doc){
    Items.insert(doc, function(err, id){
  });
  },
  editItem: function(itemId, doc) {
    Items.update({_id: itemId}, doc, function(err, success){
    });
  },
  postTrip: function(doc){
    Travels.insert(doc, function(err, id){
  });
  },
  editTrip: function(tripId, doc) {
    Travels.update({_id: tripId}, doc, function(err, success){
    });
  },
  removeItems: function() {
    return Items.remove({});
  },
  removeMessages: function(){
    return Messages.remove({});
  },
  insertReview: function(doc) {
    Reviews.insert(doc, function(err, id){
    });
  },
  sendMessage: function(doc) {
    var mydoc = doc;
    var userId = doc.sent_to;
    Messages.insert(doc, function(err, id){
    });
  },
  removeItem: function(id){
    Items.remove(id);
  },
  removeTrip: function(id){
    Travels.remove(id);
  },
  updateUserMessageStatus: function(messageId){
    var messages = Messages.findOne(messageId);
    Messages.update(messageId, {$set: {status: "read"}});
  },
  sendReply: function(doc){
    Replies.insert(doc, function(err, id){
    });
  }
});

