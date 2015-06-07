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
                        "profile.date_of_birth": date_of_birth,
                        "profile.number_of_travels": doc.number_of_travels,
                        "profile.travel_route_from": doc.travel_route_from,
                        "profile.travel_route_to": doc.travel_route_to,
                        "profile.available_as_carrier": doc.available_as_carrier

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
      if (err) {
        return err;
      }
      else {
        var users = Meteor.users.find({}).fetch();    
        for (i = 0; i < users.length; i++) { 
            var value = users[i];
            if (value.profile.available_as_carrier == true ) {
                Requests.insert({
                  req_carry_itemId: id,
                  carrierId: value._id,
                  owner: Meteor.user()._id,
                  read_status: "unread",
                  type: "req_carry",
                  action_status: "open",
                  // createdAt: new Date() // current time
                }, function(err, id){});
            };
        }
      }
  });
  },
  editItem: function(itemId, doc) {
    Items.update({_id: itemId}, doc, function(err, success){
    });
  },
  postTrip: function(doc){
    return Travels.insert(doc, function(err, id){
  });
  },
  editTrip: function(tripId, doc) {
    Travels.update({_id: tripId}, doc, function(err, success){
    });
  },
  removeItems: function() {
    return Items.remove({});
  },
  removeRequests: function() {
    return Requests.remove({});
  },
  removeMessages: function(){
    return Messages.remove({});
  },
  removeApplications: function(){
    return Applications.remove({});
  },
  removeNotifications: function(){
    return Notifications.remove({});
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
  updateNotifStatus: function(notifId) {
    Notifications.update(notifId, {$set: {status: "read"}});
  },
  updateRequestActionStatus: function(requestId){
    Requests.update(requestId, {$set: {action_status: "closed"}});
  },
   updateRequestReadStatus: function(requestId){
    Requests.update(requestId, {$set: {read_status: "read"}});
  },
  sendReply: function(doc){
    Replies.insert(doc, function(err, id){
    });
  },
  updateReplyMessageStatus: function(messageId){
    var message = Messages.findOne(messageId);
    var msg_replies = Replies.find({messageId: messageId}).fetch();
    var replies = [];
    
    for (i = 0; i < msg_replies.length; i++) { 
        var value = msg_replies[i];
        if (value.status == "unread") {
            replies.push(value);
        };
    }
    
    if (replies.length == 0) {
      return;
    }

    else {
        for (i = 0; i < replies.length; i++) { 
            var value = replies[i];
            Replies.update(value._id, {$set: {status: "read"}});
        }
    }
  },
  /*A user can apply to carry another user's item. This user user then becomes the owner of 
  that request of type "app_carry". A user can also recieve a request from another user to 
  carry his/her item. In this case the user becomes the carrier of the item.*/
  applicationToCarry: function(app_carry_itemId, senderId){
      Requests.insert({
        app_carry_itemId: app_carry_itemId,
        senderId: senderId,
        owner: Meteor.user()._id,
        read_status: "unread",
        action_status: "open",
        type: "app_carry",
        createdAt: new Date() // current time
      }, function(err, id){});
  },
  /*A user can request another user to carry his/her item. This user becomes the owner of the request
   of type "req_carry". A user can also recieve a request from another user to carry an item he/she has
    posted. In this case the user becomes the sender of the item.*/
  requestToCarry: function(req_carry_itemId, carrierId){
    Requests.insert({
      req_carry_itemId: req_carry_itemId,
      carrierId: carrierId,
      owner: Meteor.user()._id,
      read_status: "unread",
      type: "req_carry",
      action_status: "open",
      createdAt: new Date() // current time
    }, function(err, id){});
  },
  acceptedItemStatus: function(status, itemId){
     Items.update(itemId, {$set: {acceptance_status: status}});
  },
  rejectedItemStatus: function(status, itemId){
    Items.update(itemId, {$set: {acceptance_status: status}});
  },
  sendAcceptedNotification: function(recipient, from, itemId){
    Notifications.insert({
      recipient: recipient,
      from: from,
      type: "ac-notif",
      itemId: itemId,
      status: "unread",
      createdAt: new Date()
    }, function(err, id){});
  },
  sendRejectedNotification: function(recipient, from, itemId){
    Notifications.insert({
      recipient: recipient,
      from: from,
      itemId: itemId,
      type: "rj-notif",
      status: "unread",
      createdAt: new Date()
    }, function(err, id){});
  }
});


