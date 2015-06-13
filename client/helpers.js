Template.registerHelper("fullUserName", function(user){
    if (typeof(user.profile) == "undefined" || null) {
        return;
    }
    else {
        var first_name = user.profile.first_name;
        var last_name = user.profile.last_name;
        var full_name = first_name + " " + last_name;
        return full_name;
    }
})

Template.registerHelper("rating", function(user){
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

Template.registerHelper("ownerHasPhoto", function(userId){
   var user = Meteor.users.findOne(userId);
    if (typeof(user.profile.photo) == "undefined") {
        return false;
    };
})

Template.messageView.helpers({
    sender: function () {
         var senderId = this.message.owner;
         var sender = Meteor.users.findOne(senderId);
         return sender;

    },

});
Template.registerHelper("getOwnerPhotoUrl", function(userId){
    var user = Meteor.users.findOne(userId);
    if (typeof(user) == "undefined" || null) {
        return;
    }
    else {
       var photo = user.profile.photo;
       return photo;
    }
})

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
        if (typeof(trip) == "undefined") {
                return;
            }
        else {
                var ownerId = trip.owner;
                if (Meteor.userId() == ownerId) {
                    return "You"
                }
                else {
                    var ownerId = trip.owner;
                    var owner = Meteor.users.findOne(ownerId);
                    if (typeof(owner) == "undefined") {
                        return;
                    }
                    else {
                        var first_name = owner.profile.first_name;
                        var last_name = owner.profile.last_name;
                        var full_name = first_name + " " + last_name;
                        return full_name;
                    }
                }
        }
})

