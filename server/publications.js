Meteor.publish('items', function() {
  return Items.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('travels', function() {
  return Travels.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('requests', function() {
  return Requests.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('replies', function() {
  return Replies.find({});
});

Meteor.publish('reviews', function() {
  return Reviews.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('messages', function() {
  return Messages.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('notifications', function() {
  return Notifications.find({}, {sort: {createdAt: -1}});
});

Meteor.publish("allUsers", function () {
return Meteor.users.find({}, {
    fields:{
        "profile.first_name":1,
        "profile.last_name":1,
        "profile.city":1,
        "profile.bio":1,
        "profile.photo":1,
        "profile.country":1,
        "profile.onboarded": 1,
        "profile.number_of_deliveries":1,
        "profile.rating":1,
        "profile.travel_route_from":1,
        "profile.travel_route_to":1,
        "services.facebook.id":1,
        "services.google.picture":1  
    }
});
});

Meteor.publish("userProfile",function(id){
    // try to find the user by username
    var user = Meteor.users.findOne({
        _id:id
    });
    // if we can't find it, mark the subscription as ready and quit
    if(!user){
        this.ready();
        return;
    }
    // if the user we want to display the profile is the currently logged in user...
    if(this.userId==user._id){
        // then we return the corresponding full document via a cursor
        return Meteor.users.find(this.userId);
    }
    else{
        // if we are viewing only the public part, strip the "profile"
        // property from the fetched document, you might want to
        // set only a nested property of the profile as private
        // instead of the whole property
        return Meteor.users.find(user._id,{
            fields:{
                "profile.first_name":1,
                "profile.last_name":1,
                "profile.city":1,
                "profile.photo":1,
                "profile.bio":1,
                "profile.country":1,
                "profile.onboarded": 1,
                "profile.number_of_deliveries":1,
                "profile.rating":1,
                "profile.travel_route_from":1,
                "profile.travel_route_to":1,
                "services.facebook.id":1,
                "services.google.picture":1
                

                
            }
        });
    }
});