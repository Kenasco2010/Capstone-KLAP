Template.registerHelper("fullUserName", function(user){
    var first_name = user.profile.first_name;
    var last_name = user.profile.last_name;
    var full_name = first_name + " " + last_name;
    return full_name;
})

Template.registerHelper("rating", function(user){
    console.log(user.profile.rating);
    var rating = user.profile.rating;
    return rating;
})

Template.registerHelper("hasPicture", function(id){
    var user = Meteor.users.findOne(id);
    var pictureUrl = user.profile.picture;
    if (typeof(pictureUrl) != "undefined") {
        return true;
    };
})

Template.searchForm.helpers({
    searchFormSchema: function () {
        return Schema.search;
    }
});

Template.registerHelper("s2OptsOCountry", function(){
    return  {placeholder: "Select Country"};
})

Template.registerHelper("s2OptsOCity", function(){
    return {placeholder: "Select City"};
})
Template.registerHelper("s2OptsDCountry", function(){
    return {placeholder: "Select Country"};
})
Template.registerHelper("s2OptsDCity", function(){
    return {placeholder: "Select City"};
})
Template.registerHelper("travel_route_from", function(){
    return {placeholder: "From"};
})
Template.registerHelper("travel_route_to", function(){
    return {placeholder: "To"};
})

Template.registerHelper("item_owner", function(itemId){
            var item = Items.findOne(itemId);
            var ownerId = item.owner;
            var owner = Meteor.users.findOne(ownerId);
            if (typeof(owner) == "undefined") {
                return "user"
            }
            else if (Meteor.userId() == ownerId) {
                return "You"
            }
            
            else {
                var first_name = owner.profile.first_name;
                var last_name = owner.profile.last_name;
                var full_name = first_name + " " + last_name;
                return full_name;
            }
})

Template.registerHelper("itemOwnerId", function(){
    var item = Items.findOne(this._id);
    var ownerId = item.owner;
    return ownerId;
})

Template.registerHelper("tripOwnerId", function(){
    var trip = Travels.findOne(this._id);
    var ownerId = trip.owner;
    return ownerId;
})


Template.registerHelper("trip_owner", function(tripId){
        var trip = Travels.findOne(tripId);
        var ownerId = trip.owner;
        if (Meteor.userId() == ownerId) {
            return "You"
        }
        else {
            var owner = Meteor.users.findOne(ownerId);
            var first_name = owner.profile.first_name;
            var last_name = owner.profile.last_name;
            var full_name = first_name + " " + last_name;
            return full_name;
        }
})

Template.registerHelper("noReviews", function(count){
    if (count == 0) {
        return true;
    }
    else {
        return false;
    }
})

Template.registerHelper('userPic', function(){
    var user = Meteor.user();
    var picture = user.profile.picture;
    return picture;
})

Template.registerHelper('imgWidth', function() {
    var user = Meteor.user();
    var picture = user.profile.picture;
    if (typeof(picture) == "undefined") {
      return 0;
    }
    else {
      return 40;
    }
})

Template.registerHelper("ownerPicture", function(tripId){
    var trip = Travels.findOne(tripId);
    var ownerId = trip.owner;
    var owner = Meteor.users.findOne(ownerId);
    var pictureUrl = owner.profile.picture;
    return pictureUrl;
})

Template.registerHelper("date_ft", function(date){
    var m = moment(date);
    return m.format("dddd, MMMM Do YYYY");
})

Template.createProfile.helpers({
    profileFormSchema: function () {
        return Schemas.updateProfile;
    },
    s2OptsDay: function() {
        return {placeholder: "Select Day"};
    },
     s2OptsMonth: function() {
        return {placeholder: "Select Month"};
    },
      s2OptsYear: function() {
        return {placeholder: "Select Year"};
    }
});

Template.registerHelper("profileFormSchema", function(){
    return Schemas.updateProfile
})

Template.registerHelper("reviewerPicture", function(id){
    var user = Meteor.users.findOne(id);
    var pictureUrl = user.profile.picture;
    return pictureUrl;
})