Template.registerHelper("photoUpOptions", function(){

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

Template.registerHelper("dob_ft", function(date){
    var m = moment(date);
    return m.format(" MMMM Do YYYY");
})

Template.registerHelper("checkCarrierStatus", function(user){
    if (typeof(user) == "undefined") {
        return;
    }
    else {
        if (user.profile.available_as_carrier == true) {
            return "available as carrier"
        }
        else {
            return "available not available as carrier"
        }
    }
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
    if (typeof(user) == "undefined") {
        return;
    }
    else {
        var pictureUrl = user.profile.picture;
        return pictureUrl;
    }
   
})

Template.registerHelper("reviewCountString", function(count){
    if (count == 1) {
        return "Review";
    }
    else {
        return "Reviews";
    }
})

Template.registerHelper("checkBio", function(id){
    var user = Meteor.users.findOne(id);
    var first_name = user.profile.first_name;
    var bio = user.profile.bio;
    if (typeof(bio) == "undefined" || null) {
        return "(" + first_name + " has not written any bio yet)";
    }
    else
    {
        return bio;
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
    if (typeof(message) == "undefined") {
        return;
    }
    else {
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
    }
})

Template.registerHelper("shortMessage", function(message){
    if (message.length < 80) {
        return message;
    }
    else {
        var shortmsg = jQuery.trim(message).substring(0, 80).split(" ").slice(0, -1).join(" ") + "...";
        return shortmsg;
    }
})

Template.registerHelper("fullName", function(id){
    var user = Meteor.users.findOne(id);
    if (typeof(user) == "undefined") {
        return;
    }
    else {
        var first_name = user.profile.first_name;
        var last_name = user.profile.last_name;
        var full_name = first_name + " " + last_name;
        return full_name;
    }
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
    var application = Requests.findOne({app_carry_itemId: itemId, owner: userId})
    if (typeof(application) != "undefined") {
        return true
    };
})

Template.registerHelper("hasUnreadRequests", function(requests){
    var requests = requests;
    if (requests.length != 0) {
        return true
    };
})

Template.registerHelper("unreadRequestsCount", function(requests){
    var requests = requests;
    var totalUnread =  requests.length;
    return totalUnread;
})

Template.registerHelper("userIsOwner", function(userId){
    if (Meteor.userId() == userId) {
        return true;
    };
})

Template.registerHelper("unreadReq", function(read_status){
    if (read_status == "unread") {
        return true;
    };
})

Template.registerHelper("reqToCarryItemOwner", function(itemId){
    var item = Items.findOne(itemId);
    var ownerId = item.owner;
    var user = Meteor.users.findOne(ownerId);
    var first_name = user.profile.first_name;
    var last_name = user.profile.last_name;
    var full_name = first_name + " " + last_name;
    return full_name;

})

Template.registerHelper("appToCarry", function(request){
    if (request.type == "app_carry" && request.owner == Meteor.userId()) {
        return true;
    };
    
})

Template.registerHelper("recReqToCarryAUserItem", function(request){
    if (request.type == "req_carry" && request.carrierId == Meteor.userId()) {
        return true;
    };
    
})

Template.registerHelper("recReqToCarryUrItem", function(request){
     var userId = Meteor.userId();
    if (request.senderId == userId && request.type == "app_carry") {
        return true;
    };
    
})

Template.registerHelper("sendReqToCarryUrItem", function(request){
     var userId = Meteor.userId();
    if (request.owner == userId && request.type == "req_carry") {
        return true;
    };
    
})

Template.registerHelper("acceptedToCarry", function(itemId){
    var item = Items.findOne(itemId);
    if (item.acceptance_status == "accepted") {
        return true;
    };
})

Template.registerHelper("rejectedToCarry", function(itemId){
       var item = Items.findOne(itemId);
       if (item.acceptance_status == "rejected") {
           return true;
       };
})

Template.registerHelper("hasUnreadNotifications", function(notifs){
    var notifs = notifs;
    if (notifs.length != 0) {
        return true
    };
})

Template.registerHelper("unreadNotificationsCount", function(notifs){
    var notifs = notifs;
    var totalUnread =  notifs.length;
    return totalUnread;
})

Template.registerHelper("unreadNotif", function(status){
    if (status == "unread") {
        return true;
    };
})

Template.registerHelper("acceptedResponse", function(notif){
    var notification = notif;
    if (notification.type == "ac-notif") {
        return true;
    };
})

Template.registerHelper("getItemSendDate", function(itemId){
    var item = Items.findOne(itemId);
    return item.send_date;
})

Template.registerHelper("getItemDeliveryDate", function(itemId){
    var item = Items.findOne(itemId);
    return item.delivery_date;
})

Template.registerHelper("")

Template.registerHelper("firstName", function(userId){
    var user = Meteor.users.findOne(userId);
    var first_name = user.profile.first_name;
    return first_name;
})

Template.registerHelper("getItemPicUrl", function(itemId){
    var item = Items.findOne(itemId);
    var url = item.absoluteImageUrl;
    return url;
})


Template.registerHelper("getItemTitle", function(itemId){
    var item = Items.findOne(itemId);
    var title = item.title;
    return title;
})

Template.registerHelper("getItemOwnerId", function(itemId){
    var item = Items.findOne(itemId);
    var ownerId = item.owner;
    return ownerId;
})

Template.registerHelper("getItemWeight", function(itemId){
    var item = Items.findOne(itemId);
    var weight = item.weight;
    return weight;
})

Template.registerHelper("getItemReward", function(itemId){
    var item = Items.findOne(itemId);
    var reward = item.reward;
    return reward;
})

Template.registerHelper("getItemDesc", function(itemId){
    var item = Items.findOne(itemId);
    var description = item.description;
    return description;
})

Template.registerHelper("getItemOriginCountry", function(itemId){
    var item = Items.findOne(itemId);
    var origin = item.origin_country;
    return origin;
})

Template.registerHelper("getItemDestinationCountry", function(itemId){
    var item = Items.findOne(itemId);
    var destination = item.destination_country;
    return destination;
})


Template.registerHelper("getMeItemOwnerId", function(){
    var checkItemId = this.request.app_carry_itemId
    var itemId;
    if (typeof(checkItemId) == "undefined") {
        itemId = this.request.req_carry_itemId;
        var item = Items.findOne(itemId);
        return item.owner;
    }
    else {
        itemId = checkItemId;
        var item = Items.findOne(itemId);
        return item.owner;
    }
})


Template.registerHelper("getMeReqToCarryItemId", function(){
    var itemId = this.request.req_carry_itemId;
    return itemId;
})

Template.registerHelper("ownerOfItem", function(itemId){
    var item = Items.findOne(itemId);
    if (item.owner == Meteor.userId()) {
        return true;
    };
})

Template.registerHelper("ownerOfTrip", function(tripId){
    var trip = Travels.findOne(tripId);
    if (trip.owner == Meteor.userId()) {
        return true;
    };
})

Template.registerHelper("currentUserProfile", function(userId){
    var currentUserId = Meteor.userId();
    if (currentUserId == userId) {
        return true;
    };

})

Template.registerHelper("getItemOriginCountry", function(itemId){
    var item = Items.findOne(itemId);
    return item.origin_country;
})

Template.registerHelper("getItemDestinationCountry", function(itemId){
    var item = Items.findOne(itemId);
    return item.destination_country;
})

Template.registerHelper("recReqToCarryAnotherUserItem", function(requestId){
    var request = Requests.findOne(requestId);
    var userId = Meteor.userId();
    if (request.type == "req_carry" && request.carrierId == userId) {
        return true;
    };
})

Template.registerHelper("getRequestTitle", function(requestId){
    var request = Requests.findOne(requestId);
    if (typeof(request) == "undefined" || null) {
        return;
    }
    else {
        var itemId = request.req_carry_itemId;
        var item = Items.findOne(itemId);
        if (typeof(item) == "undefined" || null) {
            return;
        }
        else {
            var item_send_date = item.send_date;
            var m = moment(item_send_date);
            var date = m.format("dddd, MMMM Do YYYY");
             return "Are you travelling from " + item.origin_country + " to " + item.destination_country + " between " + date + "...?";
        }
        
    }
})


Template.registerHelper("hasNoMainPhoto", function(user){
   if (typeof(user.profile.photo) == "undefined") {
    return true;
   }
   else {
    return false;
   }
})


Template.registerHelper("getSingleItemTitle", function(itemId){
    var item = Items.findOne(itemId);
    var item_send_date = item.send_date;
    var item_delivery_date = item.delivery_date;
    var sd = moment(item_send_date);
    var dd = moment(item_delivery_date);
    var send_date = sd.format("dddd, MMMM Do YYYY");
    var delivery_date = dd.format("dddd, MMMM Do YYYY");

    return  "Are you travelling from " + item.origin_country + " to " + item.destination_country + " between " + send_date + " and " + delivery_date + " and " + " and willing to carry the following item?";
})

    Template.registerHelper("appToCarryItem", function(requestId){
        var request = Requests.findOne(requestId);
        var userId = Meteor.userId();
        if (request.type == "app_carry" && request.owner == userId) {
            return true;
        };
    })

    Template.registerHelper("getAppToCarryItemTitle", function(requestId){
        var request = Requests.findOne(requestId);
        var itemId = request.app_carry_itemId;
        var item = Items.findOne(itemId);
        var item_owner = item.owner;
        var user = Meteor.users.findOne(item_owner);
        var first_name = user.profile.first_name;
        return "you have requested to carry " + first_name + "'s item";
    })

    Template.registerHelper("requestToCarryYourItem", function(requestId){
        var request = Requests.findOne(requestId);
        var userId = Meteor.userId();
        if (request.type == "req_carry" && request.owner == userId) {
            return true;
        };
    })

    Template.registerHelper("recReqToCarryYourItem", function(requestId){
        if (typeof(requestId) == "undefined") {
            return;
        }
        else {
            var request = Requests.findOne(requestId);
            var userId = Meteor.userId();
            if (request.type == "app_carry" && request.senderId == userId) {
                return true;
            };
        }
    })

    Template.registerHelper("getReqToCarryYourItemTitle", function(requestId){
        var request = Requests.findOne(requestId);
        var itemId = request.req_carry_itemId;
        var item = Items.findOne(itemId);
        var carrierId = request.carrierId;
        var user = Meteor.users.findOne(carrierId);
        var first_name = user.profile.first_name;
        return "you have requested " + first_name + " to carry your item.";

    })

    Template.registerHelper("getRecReqToCarryYourItemTitle", function(requestId){
        var request = Requests.findOne(requestId);
        var itemId = request.app_carry_itemId;
        var item = Items.findOne(itemId);
        var requesterId = request.owner;
        var user = Meteor.users.findOne(requesterId);
        var first_name = user.profile.first_name;
        return first_name + " has requested to carry your item.";
    })

Template.registerHelper("noItems", function(items){
    if (items.length == 0) {
        return true;
    };
})

Template.registerHelper("noTrips", function(trips){
    if (typeof(trips) != "undefined") {
        if (trips.length == 0) {
            return true;
        };
    };
})

Template.registerHelper("arepagRequests", function(requests){
    if (typeof(requests) != "undefined") {
        return true;
    };
})
Template.registerHelper("notifFrom", function(){
    return this.from;
})

Template.registerHelper("current", function(){
    return Meteor.user();
})
