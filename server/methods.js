Meteor.methods({
  updateUserProfile: function(doc) {
    console.log(doc);
    Meteor.users.update({_id: Meteor.user()._id}, {
              $set: {"profile.first_name": doc.first_name, 
                      "profile.last_name": doc.last_name,
                      "profile.country": doc.country,
                      "profile.city": doc.city,
                      "profile.birthday": doc.birthday,
                      "profile.gender": doc.gender,
                      "profile.bio": doc.bio,
                      "profile.number_of_travels": doc.number_of_travels,
                      "profile.travel_route_from": doc.travel_route_from,
                      "profile.travel_route_to": doc.travel_route_to,
                      "profile.available_as_carrier": doc.available_as_carrier

      }
    });
  },
  updateOnboardingStatus: function(userId){
    Meteor.users.update({_id: Meteor.user()._id}, {$set: {"profile.onboarded": true}});
  },
  changeUserProfilePhoto: function(url){
        Meteor.users.update({_id: Meteor.user()._id}, {$set: {"profile.photo": url}});
  },
  updateRatings: function(userId, value){

        var user = Meteor.users.findOne(userId);
        if (typeof(user) == "undefined") {
          return;
        }
        else {
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
        }
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
            if (value.profile.available_as_carrier == true && value._id != Meteor.user()._id) {
                Requests.insert({
                  req_carry_itemId: id,
                  carrierId: value._id,
                  owner: Meteor.user()._id,
                  read_status: "unread",
                  type: "bulk_req_carry",
                  action_status: "open",
                  createdAt: new Date() // current time
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
  removeReply: function(id){
    Replies.remove(id);
  },
  removeTrip: function(id){
    return Travels.remove({});
  },
  removeTrips: function(){
    Travels.remove({});
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
  accept_req_to_carry_ur_item_status: function(status, itemId){
     Items.update(itemId, {$set: {accept_req_to_carry_ur_item_status: status}});
  },
  reject_req_to_carry_ur_item_status: function(status, itemId){
    Items.update(itemId, {$set: {accept_req_to_carry_ur_item_status: status}});
  },
  accept_app_to_carry_ur_item_status: function(status, itemId){
    Items.update(itemId, {$set: {accept_app_to_carry_ur_item_status: status}});
  },
  reject_app_to_carry_ur_item_status: function(status, itemId){
    Items.update(itemId, {$set: {accept_app_to_carry_ur_item_status: status}});
  },
  sendReqAcceptedNotification: function(recipient, from, itemId){
    Notifications.insert({
      recipient: recipient,
      from: from,
      type: "ac-notif",
      itemId: itemId,
      status: "unread",
      createdAt: new Date()
    }, function(err, id){});
  },
  sendReqRejectedNotification: function(recipient, from, itemId){
    Notifications.insert({
      recipient: recipient,
      from: from,
      itemId: itemId,
      type: "rj-notif",
      status: "unread",
      createdAt: new Date()
    }, function(err, id){});
  },
  sendAppAcceptedNotification: function(recipient, from, itemId){
    Notifications.insert({
      recipient: recipient,
      from: from,
      type: "ac-app-notif",
      itemId: itemId,
      status: "unread",
      createdAt: new Date()
    }, function(err, id){});
  },
  sendAppRejectedNotification: function(recipient, from, itemId){
    Notifications.insert({
      recipient: recipient,
      from: from,
      itemId: itemId,
      type: "rj-app-notif",
      status: "unread",
      createdAt: new Date()
    }, function(err, id){});
  }
});