Template.registerHelper("reviewCountString", function(count){
    if (count == 1) {
        return "Review";
    }
    else {
        return "Reviews";
    }
})

Template.registerHelper("checkAbout", function(id){
    var user = Meteor.users.findOne(id);
    var first_name = user.profile.first_name;
    var about = user.profile.about;
    if (typeof(about) == "undefined") {
        return "(" + first_name + " has not written any bio yet)";
    }
    else
    {
        return about;
    }
})

Template.registerHelper("hasError", function(){
    return Session.get("has-error");;
})

Template.registerHelper("helpMessage", function(){
    return "Picture is required"
})

Template.registerHelper("sentFrom", function(id) {
    var user = Meteor.users.findOne(id);
    var first_name = user.profile.first_name;
    var last_name = user.profile.last_name;
    var full_name = first_name + " " + last_name;
    return full_name;
})

Template.registerHelper("hasUnreadMessages", function(messages){
    var replies = this.unreadRep;
    if (messages.length != 0 || replies.length != 0) {
        return true
    };
})

Template.registerHelper("unreadMessagesCount", function(messages){
    var replies = this.unreadRep;
    var totalUnread =  messages.length + replies.length;
    return totalUnread;
})

Template.registerHelper("unread", function(id){
    var message = Messages.findOne(id);
    var msg_status = message.status;
    var msg_replies = Replies.find({messageId: id}).fetch();
    var replies = [];

    $(msg_replies).each(function(index, value) {
        if (value.status == "unread") {
            replies.push(value);
        };
    });
    if (msg_status == "unread" || replies.length != 0) {
        return true
    };
})

Template.registerHelper("shortMessage", function(message){
    var shortmsg = jQuery.trim(message).substring(0, 80).split(" ").slice(0, -1).join(" ") + "...";
    return shortmsg;
})

Template.registerHelper("fullName", function(id){
    var user = Meteor.users.findOne(id);
    var first_name = user.profile.first_name;
    var last_name = user.profile.last_name;
    var full_name = first_name + " " + last_name;
    return full_name;
})

Template.registerHelper("hasUnreadReplies", function(id){
    var message = Messages.findOne(id);
    var msg_replies = Replies.find({messageId: id}).fetch();
    var replies = [];
    $(msg_replies).each(function(index, value) {
        if (value.status == "unread") {
            replies.push(value);
        };
    });
    if (replies.length != 0) {
        return true
    };
})

Template.registerHelper("unreadRepliesCount", function(id){
    var message = Messages.findOne(id);
    var msg_replies = Replies.find({messageId: id}).fetch();
    var replies = [];
    $(msg_replies).each(function(index, value) {
        if (value.status == "unread") {
            replies.push(value);
        };
    });
    
    return replies.length;
})

Template.registerHelper("hasProfile", function(id){
    var user = Meteor.users.findOne(id);
    var first_name = user.profile.first_name;
    if (typeof(first_name) != "undefined") {
        return true;
    };
})

Template.selectItem.helpers({
    Items: function () {
        var _id = Meteor.userId();
        return Items.find({owner: _id}).fetch();
    }
});

Template.registerHelper("getItemId", function(){
    var options = [];
    var userId = Meteor.userId();
    var userItems = Items.find({owner: userId}).fetch();

    $(userItems).each(function(index, value) {
       options.push({label: value.title + "(posted on: )" + value.createdAt, value: value.title})
    });

    return options;
})

Template.registerHelper("item_owner_id", function(itemId){
    var item = Items.findOne(itemId);
    var ownerId = item.owner;
    return ownerId;
})

Template.registerHelper("hasSentRequest", function(itemId){
    var userId = Meteor.userId();
    var application = Applications.findOne({itemId: itemId, owner: userId})
    if (typeof(application) != "undefined") {
        return true
    };
})

Template.registerHelper("hasUnreadRequests", function(requests){
    var requests = this.unreadReq;
    if (requests.length != 0) {
        return true
    };
})

Template.registerHelper("unreadRequestsCount", function(requests){
    var requests = this.unreadReq;
    var totalUnread =  requests.length;
    return totalUnread;
})